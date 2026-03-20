import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "K2SO — Developer Workspace",
	description:
		"K2SO is a custom fork of Superset, tailored for teams that need per-project worktree management, multi-window workflows, and focus-driven development.",
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
