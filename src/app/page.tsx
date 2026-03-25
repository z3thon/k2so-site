import Image from "next/image";
import Nav from "@/components/Nav";

const REPO_URL = "https://github.com/Alakazam-211/K2SO";

// Fetch latest release version from GitHub at build time
async function getLatestRelease(): Promise<{ version: string; downloadUrl: string }> {
	const fallbackVersion = "0.10.1";
	try {
		const res = await fetch(
			"https://api.github.com/repos/Alakazam-211/K2SO/releases/latest",
			{ next: { revalidate: 300 } } // revalidate every 5 minutes
		);
		if (!res.ok) throw new Error("GitHub API error");
		const data = await res.json();
		const tag = (data.tag_name as string) ?? `v${fallbackVersion}`;
		const version = tag.replace(/^v/, "");
		// Find the DMG asset
		const dmgAsset = (data.assets as Array<{ name: string; browser_download_url: string }>)
			?.find((a) => a.name.endsWith(".dmg"));
		const downloadUrl = dmgAsset?.browser_download_url
			?? `https://github.com/Alakazam-211/K2SO/releases/download/${tag}/K2SO_${version}_aarch64.dmg`;
		return { version, downloadUrl };
	} catch {
		return {
			version: fallbackVersion,
			downloadUrl: `https://github.com/Alakazam-211/K2SO/releases/download/v${fallbackVersion}/K2SO_${fallbackVersion}_aarch64.dmg`,
		};
	}
}

const AGENTS = [
	{ name: "Claude", cmd: "claude" },
	{ name: "Codex", cmd: "codex" },
	{ name: "Gemini", cmd: "gemini" },
	{ name: "Copilot", cmd: "gh copilot" },
	{ name: "Aider", cmd: "aider" },
	{ name: "Cursor Agent", cmd: "cursor-agent" },
	{ name: "OpenCode", cmd: "opencode" },
	{ name: "Code Puppy", cmd: "codepuppy" },
];

