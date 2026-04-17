import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

const APP_STORE_URL = "https://apps.apple.com/us/app/k2so/id6762076766";

export const metadata: Metadata = {
	title: "Companion — K2SO",
	description:
		"K2SO Companion puts your AI agent workspace on your phone. Monitor agents, chat with LLM sessions, and approve reviews from anywhere. Available on the App Store.",
};

function AppStoreBadge({ className = "" }: { className?: string }) {
	return (
		<a
			href={APP_STORE_URL}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Download on the App Store"
			className={`inline-block hover:opacity-80 transition-opacity ${className}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 120 40"
				width="156"
				height="52"
				role="img"
			>
				<rect width="120" height="40" rx="6" fill="#000" stroke="#A6A6A6" strokeWidth="0.5" />
				{/* Apple logo */}
				<path
					fill="#fff"
					d="M17.1 20.5c0-1.8 1-2.8 1-2.8s-.6-1-1.7-1c-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.5.7-3.2 1.9-1.4 2.4-.4 5.9.9 7.9.7 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6 1.1 0 1.4.6 2.5.6 1 0 1.7-1 2.4-2 .5-.7.8-1.4 1-2.1-.9-.4-2.4-1.3-2.4-3.9zM15.2 15.3c.5-.6.9-1.5.8-2.4-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.3.9 0 1.8-.5 2.3-1.1z"
				/>
				{/* "Download on the" */}
				<text x="31" y="17" fill="#fff" fontFamily="-apple-system, system-ui, sans-serif" fontSize="7" fontWeight="400">
					Download on the
				</text>
				{/* "App Store" */}
				<text x="31" y="30" fill="#fff" fontFamily="-apple-system, system-ui, sans-serif" fontSize="14" fontWeight="600">
					App Store
				</text>
			</svg>
		</a>
	);
}

// Phone frame wrapper
function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
	return (
		<div className="flex flex-col items-center">
			<div
				className="relative"
				style={{
					width: '240px',
					height: '480px',
					borderRadius: '32px',
					padding: '8px',
					background: '#1a1a1a',
					border: '1px solid #2a2a2a',
					boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
				}}
			>
				<div
					className="w-full h-full overflow-hidden relative"
					style={{
						borderRadius: '24px',
						background: '#0a0a0a',
					}}
				>
					{/* Notch */}
					<div
						className="absolute left-1/2 -translate-x-1/2 top-1 z-10"
						style={{
							width: '70px',
							height: '18px',
							background: '#1a1a1a',
							borderRadius: '0 0 10px 10px',
						}}
					/>
					{children}
				</div>
			</div>
			<div className="text-[11px] text-[var(--dim)] mt-3 font-mono uppercase tracking-wider">
				{label}
			</div>
		</div>
	);
}

export default function CompanionPage() {
	return (
		<>
			<Nav downloadUrl={APP_STORE_URL} />

			<main className="pt-28 pb-20">
				{/* Hero */}
				<section className="px-6 py-20">
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-[var(--accent)] text-xs mb-4 tracking-[0.3em] uppercase">
							K2SO Companion
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
							Your agents, in your pocket
						</h1>
						<p className="text-[var(--muted)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10">
							Monitor running agents, chat with LLM sessions, and approve reviews —
							without being at your laptop. K2SO Companion is a native iOS app that
							connects directly to your self-hosted K2SO server.
						</p>

						<div className="flex flex-col items-center gap-3">
							<AppStoreBadge />
							<p className="text-[11px] text-[var(--dim)]">iOS 16.0 or later &middot; iPhone</p>
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="border-t border-[var(--border)] px-6 py-20">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-2xl font-semibold mb-10 text-center">
							What it does
						</h2>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="feature-card">
								<h3>Live Session List</h3>
								<p>
									See every running session across your workspaces in real-time.
									Switch between active agents with a tap. Updates live via WebSocket.
									No refresh needed.
								</p>
							</div>
							<div className="feature-card">
								<h3>Chat with Agents</h3>
								<p>
									The killer feature. Send messages directly to your running LLM
									sessions from your phone. Keep agents progressing while you&apos;re
									away from your desk.
								</p>
							</div>
							<div className="feature-card">
								<h3>Full Terminal Output</h3>
								<p>
									Real terminal rendering with ANSI colors, monospace fonts, and
									scrollback. See exactly what your agent sees — no stripped-down
									mobile summary.
								</p>
							</div>
							<div className="feature-card">
								<h3>Secure Connection</h3>
								<p>
									No cloud service required. K2SO exposes itself via ngrok with
									username and password authentication. Your data never touches a
									third-party server.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Phone mockups */}
				<section className="border-t border-[var(--border)] px-6 py-20">
					<div className="max-w-5xl mx-auto">
						<h2 className="text-2xl font-semibold mb-10 text-center">
							Built for the small screen
						</h2>
						<div className="flex flex-wrap justify-center gap-8">
							{/* Login screen */}
							<PhoneFrame label="Connect">
								<div className="flex flex-col items-center justify-center h-full px-6 text-center">
									<div className="font-mono font-extrabold text-4xl text-[#e4e4e7] tracking-wider mb-1">K2</div>
									<div className="text-[9px] text-[#71717a] mb-8">by K2SO</div>
									<div className="w-full space-y-2">
										<div className="text-left">
											<div className="text-[8px] text-[#71717a] mb-1 uppercase tracking-wider">Server URL</div>
											<div className="px-3 py-2.5 border border-[#2a2a2a] text-[10px] text-[#a1a1aa] font-mono" style={{ background: '#111' }}>https://k2so.ngrok.app</div>
										</div>
										<div className="text-left">
											<div className="text-[8px] text-[#71717a] mb-1 uppercase tracking-wider">Username</div>
											<div className="px-3 py-2.5 border border-[#2a2a2a] text-[10px] text-[#a1a1aa] font-mono" style={{ background: '#111' }}>admin</div>
										</div>
										<div className="text-left">
											<div className="text-[8px] text-[#71717a] mb-1 uppercase tracking-wider">Password</div>
											<div className="px-3 py-2.5 border border-[#22d3ee] text-[10px] text-[#a1a1aa] font-mono" style={{ background: '#111' }}>••••••••••</div>
										</div>
										<div className="mt-4 px-3 py-2.5 text-[11px] font-semibold text-black text-center" style={{ background: '#fff' }}>
											Connect
										</div>
									</div>
								</div>
							</PhoneFrame>

							{/* Sessions screen */}
							<PhoneFrame label="Sessions">
								<div className="flex flex-col h-full">
									{/* Header */}
									<div className="flex items-center justify-between px-3 py-3 border-b border-[#1a1a1a] mt-6" style={{ background: '#111' }}>
										<div className="flex items-center gap-2">
											{/* Hamburger */}
											<div className="w-6 h-6 flex flex-col items-center justify-center gap-[3px]" style={{ background: '#22d3ee' }}>
												<div className="h-[2px] w-3 bg-black" />
												<div className="h-[2px] w-3 bg-black" />
												<div className="h-[2px] w-3 bg-black" />
											</div>
											<div className="flex items-center gap-1.5">
												<div className="w-3 h-3 flex items-center justify-center text-[7px] font-bold text-black" style={{ background: '#22d3ee' }}>M</div>
												<span className="text-[10px] text-[#e4e4e7] font-semibold">my-project</span>
												<span className="text-[7px] text-[#22c55e]">3 agents</span>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-[#71717a] text-[10px]">&#128269;</span>
											<div className="relative">
												<span className="text-[#71717a] text-[11px]">&#9634;</span>
												<span className="absolute -top-1 -right-1 w-2.5 h-2.5 flex items-center justify-center text-[6px] font-bold text-black" style={{ background: '#22d3ee' }}>3</span>
											</div>
										</div>
									</div>
									{/* Session cards */}
									<div className="flex-1 p-1.5 space-y-1 overflow-hidden">
										<div className="flex items-center border border-[#1a1a1a]" style={{ background: '#111' }}>
											<div className="w-0.5 self-stretch" style={{ background: '#22d3ee' }} />
											<div className="flex-1 px-3 py-2.5">
												<div className="text-[11px] text-[#e4e4e7]">Claude Code</div>
												<div className="text-[8px] text-[#71717a] mt-0.5">my-project</div>
											</div>
											<div className="pr-3">
												<div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
											</div>
										</div>
										<div className="flex items-center border border-[#1a1a1a]" style={{ background: '#111' }}>
											<div className="w-0.5 self-stretch" style={{ background: '#10A37F' }} />
											<div className="flex-1 px-3 py-2.5">
												<div className="text-[11px] text-[#e4e4e7]">Codex</div>
												<div className="text-[8px] text-[#71717a] mt-0.5">my-project</div>
											</div>
											<div className="pr-3">
												<div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
											</div>
										</div>
										<div className="flex items-center border border-[#1a1a1a]" style={{ background: '#111' }}>
											<div className="w-0.5 self-stretch" style={{ background: '#4285F4' }} />
											<div className="flex-1 px-3 py-2.5">
												<div className="text-[11px] text-[#e4e4e7]">Gemini</div>
												<div className="text-[8px] text-[#71717a] mt-0.5">my-project</div>
											</div>
											<div className="pr-3">
												<div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
											</div>
										</div>
										<div className="flex items-center border border-[#1a1a1a]" style={{ background: '#111' }}>
											<div className="w-0.5 self-stretch" style={{ background: '#D4A574' }} />
											<div className="flex-1 px-3 py-2.5">
												<div className="text-[11px] text-[#e4e4e7]">Claude — review-bot</div>
												<div className="text-[8px] text-[#71717a] mt-0.5">api-service</div>
											</div>
											<div className="pr-3">
												<div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
											</div>
										</div>
									</div>
									{/* Tab bar */}
									<div className="flex border-t border-[#1a1a1a] py-2" style={{ background: '#111' }}>
										<div className="flex-1 flex flex-col items-center gap-0.5">
											<span className="text-[12px] text-[#22d3ee]">&#9776;</span>
											<span className="text-[7px] text-[#22d3ee]">Sessions</span>
										</div>
										<div className="flex-1 flex flex-col items-center gap-0.5">
											<span className="text-[12px] text-[#71717a]">&#9881;</span>
											<span className="text-[7px] text-[#71717a]">Settings</span>
										</div>
									</div>
								</div>
							</PhoneFrame>

							{/* Chat screen */}
							<PhoneFrame label="Chat">
								<div className="flex flex-col h-full">
									{/* Header */}
									<div className="flex items-center gap-2 px-3 py-3 border-b border-[#2a2a2a] mt-6" style={{ background: '#111' }}>
										<span className="text-[#22d3ee] text-[10px]">&lsaquo;</span>
										<span className="text-[10px] text-[#e4e4e7] font-semibold">Claude Code</span>
										<span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
									</div>
									{/* Terminal content */}
									<div className="flex-1 p-3 font-mono text-[8px] overflow-hidden space-y-1" style={{ color: '#e4e4e7' }}>
										<div className="text-[#D4A574]">&#10038; Claude Code v1.0.31</div>
										<div className="text-[#71717a]">Ready for input</div>
										<div className="mt-2 pl-2 border-l-2 border-[#22d3ee]">
											<div className="text-[7px] text-[#22d3ee]">You</div>
											<div>Run the tests</div>
										</div>
										<div className="mt-2">
											<span className="text-[#4ade80]">&#10003;</span> Running bun test
										</div>
										<div className="pl-2 text-[#71717a]">
											<div><span className="text-[#4ade80]">PASS</span> auth.test.ts</div>
											<div><span className="text-[#4ade80]">PASS</span> session.test.ts</div>
											<div><span className="text-[#4ade80]">PASS</span> routes.test.ts</div>
										</div>
										<div className="text-[#4ade80] mt-1">12 tests passed</div>
									</div>
									{/* Input */}
									<div className="px-3 py-2 border-t border-[#2a2a2a] flex items-center gap-2" style={{ background: '#111' }}>
										<div className="flex-1 px-2 py-1.5 border border-[#22d3ee] text-[8px] text-[#71717a]" style={{ background: '#0a0a0a' }}>
											Type a message...
										</div>
										<div className="w-5 h-5 flex items-center justify-center border border-[#22d3ee] text-[10px] text-[#22d3ee]" style={{ background: '#0a0a0a' }}>
											&#8593;
										</div>
									</div>
								</div>
							</PhoneFrame>
						</div>
					</div>
				</section>

				{/* How it works */}
				<section className="border-t border-[var(--border)] px-6 py-20">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-2xl font-semibold mb-10 text-center">
							Get connected in 3 steps
						</h2>
						<div className="grid sm:grid-cols-3 gap-4">
							<div className="feature-card">
								<div className="text-[var(--accent)] text-xs font-semibold mb-3 tracking-wide">01</div>
								<h3>Enable on K2SO</h3>
								<p>
									In K2SO Settings, turn on Mobile Companion. Set a username, password,
									and your ngrok auth token.
								</p>
							</div>
							<div className="feature-card">
								<div className="text-[var(--accent)] text-xs font-semibold mb-3 tracking-wide">02</div>
								<h3>Install the app</h3>
								<p>
									Download K2SO Companion from the App Store. iOS 16 or later on any
									iPhone.
								</p>
							</div>
							<div className="feature-card">
								<div className="text-[var(--accent)] text-xs font-semibold mb-3 tracking-wide">03</div>
								<h3>Connect</h3>
								<p>
									Enter your ngrok URL and credentials. You&apos;re live. Your agents
									are now in your pocket.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Tech stack */}
				<section className="border-t border-[var(--border)] px-6 py-20">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-2xl font-semibold mb-4">
							Same engine as K2SO
						</h2>
						<p className="text-[var(--muted)] text-sm leading-relaxed">
							Built with Tauri v2 + Rust — the same lean stack powering K2SO itself.
							Native performance, no Electron, no React Native runtime. Just a webview
							with a Rust backend, ready for on-device LLM inference in a future release.
						</p>
					</div>
				</section>

				{/* CTA */}
				<section className="border-t border-[var(--border)] px-6 py-20">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-2xl font-semibold mb-6">
							Ready to take K2SO with you?
						</h2>
						<div className="flex flex-col items-center gap-4">
							<AppStoreBadge />
							<Link
								href="/privacy"
								className="text-xs text-[var(--dim)] hover:text-[var(--muted)] transition-colors"
							>
								Privacy Policy
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
