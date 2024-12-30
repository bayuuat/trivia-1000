import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function GET() {
  try {
    const { data: quizzes, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        questions (
          id
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch quizzes' },
        { status: 500 }
      );
    }

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error in quizzes route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    const { data, error } = await supabase
      .from('quizzes')
      .insert([{ title, description }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create quiz' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}