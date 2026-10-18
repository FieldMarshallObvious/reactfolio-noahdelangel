import dynamic from "next/dynamic";

/**
 * Flowcharts appear only on the three project showcase pages and measure the
 * DOM to lay themselves out, so they are client-only and split into their own
 * chunk rather than shipped with the main bundle.
 */
const Flowchart = dynamic(() => import("./flowchartCanvas"), {
	ssr: false,
	loading: () => <div style={{ height: "500px" }} />,
});

export default Flowchart;
