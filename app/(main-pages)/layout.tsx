import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<main className='min-h-screen flex flex-col items-center'>
				<div className='flex-1 w-full flex flex-col gap-20 items-center'>
					<nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
						<div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
							<div className='flex gap-5 items-center font-semibold'>
								<Link className='text-xl' href={"/"}>
									Trivia 1000
								</Link>
							</div>
							{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
						</div>
					</nav>
					{children}
					<footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16'>
						<p>
							Powered by{" "}
							<a
								href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
								target='_blank'
								className='font-bold hover:underline'
								rel='noreferrer'
							>
								Supabase
							</a>
						</p>
					</footer>
				</div>
			</main>
		</>
	);
}
