import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    // const data = await request.json();

    const response = await supabase.from("blogs").select().limit(20);

    return Response.json(response);

}
export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await request.json();

    const response = await supabase.from("blogs").insert(data).select().single();

    return NextResponse.json(response);

}
export async function PATCH(request: Request) {

}
export async function DELETE(request: Request) {

}