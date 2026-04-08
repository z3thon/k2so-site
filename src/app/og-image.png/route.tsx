import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#0a0a0a",
					fontFamily: "monospace",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "24px",
					}}
				>
					<div
						style={{
							fontSize: "72px",
							fontWeight: 800,
							color: "#ededed",
							letterSpacing: "-2px",
						}}
					>
						K2SO
					</div>
					<div
						style={{
							fontSize: "28px",
							color: "#22d3ee",
							fontWeight: 600,
						}}
					>
						Your AI Workspace
					</div>
					<div
						style={{
							fontSize: "20px",
							color: "#888",
							maxWidth: "700px",
							textAlign: "center",
							lineHeight: "1.6",
						}}
					>
						Orchestrate CLI agents, review documents, and manage terminals — all in a ~5MB Tauri + Rust desktop app.
					</div>
				</div>
				<div
					style={{
						position: "absolute",
						bottom: "40px",
						fontSize: "16px",
						color: "#555",
					}}
				>
					k2so.sh — Built by Alakazam Labs
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
