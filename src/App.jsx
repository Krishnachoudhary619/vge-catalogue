import PdfViewer from "./PdfViewer";

function App() {
	return (
		<>
			<header style={headerStyle}>Vertex Global Export – Product Catalog</header>
			<PdfViewer />
		</>
	);
}

const headerStyle = {
	padding: "12px",
	textAlign: "center",
	fontWeight: "600",
	background: "#1f3d2b",
	color: "#fff",
};

export default App;
