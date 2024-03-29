import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {




  return (
    <div className="flex justify-center items-center h-screen w-60 m-auto">
      <LoginForm />
    </div>
  );
}
