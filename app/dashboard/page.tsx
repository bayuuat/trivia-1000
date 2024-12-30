"use client";

import { useEffect, useState } from "react";
import { Quiz } from "../(main-pages)/quizzes/quizzes-list";
import { getUserQuizzes } from "../actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const router = useRouter();

	useEffect(() => {
		const fetchQuizzes = async () => {
			const result = await getUserQuizzes();
			if (result.error) {
				setError(result.error);
			} else {
				setQuizzes(result.quizzes || []);
			}
		};

		fetchQuizzes();
	}, []);

	return (
		<div className='container mx-auto py-8 px-4'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-bold mb-8'>Your Quizzes</h1>
				<div className='grid gap-6 md:grid-cols-2'>
					{quizzes.map((quiz) => (
						<Card key={quiz.id} className='flex flex-col'>
							<CardHeader>
								<CardTitle>{quiz.title}</CardTitle>
								<CardDescription>{quiz.description}</CardDescription>
							</CardHeader>

							<CardContent>
								<p className='text-sm text-gray-500'>{quiz.questions.length} questions</p>
							</CardContent>

							<CardFooter className='mt-auto'>
								<Button variant={"outline"} onClick={() => router.push(`/dashboard/my-quiz/${quiz.id}`)}>
									Edit
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
