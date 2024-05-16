import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import '../styles/login.css';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  
  return (
    <div>
      <div id="message">{searchParams?.message && (<p> {searchParams.message} </p>)}</div>
      <form id="login">
        <label htmlFor="email"> Email</label>
        <input name="email" placeholder="you@example.com" required/>
        <label htmlFor="password"> Password </label>
        <input type="password" name="password" placeholder="••••••••" required/>
        <SubmitButton formAction={signIn} pendingText="Signing In..."> Sign In </SubmitButton>
        <SubmitButton formAction={signUp} pendingText="Signing Up..."> Sign Up </SubmitButton>
      </form>
    </div>
  );
}
