import Link from "next/link";
import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<div className='flex flex-col gap-16 items-center'>
			<div className='flex gap-8 justify-center items-center'>
				<a href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs' target='_blank' rel='noreferrer'>
					<SupabaseLogo />
				</a>
				<span className='border-l rotate-45 h-6' />
				<a href='https://nextjs.org/' target='_blank' rel='noreferrer'>
					<NextLogo />
				</a>
			</div>
			<h1 className='sr-only'>Supabase and Next.js Starter Template</h1>
			<p className='text-3xl font-bold lg:text-6xl !leading-tight mx-auto max-w-4xl text-center'>Dive into the world of trivia <br/> fun and facts combined!</p>
			<div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8' />
      <Button size={"lg"} className='text-center'>
        <Link href='/quizzes'>
          <div className='inline-block px-6 py-3 text-lg font-medium'>
            Get Started
          </div>
        </Link>
      </Button>
		</div>
	);
}
