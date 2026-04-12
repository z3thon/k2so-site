"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const REPO_URL = "https://github.com/Alakazam-211/K2SO";

export default function Nav({ downloadUrl }: { downloadUrl: string }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50" style={{ width: 'min(768px, calc(100% - 16px))' }}>
			<nav className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border border-[var(--border)] bg-[#0a0a0a]/90 backdrop-blur-sm">
				<div className="flex items-center gap-1.5 sm:gap-2.5">
					<a href="https://alakazamlabs.com" target="_blank" rel="noopener noreferrer">
						<Image
							src="/alakzm-logo.jpg"
							alt="Alakazam Labs"
							width={28}
							height={28}
							className="opacity-90 hover:opacity-100 transition-opacity sm:w-8 sm:h-8"
							priority
						/>
					</a>
					<span className="text-[var(--muted)] text-base sm:text-lg font-light select-none">/</span>
					<Link href="/" prefetch={false}>
						<Image
							src="/k2so-logo.jpg"
							alt="K2SO"
							width={28}
							height={28}
							className="opacity-90 hover:opacity-100 transition-opacity sm:w-8 sm:h-8"
							priority
						/>
					</Link>
				</div>

				{/* Desktop links */}
				<div className="hidden sm:flex items-center gap-5 text-sm">
					<Link href="/" prefetch={false} className="text-[var(--muted)] hover:text-white transition-colors text-xs">
						Home
					</Link>
					<Link href="/companion" className="text-[var(--muted)] hover:text-white transition-colors text-xs">
						Companion
					</Link>
					<Link href="/changelog" className="text-[var(--muted)] hover:text-white transition-colors text-xs">
						What&apos;s New
					</Link>
					<a
						href={REPO_URL}
						className="inline-flex items-center text-[var(--muted)] hover:text-white transition-colors"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<svg width="20" height="20" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
						</svg>
					</a>
					<a
						href={downloadUrl}
						className="bg-[var(--accent)] text-black font-semibold px-4 py-1.5 hover:opacity-90 transition-opacity text-xs tracking-wide"
					>
						DOWNLOAD
					</a>
				</div>

				{/* Mobile hamburger */}
				<button
					onClick={() => setOpen(!open)}
					className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] bg-[var(--accent)]"
					aria-label="Toggle menu"
				>
					<span
						className={`block h-[2px] w-4 bg-[#0a0a0a] transition-all duration-300 origin-center ${
							open ? "rotate-45 translate-y-[7px]" : ""
						}`}
					/>
					<span
						className={`block h-[2px] w-4 bg-[#0a0a0a] transition-all duration-300 ${
							open ? "opacity-0 scale-x-0" : ""
						}`}
					/>
					<span
						className={`block h-[2px] w-4 bg-[#0a0a0a] transition-all duration-300 origin-center ${
							open ? "-rotate-45 -translate-y-[7px]" : ""
						}`}
					/>
				</button>
			</nav>

			{/* Mobile tray */}
			<div
				className={`sm:hidden overflow-hidden transition-all duration-300 ease-out border-x border-b border-[var(--border)] bg-[#0a0a0a]/95 backdrop-blur-sm ${
					open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-b-0"
				}`}
			>
				<div className="flex flex-col gap-1 px-4 py-4">
					<Link
						href="/"
						onClick={() => setOpen(false)}
						className="text-[var(--muted)] hover:text-white transition-colors text-sm py-2"
					>
						Home
					</Link>
					<Link
						href="/companion"
						onClick={() => setOpen(false)}
						className="text-[var(--muted)] hover:text-white transition-colors text-sm py-2"
					>
						Companion
					</Link>
					<Link
						href="/changelog"
						onClick={() => setOpen(false)}
						className="text-[var(--muted)] hover:text-white transition-colors text-sm py-2"
					>
						What&apos;s New
					</Link>
					<a
						href={REPO_URL}
						className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-white transition-colors text-sm py-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg width="16" height="16" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
						</svg>
						GitHub
					</a>
					<a
						href={downloadUrl}
						className="mt-2 text-center bg-[var(--accent)] text-black font-semibold px-4 py-2.5 hover:opacity-90 transition-opacity text-xs tracking-wide"
					>
						DOWNLOAD
					</a>
				</div>
			</div>
		</div>
	);
}
