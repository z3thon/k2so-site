import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "K2SO — Your AI Workspace",
	description:
		"K2SO is a workspace for AI collaboration. Orchestrate CLI agents, review documents, and manage terminals — all in a ~5MB Tauri app.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
