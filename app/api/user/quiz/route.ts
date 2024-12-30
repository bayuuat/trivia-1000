import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function GET() {
	try {
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError) {
      console.log("Failed to fetch user")
			return NextResponse.json({ error: "Failed to fetch user" }, { status: 401 });
		}

		if (!user) {
      console.log("User not authenticated")
			return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
		}

		const { data: quizzes, error } = await supabase
			.from("quizzes")
			.select(
				`
        *,
        questions (
          id
        )
      `
			)
			.eq("user_id", user.id)
			.order("created_at", { ascending: false });

		if (error) {
			return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 });
		}

		return NextResponse.json(quizzes);
	} catch (error) {
    console.log(error)
		console.error("Error in quizzes route:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
