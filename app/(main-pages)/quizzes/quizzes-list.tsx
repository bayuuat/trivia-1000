"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: {
    id: number;
  }[];
}

interface QuizzesListProps {
  initialQuizzes: Quiz[];
}

export default function QuizzesList({ initialQuizzes }: QuizzesListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredQuizzes = initialQuizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Available Quizzes</h1>
        
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-500">
                  {quiz.questions.length} questions
                </p>
              </CardContent>
              
              <CardFooter className="mt-auto">
                <Button 
                  onClick={() => router.push(`/quiz/${quiz.id}`)}
                >
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No quizzes found</p>
          </div>
        )}
      </div>
    </div>
  );
}