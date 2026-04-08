import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
	title: "Companion — K2SO",
	description:
		"K2SO Companion puts your AI agent workspace on your phone. Monitor agents, chat with LLM sessions, and approve reviews from anywhere.",
};

export default function CompanionPage() {
	return (
		<>
			<Nav downloadUrl="#" />

			<main className="pt-28 pb-20">
				<section className="px-6 py-32">
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-[var(--accent)] text-sm mb-4 tracking-wide">K2SO Companion</p>
						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
							Your agents, in your pocket
						</h1>
						<p className="text-[var(--muted)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10">
							K2SO Companion puts your AI agent workspace on your phone. Monitor running
							agents, chat with LLM sessions, and approve reviews — without being at your
							laptop.
						</p>
						<div className="inline-block border border-[var(--border)] bg-[var(--surface)] px-8 py-3 text-[var(--accent)] text-sm">
							Coming Soon
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
