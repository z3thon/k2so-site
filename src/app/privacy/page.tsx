import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
	title: "Privacy Policy — K2SO Companion",
	description:
		"Privacy policy for the K2SO Companion mobile app. No data collection, no tracking, no third-party services.",
};

export default function PrivacyPage() {
	return (
		<>
			<Nav downloadUrl="#" />

			<main className="pt-28 pb-20">
				<section className="px-6">
					<div className="max-w-2xl mx-auto">
						<p className="text-[var(--accent)] text-xs tracking-wide mb-3 uppercase">
							Legal
						</p>
						<h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
							Privacy Policy
						</h1>
						<p className="text-sm text-[var(--dim)] mb-10">
							K2SO Companion &mdash; Last updated April 12, 2026
						</p>

						<div className="space-y-8 text-sm text-[var(--muted)] leading-relaxed">
							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									Overview
								</h2>
								<p>
									K2SO Companion (&ldquo;the App&rdquo;) is a mobile client for{" "}
									<a
										href="https://k2so.sh"
										className="text-[var(--accent)] hover:underline"
									>
										K2SO
									</a>
									, an open-source AI workspace application. The App connects
									directly to your self-hosted K2SO server. Alakazam Labs does not
									operate any cloud service, relay, or intermediary between the App
									and your server.
								</p>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									Data Collection
								</h2>
								<p className="mb-3">
									<strong className="text-[var(--foreground)]">
										Alakazam Labs collects no data.
									</strong>{" "}
									Specifically:
								</p>
								<ul className="list-disc list-inside space-y-2 pl-1">
									<li>No analytics or usage tracking of any kind</li>
									<li>No crash reporting sent to Alakazam Labs</li>
									<li>No third-party SDKs, advertising frameworks, or tracking pixels</li>
									<li>No personal information is collected, stored, or transmitted to Alakazam Labs or any third party</li>
								</ul>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									How the App Works
								</h2>
								<p>
									The App communicates directly with your own K2SO server instance
									over a connection you configure (typically via an ngrok tunnel).
									All data flows exclusively between your device and your server.
									No data passes through Alakazam Labs infrastructure.
								</p>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									Data Stored on Your Device
								</h2>
								<p className="mb-3">The App stores the following locally on your device:</p>
								<ul className="list-disc list-inside space-y-2 pl-1">
									<li>
										<strong className="text-[var(--foreground)]">Connection credentials</strong>{" "}
										&mdash; your server URL, username, and password, stored in the
										device&apos;s secure storage
									</li>
									<li>
										<strong className="text-[var(--foreground)]">Session data</strong>{" "}
										&mdash; terminal output and agent activity are streamed in
										real-time and are not persisted beyond the current session
									</li>
								</ul>
								<p className="mt-3">
									This data never leaves your device except to communicate with
									your own server.
								</p>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									Third-Party Services
								</h2>
								<p>
									The App does not integrate with any third-party services. There
									are no analytics providers, no ad networks, no social media SDKs,
									and no external APIs. The only network connection the App makes
									is to the server URL you provide.
								</p>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									Children&apos;s Privacy
								</h2>
								<p>
									The App is not directed at children under 13. We do not knowingly
									collect any information from children.
								</p>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									Changes to This Policy
								</h2>
								<p>
									If we update this policy, we will post the revised version at
									this URL. Because we collect no data, changes would only reflect
									new app functionality.
								</p>
							</div>

							<div>
								<h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
									Contact
								</h2>
								<p>
									Questions about this policy can be directed to{" "}
									<a
										href="mailto:privacy@alakazamlabs.com"
										className="text-[var(--accent)] hover:underline"
									>
										privacy@alakazamlabs.com
									</a>
								</p>
							</div>

							<div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--dim)]">
								<p>&copy; {new Date().getFullYear()} Alakazam Labs. All rights reserved.</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
