import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// ✅ Correct worker for Vite + pdfjs v5
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

export default function PdfViewer() {
	const [numPages, setNumPages] = useState(null);
	const [pageWidth, setPageWidth] = useState(800);

	// Responsive width calculation
	useEffect(() => {
		const updateWidth = () => {
			const horizontalPadding = 32;
			const maxPdfWidth = 900; // 👈 natural PDF width (important)
			const width = Math.min(window.innerWidth - horizontalPadding, maxPdfWidth);
			setPageWidth(width);
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	const onLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	return (
		<div style={styles.wrapper}>
			<div style={styles.container}>
				<Document
					file='/catalog.pdf'
					onLoadSuccess={onLoadSuccess}
					loading='Loading catalog…'>
					{numPages &&
						Array.from({ length: numPages }, (_, index) => (
							<Page
								key={`page_${index + 1}`}
								pageNumber={index + 1}
								width={pageWidth}
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
	wrapper: {
		minHeight: "100vh",
		background: "#1e1e1e",
		display: "flex",
		justifyContent: "center",
		padding: "24px 16px",
	},

	container: {
		width: "100%",
		maxWidth: "900px", // 👈 keeps it centered on large screens
		margin: "0 auto",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "16px",
	},
};
