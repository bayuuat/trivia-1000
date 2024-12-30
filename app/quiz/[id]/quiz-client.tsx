'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Answer {
  id: number;
  text: string;
  is_correct: boolean;
  question_id: number;
}

interface Question {
  id: number;
  quiz_id: number;
  question: string;
  answers: Answer[];
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

interface QuizState {
  currentQuestion: number;
  selectedAnswer: string;
  score: number;
  showResults: boolean;
}

interface QuizClientProps {
  quizId: string;
}

export default function QuizClient({ quizId }: QuizClientProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: '',
    score: 0,
    showResults: false,
  });

  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return <div className="text-center p-4">Loading quiz...</div>;
  }

  if (error) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-6">
          <p className="text-red-500">Error: {error}</p>
          <Button 
            onClick={() => router.push('/')}
            className="mt-4"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!quiz) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-6">
          <p>Quiz not found</p>
          <Button 
            onClick={() => router.push('/')}
            className="mt-4"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleAnswer = (answerId: number): void => {
    const current = quiz.questions[quizState.currentQuestion];
    const correct = current.answers.find(a => a.is_correct)?.id === answerId;
    
    setQuizState(prev => ({
      ...prev,
      score: correct ? prev.score + 1 : prev.score,
      selectedAnswer: answerId.toString(),
    }));
    setShowCorrectAnswer(true);
  };

  const nextQuestion = (): void => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      selectedAnswer: '',
      showResults: prev.currentQuestion + 1 >= quiz.questions.length,
    }));
    setShowCorrectAnswer(false);
  };

  const resetQuiz = (): void => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: '',
      score: 0,
      showResults: false,
    });
    setShowCorrectAnswer(false);
  };

  if (quizState.showResults) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{quiz.title} - Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            You scored {quizState.score} out of {quiz.questions.length}!
          </p>
          <div className="space-x-4">
            <Button onClick={resetQuiz}>Try Again</Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/quizzes')}
            >
              Back to Quizzes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quiz.questions[quizState.currentQuestion];
  const correctAnswerId = currentQ.answers.find(a => a.is_correct)?.id;

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <p className="text-sm text-gray-500">
          Question {quizState.currentQuestion + 1} of {quiz.questions.length}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{currentQ.question}</p>
        <div className="space-y-4">
          {currentQ.answers.map((answer) => (
            <Button
              key={answer.id}
              onClick={() => handleAnswer(answer.id)}
              className={`w-full ${showCorrectAnswer && answer.is_correct ? 'bg-green-500 hover:bg-green-500' : ''} ${showCorrectAnswer && !answer.is_correct && quizState.selectedAnswer === answer.id.toString() ? 'bg-red-500 hover:bg-red-500' : ''}`}
            >
              {answer.text}
            </Button>
          ))}
        </div>
        <Button
            className="mt-6"
            onClick={nextQuestion}
            disabled={!showCorrectAnswer}
          >
            {quizState.currentQuestion + 1 === quiz.questions.length 
              ? 'Finish Quiz' 
              : 'Next Question'}
          </Button>
      </CardContent>
    </Card>
  );
}