import Image from "next/image";

const DOWNLOAD_URL =
	"https://github.com/z3thon/superset/releases/latest/download/K2SO-arm64.dmg";
const SUPERSET_URL = "https://superset.sh";
const SUPERSET_LICENSE_URL =
	"https://github.com/superset-sh/superset/blob/main/LICENSE";
const FORK_REPO_URL = "https://github.com/z3thon/superset";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col">
			{/* Hero */}
			<section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
				<div className="mb-8">
					<Image
						src="/k2so-logo.jpg"
						alt="K2SO"
						width={140}
						height={140}
						className="rounded-3xl shadow-2xl"
						priority
					/>
				</div>

				<h1 className="text-5xl font-bold tracking-tight mb-4">K2SO</h1>

				<p className="text-lg text-[var(--muted)] max-w-xl mb-2">
					A custom fork of{" "}
					<a
						href={SUPERSET_URL}
						className="underline hover:text-white transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						Superset
					</a>{" "}
					with enhanced multi-window workflows, per-project worktree management,
					and focus-driven development tools.
				</p>

				<p className="text-sm text-[var(--muted)] mb-10">
					Built and maintained by{" "}
					<a
						href="https://alakazamlabs.com"
						className="underline hover:text-white transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						Alakazam Labs
					</a>
				</p>

				<div className="flex gap-4 items-center">
					<a
						href={DOWNLOAD_URL}
						className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" y1="15" x2="12" y2="3" />
						</svg>
						Download for macOS
					</a>

					<a
						href={FORK_REPO_URL}
						className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 font-medium px-6 py-3 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						View Source
					</a>
				</div>
			</section>

			{/* Features */}
			<section className="border-t border-gray-800 px-6 py-16">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-8 text-center">
						What&apos;s different in K2SO
					</h2>
					<div className="grid gap-6 sm:grid-cols-2">
						<Feature
							title="Multi-Window"
							description="Open multiple windows with independent tab states. Focus windows show only one project."
						/>
						<Feature
							title="Per-Project Worktrees"
							description="Enable or disable git worktrees on a per-project basis. Branch-only mode for simpler repos."
						/>
						<Feature
							title="Independent Side Panels"
							description="Left and right panels open and close independently with dedicated toggle buttons."
						/>
						<Feature
							title="Terminal Zoom"
							description="Cmd+Shift+=/- to zoom terminal font size independently of the app zoom level."
						/>
						<Feature
							title="File Tree Pane"
							description="Drag a file tree into any split pane for quick file navigation alongside terminals."
						/>
						<Feature
							title="Enhanced Project Settings"
							description="Split-pane settings page with icon detection, workspace listings, and streamlined navigation."
						/>
					</div>
				</div>
			</section>

			{/* Legal / Attribution */}
			<footer className="border-t border-gray-800 px-6 py-8">
				<div className="max-w-3xl mx-auto text-center text-sm text-[var(--muted)] space-y-3">
					<p>
						K2SO is a derivative work of{" "}
						<a
							href={SUPERSET_URL}
							className="underline hover:text-white"
							target="_blank"
							rel="noopener noreferrer"
						>
							Superset
						</a>{" "}
						by Superset, Inc. Distributed under the{" "}
						<a
							href={SUPERSET_LICENSE_URL}
							className="underline hover:text-white"
							target="_blank"
							rel="noopener noreferrer"
						>
							Elastic License 2.0
						</a>
						.
					</p>
					<p>
						This software has been modified from its original version.
						Superset&trade; is a trademark of Superset, Inc. K2SO is not
						affiliated with or endorsed by Superset, Inc.
					</p>
					<p>
						Copyright &copy; 2025-{new Date().getFullYear()} Superset, Inc.
						Modifications by Alakazam Labs.
					</p>
				</div>
			</footer>
		</main>
	);
}

function Feature({
	title,
	description,
}: { title: string; description: string }) {
	return (
		<div className="border border-gray-800 rounded-lg p-5">
			<h3 className="font-semibold mb-1">{title}</h3>
			<p className="text-sm text-[var(--muted)]">{description}</p>
		</div>
	);
}
