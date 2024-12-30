"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical } from "lucide-react";
import InputAnswer from "@/components/dashboard/input-answer";
import { RadioGroup } from "@/components/ui/radio-group";

export interface Answer {
	text: string;
	correct: boolean;
}

export interface Question {
	question: string;
	answers: Answer[];
}

export interface Quiz {
	title: string;
	questions: Question[];
}

export default function DashboardPage() {
	const [questions, setQuestions] = useState<Question[]>([]);

	const handleAddQuestion = () => {
		const defAnswer: Answer[] = [
			{ text: "", correct: true },
			{ text: "", correct: false },
		];
		const newQuestion: Question = { question: "", answers: defAnswer };
		setQuestions([...questions, newQuestion]);
	};

  const handleAddAnswer = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    const newAnswer: Answer = { text: '', correct: false };
    updatedQuestions[questionIndex].answers.push(newAnswer);
    setQuestions(updatedQuestions);
  };

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "350px",
				} as React.CSSProperties
			}
		>
			<AppSidebar questions={questions} />
			<SidebarInset>
				<header className='sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className='hidden md:block'>
								<BreadcrumbLink href='#'>All Inboxes</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className='hidden md:block' />
							<BreadcrumbItem>
								<BreadcrumbPage>Inbox</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<Button variant={"outline"} className='ml-auto' onClick={handleAddQuestion}>
						Add Question
					</Button>
				</header>

				{questions.map((question, index) => (
					<div className='pt-4 px-4' key={index} id={`quizen-${index}`}>
						<Card>
							<div className='p-6'>
								<div className='flex items-center justify-between mb-4'>
									<div className='flex items-center space-x-2'>
										<span className='font-medium'>Multiple choice</span>
									</div>
									<div className='flex items-center space-x-4'>
										<Button variant='ghost' size='icon'>
											<MoreVertical className='h-4 w-4' />
										</Button>
									</div>
								</div>

								<div className='mb-4'>
									<div className='flex items-center space-x-2 mb-2'>
										<span className='text-sm font-medium'>Question {index + 1}</span>
										<span className='text-red-500'>*</span>
									</div>
                  <Input
                    className='w-full'
                    placeholder='Enter your question here'
                    value={question.question}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].question = e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                  />
								</div>

								<RadioGroup defaultValue='comfortable' className='space-y-2'>
									{question.answers.map((data, indexAns) => (
										<InputAnswer index={indexAns} option={data.text} key={`${index}-${indexAns}`} onChange={(indexAns, value) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].answers[indexAns].text = value;
                      setQuestions(updatedQuestions);
                    }}/>
									))}
								</RadioGroup>

								<Button variant='outline' className='mt-4' onClick={() => handleAddAnswer(index)}>
									Add answers
								</Button>
							</div>
						</Card>
					</div>
				))}
			</SidebarInset>
		</SidebarProvider>
	);
}
