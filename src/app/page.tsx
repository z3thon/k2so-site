import Link from "next/link";
import Nav from "@/components/Nav";

const REPO_URL = "https://github.com/Alakazam-211/K2SO";

// Fetch latest release version from GitHub at build time
async function getLatestRelease(): Promise<{ version: string; downloadUrl: string }> {
	const fallbackVersion = "0.10.1";
	try {
		const res = await fetch(
			"https://api.github.com/repos/Alakazam-211/K2SO/releases/latest",
			{ next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) }
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
	{ name: "Copilot", cmd: "copilot" },
	{ name: "Aider", cmd: "aider" },
	{ name: "Cursor Agent", cmd: "cursor-agent" },
	{ name: "OpenCode", cmd: "opencode" },
	{ name: "Code Puppy", cmd: "codepuppy" },
	{ name: "Goose", cmd: "goose" },
	{ name: "Pi", cmd: "pi" },
];

export default async function Home() {
	const { version: VERSION, downloadUrl: DOWNLOAD_URL } = await getLatestRelease();
	return (
		<main className="min-h-screen flex flex-col">
			<Nav downloadUrl={DOWNLOAD_URL} />

			{/* Hero */}
			<section className="flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-20 text-center">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/k2so-logo.jpg"
					alt="K2SO"
					width={120}
					height={120}
					className="opacity-90 mb-8"
				/>

				<h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-2">
					Your AI Workspace
				</h1>

				<p className="text-xs tracking-[0.3em] text-[var(--accent)] mb-8 uppercase">
					Agent orchestration for your codebase.
				</p>

				<p className="text-base text-[var(--muted)] max-w-2xl mb-4 leading-relaxed">
					Run a team of AI agents that triage work, write code in parallel branches,
					and merge when done. K2SO is an open-source desktop app that turns CLI agents
					into a managed engineering workforce.
				</p>

				<p className="text-sm text-[var(--dim)] mb-12">
					Built with Tauri + Rust. ~25MB binary. Open source (MIT).
				</p>

				{/* Hero mockup — full app with icon rail, file tree, tabs, terminal */}
				<div className="w-full max-w-5xl mb-12 border border-[var(--border)] glow overflow-hidden rounded-lg" style={{ background: '#0a0a0a' }}>
					{/* Title bar */}
					<div className="flex items-center px-3 py-2 border-b border-[#2a2a2a]" style={{ background: '#141414' }}>
						<div className="flex gap-1.5 mr-4">
							<div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
							<div className="w-3 h-3 rounded-full bg-[#febc2e]" />
							<div className="w-3 h-3 rounded-full bg-[#28c840]" />
						</div>
						<span className="text-[11px] text-[#71717a] font-mono">K2SO — my-project</span>
						<div className="ml-auto flex items-center gap-3 text-[10px] text-[#71717a]">
							<span className="flex items-center gap-1"><span className="text-[#4ade80]">&#9679;</span> 3 agents</span>
							<span className="px-1.5 py-0.5 border border-[#2a2a2a] text-[9px]">&#8984;J</span>
						</div>
					</div>

					<div className="flex" style={{ height: '420px' }}>
						{/* Icon rail — workspace/project icons */}
						<div className="w-10 flex-shrink-0 border-r border-[#2a2a2a] flex flex-col items-center py-2 gap-1.5" style={{ background: '#0a0a0a' }}>
							{/* K2SO droid icon — active */}
							<div className="w-7 h-7 flex items-center justify-center rounded text-[12px]" style={{ background: 'rgba(255,255,255,0.08)' }}>
								<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#e4e4e7" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
									<ellipse cx="8" cy="6" rx="5.5" ry="5" />
									<circle cx="4.8" cy="5.5" r="1.2" />
									<circle cx="11.2" cy="5.5" r="1.2" />
									<path d="M4 10.5h8v2.5c0 .8-.7 1.5-1.5 1.5h-5c-.8 0-1.5-.7-1.5-1.5v-2.5z" />
									<line x1="6" y1="12" x2="6" y2="13.5" />
									<line x1="8" y1="12" x2="8" y2="13.5" />
									<line x1="10" y1="12" x2="10" y2="13.5" />
								</svg>
							</div>
							<div className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold text-black" style={{ background: '#D4A574' }}>C</div>
							<div className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold text-black" style={{ background: '#f472b6' }}>S</div>
							<div className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-bold text-black" style={{ background: '#4ade80' }}>A</div>
							<div className="flex-1" />
							<div className="w-7 h-7 flex items-center justify-center text-[#71717a] text-[14px]">+</div>
						</div>

						{/* File tree */}
						<div className="w-44 flex-shrink-0 border-r border-[#2a2a2a] text-left overflow-hidden hidden sm:flex flex-col" style={{ background: '#0a0a0a' }}>
							<div className="px-3 py-2 border-b border-[#2a2a2a] text-[9px] text-[#71717a] uppercase tracking-wider font-medium">
								Explorer
							</div>
							<div className="px-2 py-1.5 text-[10px] space-y-0.5 overflow-hidden">
								<div className="flex items-center gap-1 px-1 py-0.5 text-[#a1a1aa]">
									<span className="text-[#71717a]">&#9662;</span> src
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-4 text-[#a1a1aa]">
									<span className="text-[#71717a]">&#9662;</span> middleware
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-7 text-[#e4e4e7]" style={{ background: 'rgba(255,255,255,0.06)' }}>
									<span className="text-[#3b82f6]">&#9724;</span> auth.ts
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-7 text-[#a1a1aa]">
									<span className="text-[#3b82f6]">&#9724;</span> cors.ts
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-4 text-[#a1a1aa]">
									<span className="text-[#71717a]">&#9662;</span> lib
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-7 text-[#a1a1aa]">
									<span className="text-[#3b82f6]">&#9724;</span> session.ts
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-7 text-[#a1a1aa]">
									<span className="text-[#3b82f6]">&#9724;</span> db.ts
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-4 text-[#a1a1aa]">
									<span className="text-[#71717a]">&#9656;</span> routes
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 pl-4 text-[#a1a1aa]">
									<span className="text-[#71717a]">&#9656;</span> components
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 text-[#a1a1aa]">
									<span className="text-[#71717a]">&#9656;</span> tests
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 text-[#71717a]">
									<span className="text-[#4ade80]">&#9724;</span> package.json
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 text-[#71717a]">
									<span className="text-[#a1a1aa]">&#9724;</span> tsconfig.json
								</div>
								<div className="flex items-center gap-1 px-1 py-0.5 text-[#71717a]">
									<span className="text-[#a1a1aa]">&#9724;</span> README.md
								</div>
							</div>
						</div>

						{/* Main panel — tabs + terminal */}
						<div className="flex-1 flex flex-col min-w-0">
							{/* Tab bar */}
							<div className="flex items-center border-b border-[#2a2a2a] flex-shrink-0" style={{ background: '#111' }}>
								<div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-[#2a2a2a] text-[10px] text-[#e4e4e7]" style={{ background: 'rgba(255,255,255,0.06)' }}>
									<span className="text-[#D4A574]">&#10038;</span> Claude Code
									<span className="ml-1 text-[7px] text-[#3b82f6]">&#9679;</span>
								</div>
								<div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-[#2a2a2a] text-[10px] text-[#71717a]">
									<span className="text-[#10A37F]">&#91;&#93;</span> Codex
								</div>
								<div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-[#2a2a2a] text-[10px] text-[#71717a]">
									<span className="text-[#4285F4]">&#10022;</span> Gemini
									<span className="ml-1 text-[7px] text-[#22c55e]">&#9679;</span>
								</div>
								<div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-[#2a2a2a] text-[10px] text-[#71717a]">
									<span className="text-[#6E40C9]">&#9671;</span> Copilot
								</div>
								<div className="flex-1" />
								<div className="px-2 py-1.5 text-[10px] text-[#71717a]">+</div>
							</div>

							{/* Claude Code terminal output */}
							<div className="flex-1 p-4 font-mono text-[11px] leading-[1.7] text-left overflow-hidden" style={{ color: '#e4e4e7' }}>
								{/* Claude header */}
								<div className="flex items-center gap-2 mb-3">
									<span className="text-[#D4A574] text-sm">&#10038;</span>
									<span className="text-[#D4A574] font-semibold">Claude Code</span>
									<span className="text-[#71717a] text-[10px]">v1.0.31</span>
								</div>

								{/* User message */}
								<div className="mb-3 pl-3 border-l-2 border-[#3b82f6]">
									<div className="text-[9px] text-[#3b82f6] mb-0.5">You</div>
									<div className="text-[#e4e4e7]">Add session token validation to the auth middleware</div>
								</div>

								{/* Agent actions */}
								<div className="space-y-0.5 mb-3">
									<div><span className="text-[#4ade80]">&#10003;</span> Read <span className="text-[#71717a]">src/middleware/auth.ts</span></div>
									<div><span className="text-[#4ade80]">&#10003;</span> Read <span className="text-[#71717a]">src/lib/session.ts</span></div>
								</div>

								{/* Agent response */}
								<div className="mb-3 text-[#a1a1aa] text-[10px]">
									I&apos;ll add token validation to the auth middleware:
								</div>

								{/* Diff block */}
								<div className="mb-3 border border-[#2a2a2a] rounded overflow-hidden text-[10px]" style={{ background: '#111' }}>
									<div className="px-3 py-1 border-b border-[#2a2a2a] text-[#a1a1aa] flex justify-between text-[9px]" style={{ background: '#141414' }}>
										<span>src/middleware/auth.ts</span>
										<span className="text-[#71717a]">+8 -1</span>
									</div>
									<div className="px-3 py-1.5 space-y-0">
										<div className="text-[#71717a]">&nbsp; import {'{'} Request {'}'} from &apos;express&apos;;</div>
										<div className="text-[#f87171]" style={{ background: 'rgba(248,113,113,0.1)' }}>- export function auth(req: Request) {'{'}</div>
										<div className="text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>+ import {'{'} validateToken {'}'} from &apos;../lib/session&apos;;</div>
										<div className="text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>+ export async function auth(req: Request) {'{'}</div>
										<div className="text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>+&nbsp;&nbsp; const token = req.headers.authorization;</div>
										<div className="text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>+&nbsp;&nbsp; if (!token || !(await validateToken(token))) {'{'}</div>
										<div className="text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>+&nbsp;&nbsp;&nbsp;&nbsp; return res.status(401).json({'{'} error: &apos;Unauthorized&apos; {'}'});</div>
										<div className="text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>+&nbsp;&nbsp; {'}'}</div>
									</div>
								</div>

								{/* More actions */}
								<div className="space-y-0.5 mb-3">
									<div><span className="text-[#4ade80]">&#10003;</span> Wrote <span className="text-[#71717a]">src/middleware/auth.ts</span></div>
									<div><span className="text-[#4ade80]">&#10003;</span> Wrote <span className="text-[#71717a]">src/lib/session.ts</span> <span className="text-[#71717a] text-[9px]">(new)</span></div>
									<div><span className="text-[#3b82f6]">&#9659;</span> Running <span className="text-[#71717a]">bun test</span></div>
								</div>

								{/* Test output */}
								<div className="pl-3 border-l border-[#2a2a2a] text-[9px] text-[#71717a] space-y-0.5">
									<div><span className="text-[#4ade80]">PASS</span> validates tokens</div>
									<div><span className="text-[#4ade80]">PASS</span> rejects expired tokens</div>
									<div><span className="text-[#4ade80]">PASS</span> handles missing header</div>
									<div className="text-[#4ade80]">3 tests passed</div>
								</div>

								{/* Input bar */}
								<div className="mt-4 flex items-center gap-2 px-3 py-1.5 border border-[#2a2a2a] rounded text-[#71717a] text-[10px]" style={{ background: '#111' }}>
									<span className="text-[#3b82f6]">&gt;</span>
									<span>Reply to Claude...</span>
									<span className="ml-auto text-[8px] px-1 py-0.5 border border-[#2a2a2a]">&#8984;Enter</span>
								</div>
							</div>
						</div>
					</div>

					{/* Status bar */}
					<div className="flex items-center justify-between px-3 py-1 border-t border-[#2a2a2a] text-[9px] text-[#71717a]" style={{ background: '#141414' }}>
						<div className="flex items-center gap-3">
							<span className="flex items-center gap-1"><span className="text-[#3b82f6]">&#9679;</span> Managed</span>
							<span>main</span>
						</div>
						<div className="flex items-center gap-3">
							<span>&#8984;K workspace</span>
							<span>&#8984;J agents</span>
						</div>
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

			{/* Agent Orchestration */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						Agent Orchestration
					</h2>
					<p className="text-[var(--muted)] text-sm mb-10 max-w-lg leading-relaxed">
						Every workspace has a Manager agent that triages incoming work and delegates
						to specialist agents. Complex tasks go to isolated git worktree branches.
						Simple tasks are handled directly.
					</p>

					{/* 3-step flow */}
					<div className="grid sm:grid-cols-3 gap-4 mb-10">
						<div className="feature-card">
							<div className="text-[var(--accent)] text-xs font-semibold mb-3 tracking-wide">01 — INBOX</div>
							<h3>Work arrives</h3>
							<p>
								From humans, other agents, or external platforms. Each item gets a
								priority, type, and source. The inbox is the single entry point.
							</p>
						</div>
						<div className="feature-card">
							<div className="text-[var(--accent)] text-xs font-semibold mb-3 tracking-wide">02 — TRIAGE</div>
							<h3>Manager decides</h3>
							<p>
								Simple tasks are handled directly. Complex work gets delegated to
								specialist agents — backend-eng, frontend-eng, qa-eng — each with
								their own role and context.
							</p>
						</div>
						<div className="feature-card">
							<div className="text-[var(--accent)] text-xs font-semibold mb-3 tracking-wide">03 — BUILD</div>
							<h3>Agents work in parallel</h3>
							<p>
								Each agent works in an isolated worktree branch. When done, work
								flows back for review. The manager merges or requests changes.
							</p>
						</div>
					</div>

					{/* Agent pane mockup — kanban board */}
					<div className="border border-[var(--border)] overflow-hidden" style={{ background: '#0a0a0a' }}>
						{/* Pane tabs */}
						<div className="flex items-center gap-1 px-3 py-2 border-b border-[#2a2a2a]">
							<span className="px-3 py-1 text-[10px] font-medium text-white" style={{ background: '#3b82f6' }}>Work</span>
							<span className="px-3 py-1 text-[10px] font-medium text-[#71717a] border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>Chat</span>
							<span className="px-3 py-1 text-[10px] font-medium text-[#71717a] border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>CLAUDE.md</span>
							<span className="px-3 py-1 text-[10px] font-medium text-[#71717a] border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>Profile</span>
						</div>
						{/* Kanban columns */}
						<div className="grid grid-cols-3 gap-3 p-3">
							{/* Inbox column */}
							<div>
								<div className="flex items-center gap-1.5 mb-2 px-1">
									<span className="text-[9px] font-semibold uppercase tracking-wider text-[#3b82f6]">Inbox</span>
									<span className="text-[8px] px-1 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>3</span>
								</div>
								<div className="space-y-2">
									<div className="px-2.5 py-2 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
										<div className="text-[10px] text-[#e4e4e7] font-medium">Add auth middleware</div>
										<div className="flex items-center gap-1.5 mt-1.5">
											<span className="text-[8px] px-1 py-0.5 text-orange-400" style={{ background: 'rgba(249,115,22,0.15)' }}>high</span>
											<span className="text-[8px] text-[#71717a]">feature</span>
										</div>
									</div>
									<div className="px-2.5 py-2 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
										<div className="text-[10px] text-[#e4e4e7] font-medium">Fix pagination bug</div>
										<div className="flex items-center gap-1.5 mt-1.5">
											<span className="text-[8px] px-1 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>normal</span>
											<span className="text-[8px] text-[#71717a]">bug</span>
										</div>
									</div>
								</div>
							</div>
							{/* Active column */}
							<div>
								<div className="flex items-center gap-1.5 mb-2 px-1">
									<span className="text-[9px] font-semibold uppercase tracking-wider text-[#facc15]">Active</span>
									<span className="text-[8px] px-1 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>2</span>
								</div>
								<div className="space-y-2">
									<div className="px-2.5 py-2 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
										<div className="text-[10px] text-[#e4e4e7] font-medium">Refactor API routes</div>
										<div className="flex items-center gap-1.5 mt-1.5">
											<span className="text-[8px] px-1 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>normal</span>
											<span className="text-[8px] px-1 py-0.5 text-[#3b82f6]" style={{ background: 'rgba(59,130,246,0.1)' }}>backend-eng</span>
										</div>
									</div>
								</div>
							</div>
							{/* Done column */}
							<div>
								<div className="flex items-center gap-1.5 mb-2 px-1">
									<span className="text-[9px] font-semibold uppercase tracking-wider text-[#4ade80]">Done</span>
									<span className="text-[8px] px-1 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>5</span>
								</div>
								<div className="space-y-2">
									<div className="px-2.5 py-2 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
										<div className="text-[10px] text-[#e4e4e7] font-medium">Update dependencies</div>
										<div className="flex items-center gap-1.5 mt-1.5">
											<span className="text-[8px] px-1 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>low</span>
											<span className="text-[8px] text-[#71717a]">chore</span>
										</div>
									</div>
									<div className="px-2.5 py-2 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
										<div className="text-[10px] text-[#e4e4e7] font-medium">Add unit tests for utils</div>
										<div className="flex items-center gap-1.5 mt-1.5">
											<span className="text-[8px] px-1 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>normal</span>
											<span className="text-[8px] text-[#71717a]">test</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Skill Files */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						Skill Files
					</h2>
					<p className="text-[var(--muted)] text-sm mb-4 max-w-lg leading-relaxed">
						Your agents know how to coordinate from the first token. Every workspace
						gets a SKILL.md — a universal protocol file that works with Claude Code,
						Codex, Copilot, Cursor, Pi, OpenCode, Goose, and more.
					</p>
					<p className="text-[var(--muted)] text-sm mb-10 max-w-lg leading-relaxed">
						One canonical file, symlinked to every harness&apos;s discovery path.
						Agents wake up with 6 commands: <span className="text-[var(--foreground)]">checkin</span>,{" "}
						<span className="text-[var(--foreground)]">status</span>,{" "}
						<span className="text-[var(--foreground)]">done</span>,{" "}
						<span className="text-[var(--foreground)]">msg</span>,{" "}
						<span className="text-[var(--foreground)]">reserve</span>,{" "}
						<span className="text-[var(--foreground)]">release</span>.
					</p>

					{/* SKILL.md preview */}
					<div className="terminal-preview text-left mb-6">
						<div className="text-[var(--dim)] text-xs mb-3"># Generated SKILL.md — Manager</div>
						<div><span className="prompt">## </span><span className="cmd">Standing Orders (Every Wake Cycle)</span></div>
						<div className="output mt-1">1. k2so checkin</div>
						<div className="output">2. Read and respond to messages (k2so msg)</div>
						<div className="output">3. Triage inbox work items by priority</div>
						<div className="output">4. Route: simple → do it, complex → delegate</div>
						<div className="output">5. Check agent work for review</div>
						<div className="output">6. k2so done (or k2so done --blocked)</div>
						<div className="mt-3"><span className="prompt">## </span><span className="cmd">Your Team</span></div>
						<div className="output mt-1">backend-eng — Backend development</div>
						<div className="output">frontend-eng — Frontend development</div>
						<div className="output">qa-eng — Quality assurance & testing</div>
						<div className="mt-3"><span className="prompt">## </span><span className="cmd">Decision Framework</span></div>
						<div className="output mt-1">Build mode → full autonomy, no sign-off</div>
						<div className="output">Managed mode → features need approval</div>
						<div className="output">Maintenance → bugs and security only</div>
					</div>

					{/* Skill preview mockup — editor view */}
					<div className="border border-[var(--border)] overflow-hidden" style={{ background: '#0a0a0a' }}>
						<div className="flex items-center px-3 py-1.5 border-b border-[#2a2a2a] text-[10px] text-[#71717a]" style={{ background: '#141414' }}>
							<span className="text-[#a1a1aa]">SKILL.md</span>
							<span className="ml-auto text-[8px]">markdown</span>
						</div>
						<div className="p-4 font-mono text-[10px] leading-relaxed text-left" style={{ color: '#a1a1aa' }}>
							<div className="text-[#71717a]"><span className="text-[#3b82f6]">1</span>  # K2SO Workspace Skill</div>
							<div className="text-[#71717a]"><span className="text-[#3b82f6]">2</span>  </div>
							<div><span className="text-[#3b82f6]">3</span>  <span className="text-[#e4e4e7]">## Commands</span></div>
							<div><span className="text-[#3b82f6]">4</span>  k2so checkin — announce you are awake</div>
							<div><span className="text-[#3b82f6]">5</span>  k2so status — show workspace state</div>
							<div><span className="text-[#3b82f6]">6</span>  k2so done — mark work complete</div>
							<div><span className="text-[#3b82f6]">7</span>  k2so msg &lt;to&gt; &quot;text&quot; — send a message</div>
							<div><span className="text-[#3b82f6]">8</span>  k2so reserve &lt;item&gt; — claim a work item</div>
							<div><span className="text-[#3b82f6]">9</span>  k2so release &lt;item&gt; — release a work item</div>
							<div className="text-[#71717a]"><span className="text-[#3b82f6]">10</span> </div>
							<div><span className="text-[#3b82f6]">11</span> <span className="text-[#e4e4e7]">## Your Team</span></div>
							<div><span className="text-[#3b82f6]">12</span> backend-eng — Backend development</div>
							<div><span className="text-[#3b82f6]">13</span> frontend-eng — Frontend development</div>
							<div><span className="text-[#3b82f6]">14</span> qa-eng — Quality assurance &amp; testing</div>
						</div>
					</div>
				</div>
			</section>

			{/* CLI Agent Integration */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						CLI Agent Integration
					</h2>
					<p className="text-[var(--muted)] text-sm mb-8 max-w-lg leading-relaxed">
						One click opens an agent in a terminal tab. No custom harnesses, no
						wrappers — K2SO runs CLI tools directly. Bring your own API keys.
					</p>
					<div className="flex flex-wrap gap-2 mb-6">
						{AGENTS.map((agent) => (
							<div key={agent.name} className="agent-btn">
								<span className="text-[var(--accent)] text-xs">$</span>
								<span>{agent.name}</span>
							</div>
						))}
					</div>

					{/* Running agents mockup — CMD+J panel */}
					<div className="border border-[var(--border)] max-w-lg overflow-hidden" style={{ background: '#141414', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}>
						{/* Search */}
						<div className="flex items-center px-4 py-2.5 border-b border-[#2a2a2a]">
							<span className="text-[#71717a] text-xs mr-2">&#128269;</span>
							<span className="text-[11px] text-[#71717a]">Search running agents...</span>
							<span className="ml-auto text-[9px] text-[#71717a]">3 agents</span>
						</div>
						{/* Agent list */}
						<div>
							<div className="flex items-center gap-3 px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
								<span className="text-[#D4A574] text-sm">&#10038;</span>
								<div className="flex-1 text-left">
									<div className="text-[11px] text-[#e4e4e7] font-medium">my-project</div>
									<div className="text-[9px] text-[#71717a]">claude — feat/add-auth</div>
								</div>
								<div className="flex items-center gap-1.5">
									<div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
									<span className="text-[9px] text-[#71717a]">working</span>
								</div>
							</div>
							<div className="flex items-center gap-3 px-4 py-2.5">
								<span className="text-[#10A37F] text-sm">&#91;&#93;</span>
								<div className="flex-1 text-left">
									<div className="text-[11px] text-[#e4e4e7] font-medium">api-service</div>
									<div className="text-[9px] text-[#71717a]">codex — fix/pagination</div>
								</div>
								<div className="flex items-center gap-1.5">
									<div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
									<span className="text-[9px] text-[#71717a]">working</span>
								</div>
							</div>
							<div className="flex items-center gap-3 px-4 py-2.5">
								<span className="text-[#4285F4] text-sm">&#10022;</span>
								<div className="flex-1 text-left">
									<div className="text-[11px] text-[#e4e4e7] font-medium">web-app</div>
									<div className="text-[9px] text-[#71717a]">gemini — refactor/components</div>
								</div>
								<div className="flex items-center gap-1.5">
									<div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
									<span className="text-[9px] text-[#71717a]">review</span>
								</div>
							</div>
						</div>
						{/* Footer */}
						<div className="flex items-center justify-between px-4 py-2 border-t border-[#2a2a2a]">
							<span className="text-[9px] text-[#71717a]">&#8593;&#8595; navigate &middot; Enter open &middot; Esc close</span>
							<span className="text-[9px] text-[#71717a]">&#8984;J</span>
						</div>
					</div>
					<p className="text-xs text-[var(--dim)] mt-4">
						Press <span className="kbd"><span className="text-[10px]">&#8984;</span>J</span> to
						see all running agents, jump to their terminal, or copy their output.
					</p>
				</div>
			</section>

			{/* Workspace States */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						Workspace States
					</h2>
					<p className="text-[var(--muted)] text-sm mb-10 max-w-lg leading-relaxed">
						Control how much autonomy your agents have. Four modes — from full
						auto-pilot to fully locked — with per-capability controls for features,
						issues, crashes, security, and audits.
					</p>

					<div className="grid sm:grid-cols-2 gap-4 mb-10">
						<div className="feature-card">
							<h3>
								<span className="text-[#4ade80] mr-2">&#9679;</span>
								Build
							</h3>
							<p>
								Full autonomy. Agents build, merge, and ship everything
								automatically. No human sign-off needed.
							</p>
						</div>
						<div className="feature-card">
							<h3>
								<span className="text-[var(--accent)] mr-2">&#9679;</span>
								Managed
							</h3>
							<p>
								Features and audits require human approval. Bugs and security
								fixes can be handled automatically.
							</p>
						</div>
						<div className="feature-card">
							<h3>
								<span className="text-[#facc15] mr-2">&#9679;</span>
								Maintenance
							</h3>
							<p>
								Bugs and security only. No new features. Agents handle what&apos;s
								broken and nothing more.
							</p>
						</div>
						<div className="feature-card">
							<h3>
								<span className="text-[#f87171] mr-2">&#9679;</span>
								Locked
							</h3>
							<p>
								No agent activity. The workspace is dormant. Useful for freezes
								or when you need full manual control.
							</p>
						</div>
					</div>

					{/* Workspace states mockup — settings panel */}
					<div className="border border-[var(--border)] overflow-hidden" style={{ background: '#0a0a0a' }}>
						<div className="px-3 py-2 border-b border-[#2a2a2a] text-[10px] text-[#a1a1aa] font-medium" style={{ background: '#141414' }}>
							Settings &rsaquo; Workspace State
						</div>
						<div className="p-3 space-y-2">
							{/* Build state */}
							<div className="flex items-center justify-between px-3 py-2.5 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
								<div className="flex items-center gap-2 text-left">
									<div className="w-2 h-2 rounded-full bg-[#4ade80]" />
									<div>
										<div className="text-[11px] text-[#e4e4e7] font-semibold">Build</div>
										<div className="text-[9px] text-[#71717a]">Full autonomy — no sign-off needed</div>
									</div>
								</div>
								<div className="flex gap-2 text-[8px]">
									<span className="px-1.5 py-0.5 text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>features: auto</span>
									<span className="px-1.5 py-0.5 text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>bugs: auto</span>
									<span className="px-1.5 py-0.5 text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>security: auto</span>
								</div>
							</div>
							{/* Managed state — active */}
							<div className="flex items-center justify-between px-3 py-2.5 border border-[#3b82f6]" style={{ background: '#1e1e1e' }}>
								<div className="flex items-center gap-2 text-left">
									<div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
									<div>
										<div className="text-[11px] text-[#e4e4e7] font-semibold">Managed <span className="text-[8px] text-[#3b82f6] ml-1">ACTIVE</span></div>
										<div className="text-[9px] text-[#71717a]">Features need approval</div>
									</div>
								</div>
								<div className="flex gap-2 text-[8px]">
									<span className="px-1.5 py-0.5 text-[#facc15]" style={{ background: 'rgba(250,204,21,0.1)' }}>features: gated</span>
									<span className="px-1.5 py-0.5 text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>bugs: auto</span>
									<span className="px-1.5 py-0.5 text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>security: auto</span>
								</div>
							</div>
							{/* Maintenance */}
							<div className="flex items-center justify-between px-3 py-2.5 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
								<div className="flex items-center gap-2 text-left">
									<div className="w-2 h-2 rounded-full bg-[#facc15]" />
									<div>
										<div className="text-[11px] text-[#e4e4e7] font-semibold">Maintenance</div>
										<div className="text-[9px] text-[#71717a]">Bugs and security only</div>
									</div>
								</div>
								<div className="flex gap-2 text-[8px]">
									<span className="px-1.5 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>features: off</span>
									<span className="px-1.5 py-0.5 text-[#4ade80]" style={{ background: 'rgba(74,222,128,0.1)' }}>bugs: auto</span>
									<span className="px-1.5 py-0.5 text-[#facc15]" style={{ background: 'rgba(250,204,21,0.1)' }}>security: gated</span>
								</div>
							</div>
							{/* Locked */}
							<div className="flex items-center justify-between px-3 py-2.5 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
								<div className="flex items-center gap-2 text-left">
									<div className="w-2 h-2 rounded-full bg-[#f87171]" />
									<div>
										<div className="text-[11px] text-[#e4e4e7] font-semibold">Locked</div>
										<div className="text-[9px] text-[#71717a]">No agent activity</div>
									</div>
								</div>
								<div className="flex gap-2 text-[8px]">
									<span className="px-1.5 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>features: off</span>
									<span className="px-1.5 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>bugs: off</span>
									<span className="px-1.5 py-0.5 text-[#71717a]" style={{ background: 'rgba(255,255,255,0.05)' }}>security: off</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Heartbeat Scheduling */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						Heartbeat Scheduling
					</h2>
					<p className="text-[var(--muted)] text-sm mb-10 max-w-lg leading-relaxed">
						Agents wake on schedule — daily, weekly, monthly, or hourly work windows.
						Each heartbeat cycle runs the standing orders: check messages, triage
						inbox, build or delegate, report done. Set it and let them work.
					</p>

					{/* Heartbeat mockup — schedule dialog */}
					<div className="border border-[var(--border)] max-w-sm overflow-hidden" style={{ background: '#1e1e1e', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}>
						{/* Header */}
						<div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a]">
							<span className="text-[12px] text-[#e4e4e7] font-semibold">Heartbeat Schedule</span>
							<span className="text-[#71717a] text-xs cursor-pointer">&times;</span>
						</div>
						{/* Tabs */}
						<div className="flex border-b border-[#2a2a2a]">
							<div className="flex-1 text-center py-2 text-[10px] text-[#3b82f6] border-b-2 border-[#3b82f6]" style={{ background: 'rgba(59,130,246,0.05)' }}>Scheduled</div>
							<div className="flex-1 text-center py-2 text-[10px] text-[#71717a]">Hourly</div>
						</div>
						{/* Form */}
						<div className="px-4 py-3 space-y-3">
							<div className="flex items-center gap-3">
								<span className="text-[10px] text-[#71717a] w-16">Frequency</span>
								<div className="flex-1 px-2 py-1 border border-[#2a2a2a] text-[10px] text-[#a1a1aa]" style={{ background: '#0a0a0a' }}>Daily</div>
							</div>
							<div className="flex items-center gap-3">
								<span className="text-[10px] text-[#71717a] w-16">Time</span>
								<div className="flex-1 px-2 py-1 border border-[#2a2a2a] text-[10px] text-[#a1a1aa]" style={{ background: '#0a0a0a' }}>09:00 AM</div>
							</div>
						</div>
						{/* Preview */}
						<div className="px-4 py-2.5 border-t border-[#2a2a2a]" style={{ background: 'rgba(10,10,10,0.5)' }}>
							<div className="text-[9px] text-[#71717a] font-medium mb-1">Next runs</div>
							<div className="text-[9px] text-[#a1a1aa] font-mono space-y-0.5">
								<div>Mon Apr 14 — 09:00 AM</div>
								<div>Tue Apr 15 — 09:00 AM</div>
								<div>Wed Apr 16 — 09:00 AM</div>
							</div>
						</div>
						{/* Footer */}
						<div className="flex items-center justify-between px-4 py-2.5 border-t border-[#2a2a2a]">
							<span className="text-[9px] text-[#71717a] hover:text-[#f87171] cursor-pointer">Turn off</span>
							<div className="flex gap-2">
								<span className="px-3 py-1 text-[9px] text-[#71717a] cursor-pointer">Cancel</span>
								<span className="px-3 py-1 text-[9px] text-white font-medium" style={{ background: '#3b82f6' }}>Save</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Connected Workspaces */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">
						Connected Workspaces
					</h2>
					<p className="text-[var(--muted)] text-sm mb-10 max-w-lg leading-relaxed">
						Workspaces talk to each other. Connect them so agents can oversee multiple
						codebases, send work across projects, and coordinate releases. Messages
						flow through a DB-backed system with <span className="text-[var(--foreground)]">workspace:agent</span> addressing.
					</p>

					{/* Connected workspaces mockup */}
					<div className="border border-[var(--border)] max-w-lg overflow-hidden" style={{ background: '#0a0a0a' }}>
						<div className="px-3 py-2 border-b border-[#2a2a2a] text-[10px] text-[#a1a1aa] font-medium" style={{ background: '#141414' }}>
							Settings &rsaquo; Connected Workspaces
						</div>
						<div className="p-3 space-y-2">
							<div className="flex items-center gap-2.5 px-3 py-2.5 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
								<div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
								<div className="text-left">
									<div className="text-[11px] text-[#e4e4e7] font-medium">my-api</div>
									<div className="text-[9px] text-[#71717a]">~/projects/my-api</div>
								</div>
								<span className="ml-auto text-[8px] text-[#4ade80]">connected</span>
							</div>
							<div className="flex items-center gap-2.5 px-3 py-2.5 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
								<div className="w-2 h-2 rounded-full bg-[#a78bfa]" />
								<div className="text-left">
									<div className="text-[11px] text-[#e4e4e7] font-medium">mobile-app</div>
									<div className="text-[9px] text-[#71717a]">~/projects/mobile-app</div>
								</div>
								<span className="ml-auto text-[8px] text-[#4ade80]">connected</span>
							</div>
							<div className="flex items-center gap-2.5 px-3 py-2.5 border border-[#2a2a2a]" style={{ background: '#1e1e1e' }}>
								<div className="w-2 h-2 rounded-full bg-[#fb923c]" />
								<div className="text-left">
									<div className="text-[11px] text-[#e4e4e7] font-medium">shared-libs</div>
									<div className="text-[9px] text-[#71717a]">~/projects/shared-libs</div>
								</div>
								<span className="ml-auto text-[8px] text-[#4ade80]">connected</span>
							</div>
						</div>
					</div>
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

			{/* Under the hood */}
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
								~25MB binary vs ~250MB+ Electron apps. Native PTY via
								portable-pty. SQLite via rusqlite. Local LLM via llama.cpp with
								Metal GPU. Fast startup, low memory.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Companion */}
			<section className="border-t border-[var(--border)] px-6 py-20">
				<div className="max-w-3xl mx-auto text-center">
					<p className="text-[var(--accent)] text-xs tracking-wide mb-3 uppercase">Mobile</p>
					<h2 className="text-2xl font-semibold mb-4">Take it with you</h2>
					<p className="text-[var(--muted)] text-sm mb-8 max-w-md mx-auto leading-relaxed">
						K2SO Companion puts your agent workspace on your phone. Monitor agents,
						chat with running sessions, and approve reviews — all from mobile.
					</p>
					<Link
						href="/companion"
						className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--muted)] font-medium px-6 py-3 hover:border-[var(--accent-dim)] hover:text-white transition-colors text-sm"
					>
						K2SO Companion &rarr;
					</Link>
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
