import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: number;
  quiz_id: number;
  question: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  question_id: number;
  text: string;
  is_correct: boolean;
}

const supabase = createClient();

export async function GET(
  request: Request,
  context: any
) {
  try {
    const { params } =  context;

    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select(`
        *,
        questions (
          *,
          answers (
            *
          )
        )
      `)
      .eq('id', params.id)
      .single();

    if (quizError) {
      return NextResponse.json(
        { error: 'Failed to fetch quiz' },
        { status: 500 }
      );
    }

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error in quiz route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { title, description, questions } = body;

    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert([{ title, description }])
      .select()
      .single();

    if (quizError) {
      return NextResponse.json(
        { error: 'Failed to create quiz' },
        { status: 500 }
      );
    }

    for (const question of questions) {
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert([{ 
          quiz_id: quiz.id,
          question: question.question 
        }])
        .select()
        .single();

      if (questionError) {
        return NextResponse.json(
          { error: 'Failed to create question' },
          { status: 500 }
        );
      }

      const answersToInsert = question.answers.map((answer: any) => ({
        question_id: questionData.id,
        text: answer.text,
        is_correct: answer.isCorrect
      }));

      const { error: answersError } = await supabase
        .from('answers')
        .insert(answersToInsert);

      if (answersError) {
        return NextResponse.json(
          { error: 'Failed to create answers' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error('Error in quiz creation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
