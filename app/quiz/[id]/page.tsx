import { use } from "react";
import QuizClient from "./quiz-client";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function QuizPage({ params }: PageProps) {
	const resolvedParams = use(params);
	return(
	<div className="flex flex-col justify-center items-center w-svw h-svh">
		<QuizClient quizId={resolvedParams.id} />
	</div>);
}
