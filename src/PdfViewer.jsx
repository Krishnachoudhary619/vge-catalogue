import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// pdf.js worker (already working for you)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

export default function PdfViewer() {
	const [numPages, setNumPages] = useState(null);
	const [containerWidth, setContainerWidth] = useState(800);

	// Update width responsively
	useEffect(() => {
		const updateWidth = () => {
			const padding = 32;
			const maxWidth = 900; // 👈 looks like normal PDF width
			const width = Math.min(window.innerWidth - padding, maxWidth);
			setContainerWidth(width);
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	function onLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div style={styles.pageWrapper}>
			<div style={{ ...styles.pdfContainer, width: containerWidth }}>
				<Document
					file='/catalog.pdf'
					onLoadSuccess={onLoadSuccess}
					loading='Loading catalog…'>
					{Array.from(new Array(numPages), (_, index) => (
						<Page
							pageNumber={index + 1}
							width={containerWidth}
							renderTextLayer={false}
							renderAnnotationLayer={false}
						/>
					))}
				</Document>
			</div>
		</div>
	);
}
const styles = {
	pageWrapper: {
		minHeight: "100vh",
		background: "#1e1e1e",
		display: "flex",
		justifyContent: "center", // ✅ CENTER HORIZONTALLY
		alignItems: "flex-start",
		padding: "24px 16px",
	},

	pdfContainer: {
		width: "100%",
		maxWidth: "900px", // ✅ NORMAL PDF WIDTH
		margin: "0 auto", // ✅ FORCE CENTER
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "16px",
	},
};
