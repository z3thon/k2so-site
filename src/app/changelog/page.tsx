import Nav from "@/components/Nav";

const REPO_URL = "https://github.com/Alakazam-211/K2SO";

interface ReleaseAsset {
	name: string;
	browser_download_url: string;
	size: number;
}

interface Release {
	tag_name: string;
	name: string;
	body: string;
	published_at: string;
	html_url: string;
	assets: ReleaseAsset[];
}

async function getReleases(): Promise<Release[]> {
	try {
		const res = await fetch(
			"https://api.github.com/repos/Alakazam-211/K2SO/releases",
			{ next: { revalidate: 300 } }
		);
		if (!res.ok) throw new Error("GitHub API error");
		return await res.json();
	} catch {
		return [];
	}
}

function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function formatSize(bytes: number): string {
	const mb = bytes / (1024 * 1024);
	return `${mb.toFixed(1)} MB`;
}

/** Simple markdown-to-HTML for release notes (handles ##, -, **, `) */
function renderMarkdown(body: string): React.JSX.Element[] {
	const lines = body.split("\n");
	const elements: React.JSX.Element[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.startsWith("## ")) {
			elements.push(
				<h3 key={i} className="text-sm font-semibold text-[var(--foreground)] mt-4 mb-2">
					{line.replace("## ", "")}
				</h3>
			);
		} else if (line.startsWith("### ")) {
			elements.push(
				<h4 key={i} className="text-xs font-semibold text-[var(--foreground)] mt-3 mb-1">
					{line.replace("### ", "")}
				</h4>
			);
		} else if (line.startsWith("- ")) {
			const content = line.replace("- ", "");
			elements.push(
				<div key={i} className="flex gap-2 text-xs text-[var(--muted)] leading-relaxed pl-1">
					<span className="text-[var(--dim)] flex-shrink-0">-</span>
					<span dangerouslySetInnerHTML={{
						__html: content
							.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--foreground)] font-medium">$1</strong>')
							.replace(/`(.*?)`/g, '<code class="px-1 py-0.5 bg-white/[0.06] text-[var(--accent)]">$1</code>')
					}} />
				</div>
			);
		} else if (line.trim() === "") {
			// skip empty lines
		} else {
			elements.push(
				<p key={i} className="text-xs text-[var(--muted)] leading-relaxed" dangerouslySetInnerHTML={{
					__html: line
						.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--foreground)]">$1</strong>')
						.replace(/`(.*?)`/g, '<code class="px-1 py-0.5 bg-white/[0.06] text-[var(--accent)]">$1</code>')
						.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--accent)] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
				}} />
			);
		}
	}

	return elements;
}

export const metadata = {
	title: "What's New — K2SO",
	description: "Release notes and changelog for K2SO",
};

export default async function ChangelogPage() {
	const releases = await getReleases();

	// Get download URL from latest release
	const latestDmg = releases[0]?.assets.find((a) => a.name.endsWith(".dmg"));
	const downloadUrl = latestDmg?.browser_download_url
		?? `https://github.com/Alakazam-211/K2SO/releases/latest`;

	return (
		<main className="min-h-screen flex flex-col">
			<Nav downloadUrl={downloadUrl} />

			{/* Content */}
			<div className="max-w-2xl mx-auto px-6 pt-28 pb-20 w-full">
				<h1 className="text-3xl font-bold mb-2">What&apos;s New</h1>
				<p className="text-sm text-[var(--muted)] mb-10">
					Release notes for K2SO. Updates are published to{" "}
					<a
						href="https://github.com/Alakazam-211/K2SO/releases"
						className="text-[var(--accent)] hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>.
				</p>

				{releases.length === 0 ? (
					<p className="text-sm text-[var(--dim)]">No releases found.</p>
				) : (
					<div className="space-y-0">
						{releases.map((release, idx) => {
							const dmg = release.assets.find((a) => a.name.endsWith(".dmg"));
							return (
								<div
									key={release.tag_name}
									className={`py-8 ${idx < releases.length - 1 ? "border-b border-[var(--border)]" : ""}`}
								>
									{/* Header */}
									<div className="flex items-baseline justify-between mb-4">
										<div className="flex items-center gap-3">
											<h2 className="text-lg font-semibold">
												{release.name || release.tag_name}
											</h2>
											{idx === 0 && (
												<span className="text-[9px] tracking-widest uppercase px-2 py-0.5 bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-medium">
													Latest
												</span>
											)}
										</div>
										<span className="text-xs text-[var(--dim)]">
											{formatDate(release.published_at)}
										</span>
									</div>

									{/* Body */}
									<div className="space-y-1 mb-4">
										{renderMarkdown(release.body)}
									</div>

									{/* Download */}
									{dmg && (
										<a
											href={dmg.browser_download_url}
											className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors mt-2"
										>
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
												<polyline points="7 10 12 15 17 10" />
												<line x1="12" y1="15" x2="12" y2="3" />
											</svg>
											Download {dmg.name} ({formatSize(dmg.size)})
										</a>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>

			{/* Footer */}
			<footer className="border-t border-[var(--border)] px-6 py-8 mt-auto">
				<div className="max-w-2xl mx-auto text-center text-xs text-[var(--dim)] space-y-2">
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
						Copyright &copy; {new Date().getFullYear()} Alakazam Labs. MIT License.
					</p>
				</div>
			</footer>
		</main>
	);
}
