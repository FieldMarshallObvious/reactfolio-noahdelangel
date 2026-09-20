#!/bin/sh
#
# Screenshot baselines, generated and checked on Linux so they match CI.
#
# Playwright stamps the platform into every snapshot filename, so baselines
# written on macOS (-darwin.png) are invisible to a ubuntu runner, which fails
# with "A snapshot doesn't exist" rather than a pixel diff. Everything here runs
# inside the Playwright Linux image to keep one set of -linux.png baselines that
# both this machine and CI can use.
#
# Both modes photograph whatever TARGET serves. A production build is started on
# port 3210 automatically unless something is already listening there.
#
#   update  Rewrite the baselines.  ./scripts/snapshots.sh update
#   check   Diff against them.      ./scripts/snapshots.sh check
#
# An optional title filter refreshes a subset without touching the rest:
#   ./scripts/snapshots.sh update projects
#   ./scripts/snapshots.sh update 1022px
#
# REFERENCE_URL aims both modes at a deployed site instead. Only meaningful once
# what is deployed is this application.

set -e

MODE="$1"
[ $# -gt 0 ] && shift

# Must track the @playwright/test version in package.json: the image ships the
# browsers, and Playwright refuses a driver it did not build.
PW_VERSION="$(node -p "require('./package.json').devDependencies['@playwright/test'].replace(/[^0-9.]/g,'')")"
IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-noble"

# Whatever is being photographed. REFERENCE_URL points at a deployed site;
# otherwise this is a build served from the host, which the container cannot
# reach on localhost. Baselines have to come from the same application CI will
# run against — as of this writing the deployed site is still the pre-migration
# CRA build, so REFERENCE_URL is not the right source for them.
TARGET="${REFERENCE_URL:-${BASE_URL:-http://host.docker.internal:3210}}"

# Narrowing is by test title, combined with the snapshot filter rather than
# replacing it: Playwright keeps only the last --grep it is given.
FILTER="$1"
[ $# -gt 0 ] && shift
if [ -n "$FILTER" ]; then
	GREP="${FILTER}.*matches its baseline"
else
	GREP="matches its baseline"
fi

case "$MODE" in
update)
	PW_ARGS="--update-snapshots"
	echo "Capturing baselines from $TARGET (Linux, $IMAGE)"
	;;
check)
	PW_ARGS=""
	echo "Checking $TARGET against stored baselines (Linux, $IMAGE)"
	;;
*)
	echo "usage: $0 {update|check} [title-filter] [playwright args...]" >&2
	exit 1
	;;
esac

# --user keeps rewritten PNGs owned by the caller rather than root; the image's
# default HOME is not writable for an arbitrary uid, so point it at /tmp.
exec docker run --rm \
	-v "$PWD":/work \
	-w /work \
	--user "$(id -u):$(id -g)" \
	-e HOME=/tmp \
	-e BASE_URL="$TARGET" \
	-e CI=1 \
	--add-host=host.docker.internal:host-gateway \
	"$IMAGE" \
	npx playwright test --grep "$GREP" $PW_ARGS "$@"
