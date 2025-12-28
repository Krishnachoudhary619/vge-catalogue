export default async function handler(req, res) {
	const pdfUrl =
		"https://github.com/Krishnachoudhary619/vge-catalogue/releases/download/catalog/catalog.pdf";

	const range = req.headers.range;

	const headers = {};
	if (range) {
		headers.Range = range;
	}

	const response = await fetch(pdfUrl, {
		headers,
		redirect: "follow",
	});

	if (!response.ok && response.status !== 206) {
		return res.status(500).send("Failed to fetch PDF");
	}

	// Forward important headers
	res.setHeader("Content-Type", response.headers.get("content-type") || "application/pdf");

	if (response.headers.get("content-range")) {
		res.setHeader("Content-Range", response.headers.get("content-range"));
		res.status(206);
	}

	if (response.headers.get("accept-ranges")) {
		res.setHeader("Accept-Ranges", "bytes");
	}

	if (response.headers.get("content-length")) {
		res.setHeader("Content-Length", response.headers.get("content-length"));
	}

	// Stream response (NO buffering)
	const stream = response.body;
	stream.pipeTo(
		new WritableStream({
			write(chunk) {
				res.write(chunk);
			},
			close() {
				res.end();
			},
		})
	);
}
