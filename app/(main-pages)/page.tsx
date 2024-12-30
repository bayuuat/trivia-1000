import Hero from "@/components/hero";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout() {
	return (
		<>
			<div className='flex-1 w-full flex flex-col gap-20 items-center'>
				<div className='flex-1 flex flex-col gap-20 max-w-5xl p-5 justify-center'>
					<Hero />
				</div>
			</div>
		</>
	);
}