export default async function Home() {
	const { version: VERSION, downloadUrl: DOWNLOAD_URL } = await getLatestRelease();
	return (
		<main className="min-h-screen flex flex-col">
			<Nav downloadUrl={DOWNLOAD_URL} />

			{/* Hero */}
			<section className="flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-32 text-center">
				<Image
					src="/k2so-logo.jpg"
					alt="K2SO"
					width={120}
					height={120}
					className="opacity-90 mb-8"
					priority
				/>

				<h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-2">
					Your AI Workspace
				</h1>

				<p className="text-xs tracking-[0.3em] text-[var(--accent)] mb-8 uppercase">
					Not your normal IDE.
				</p>

				<p className="text-base text-[var(--muted)] max-w-2xl mb-4 leading-relaxed">
					Orchestrate AI agents. Review documents. Manage terminals.
					K2SO is a next generation opensource IDE built around AI collaboration.
				</p>

				<p className="text-sm text-[var(--dim)] mb-12">
					Built with Tauri + Rust. ~5MB binary. Open source (MIT).
				</p>

				{/* Terminal demo */}
				<div className="terminal-preview w-full max-w-lg text-left mb-12 glow">
					<div>
						<span className="prompt">$ </span>
						<span className="cmd">k2so</span>
					</div>
					<div className="output">workspace loaded: ~/projects/myapp</div>
					<div className="output">3 agents available, 2 worktrees active</div>
					<div>
						<span className="prompt">&gt; </span>
						<span className="cmd">
							open 3 panels with README, CHANGELOG, and a Claude terminal
						</span>
					</div>
					<div className="output">
						configuring workspace...
						<span className="cursor-blink" />
					</div>
				</div>

				<div className="flex flex-col items-center gap-3">
				<div className="flex gap-4 items-center flex-wrap justify-center">
					<a
						href={DOWNLOAD_URL}
						className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 hover:bg-gray-200 transition-colors text-sm"
					>
						<svg
							width="16"
							height="16"
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
						href={REPO_URL}
						className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--muted)] font-medium px-6 py-3 hover:border-[#333] hover:text-white transition-colors text-sm"
						target="_blank"
						rel="noopener noreferrer"
					>
						View Source
					</a>
				</div>
				<span className="text-[11px] text-[var(--dim)] tracking-wide">v{VERSION} — Apple Silicon</span>
				</div>
			</section>

			{/* AI Workspace Assistant */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<div className="flex items-center gap-3 mb-4">
						<h2 className="text-2xl font-semibold">
							AI Workspace Assistant
						</h2>
						<span className="kbd">
							<span className="text-[10px]">&#8984;</span>L
						</span>
					</div>
					<p className="text-[var(--muted)] text-sm mb-8 max-w-lg leading-relaxed">
						A built-in lightweight local LLM (Qwen2.5-1.5B) that configures
						your workspace from natural language. Describe what you want and
						it arranges panels, opens files, and launches agents.
					</p>
					<div className="terminal-preview max-w-lg">
						<div className="text-[var(--dim)] text-xs mb-2">
							# press Cmd+L to open
						</div>
						<div>
							<span className="prompt">ask: </span>
							<span className="cmd">
								split vertically, left panel has the README, right has a Claude
								terminal
							</span>
						</div>
						<div className="output mt-1">
							opening README.md in left pane...
						</div>
						<div className="output">
							launching claude in right pane...
						</div>
						<div className="output">done.</div>
					</div>
				</div>
			</section>

			{/* Agent Quick Launch */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						CLI Agent Integration
					</h2>
					<p className="text-[var(--muted)] text-sm mb-8 max-w-lg leading-relaxed">
						One click opens an agent in a terminal tab. No custom harnesses, no
						wrappers — K2SO runs CLI tools directly. Bring your own API keys.
					</p>
					<div className="flex flex-wrap gap-2">
						{AGENTS.map((agent) => (
							<div key={agent.name} className="agent-btn">
								<span className="text-[var(--accent)] text-xs">$</span>
								<span>{agent.name}</span>
							</div>
						))}
					</div>
					<p className="text-xs text-[var(--dim)] mt-4">
						Each button runs the agent&apos;s CLI command in a new terminal tab.
					</p>
				</div>
			</section>

			{/* Built for teams */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						Built for agencies & teams
					</h2>
					<p className="text-[var(--muted)] text-sm mb-8 max-w-lg leading-relaxed">
						Managing multiple client projects shouldn&apos;t mean multiple tools.
						K2SO keeps every project, branch, and agent session organized in one
						workspace — so your team ships faster without context-switching.
					</p>
					<div className="grid gap-4 sm:grid-cols-3">
						<div className="feature-card">
							<h3>Multi-Project Workspace</h3>
							<p>
								Organize client projects into focus groups. Pin your active
								engagements. Switch between projects instantly with the sidebar
								or command palette.
							</p>
						</div>
						<div className="feature-card">
							<h3>Parallel Workflows</h3>
							<p>
								Split into up to 3 columns — review one client&apos;s PR on the
								left while an agent writes code for another on the right.
								Drag tabs between columns freely.
							</p>
						</div>
						<div className="feature-card">
							<h3>Branch per Client</h3>
							<p>
								Git worktrees let you work on multiple branches simultaneously
								without stashing or switching. Each client gets their own
								isolated workspace.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-10 text-center">
						Under the hood
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="feature-card">
							<h3>Code Editor</h3>
							<p>
								Full editing with syntax highlighting for 30+ languages.
								Cmd+S to save, Cmd+Z to undo, bracket matching, search —
								all the shortcuts you expect, built in.
							</p>
						</div>
						<div className="feature-card">
							<h3>Terminal Persistence</h3>
							<p>
								Terminal PTYs survive tab switches via a scrollback buffer.
								Switch tabs without losing output. Agent sessions resume
								automatically on app restart.
							</p>
						</div>
						<div className="feature-card">
							<h3>Active Agent Detection</h3>
							<p>
								K2SO detects when an AI agent is running in a terminal and
								warns you before closing. Never accidentally kill a long-running
								agent session again.
							</p>
						</div>
						<div className="feature-card">
							<h3>Tauri + Rust</h3>
							<p>
								~5MB binary vs ~200MB Electron apps. Native PTY via
								portable-pty. SQLite via rusqlite. Local LLM via llama.cpp with
								Metal GPU. Fast startup, low memory.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Open Source */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-2xl font-semibold mb-4">Open Source (MIT)</h2>
					<p className="text-[var(--muted)] text-sm mb-8 max-w-md mx-auto leading-relaxed">
						K2SO is fully open source under the MIT license. Read the code,
						learn from it, fork it, build on top of it.
					</p>
					<a
						href={REPO_URL}
						className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--muted)] font-medium px-6 py-3 hover:border-[#333] hover:text-white transition-colors text-sm"
						target="_blank"
						rel="noopener noreferrer"
					>
						github.com/Alakazam-211/K2SO
					</a>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-[var(--border)] px-6 py-8">
				<div className="max-w-3xl mx-auto text-center text-xs text-[var(--dim)] space-y-2">
					<p>
						K2SO is built by{" "}
						<a
							href="https://alakazamlabs.com"
							className="text-[var(--muted)] hover:text-white"
							target="_blank"
							rel="noopener noreferrer"
						>
							Alakazam Labs
						</a>
					</p>
					<p>
						Copyright &copy; {new Date().getFullYear()} Alakazam Labs. MIT
						License.
					</p>
				</div>
			</footer>
		</main>
	);
}
