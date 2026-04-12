import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
	title: "K2SO — Your AI Workspace",
	description:
		"K2SO is a workspace for AI collaboration. Orchestrate CLI agents, review documents, and manage terminals — all in a ~25MB Tauri app.",
	metadataBase: new URL("https://k2so.sh"),
	openGraph: {
		title: "K2SO — Your AI Workspace",
		description:
			"Orchestrate CLI agents, review documents, and manage terminals — all in a ~25MB Tauri + Rust desktop app.",
		url: "https://k2so.sh",
		siteName: "K2SO",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "K2SO — Your AI Workspace",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "K2SO — Your AI Workspace",
		description:
			"Orchestrate CLI agents, review documents, and manage terminals — all in a ~25MB Tauri + Rust desktop app.",
		images: ["/og-image.png"],
	},
	keywords: [
		"K2SO",
		"AI workspace",
		"AI agents",
		"CLI agents",
		"Tauri",
		"Rust",
		"code editor",
		"terminal",
		"Claude",
		"Codex",
		"Gemini",
		"Copilot",
		"Aider",
		"developer tools",
	],
	authors: [{ name: "Alakazam Labs", url: "https://alakazamlabs.com" }],
	creator: "Alakazam Labs",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="antialiased">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
