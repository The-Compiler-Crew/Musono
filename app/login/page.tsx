import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import AuthButton from "../../components/AuthButton";
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

    return redirect("/protected");
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

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        {isSupabaseConnected && <AuthButton />}
        <div className="animation start-login"></div>
      </nav>

      <form>
        <label htmlFor="email"> Email</label>
        <input name="email" placeholder="you@example.com" required/>
        <label htmlFor="password"> Password </label>
        <input type="password" name="password" placeholder="••••••••" required/>
        <SubmitButton formAction={signIn} pendingText="Signing In..."> Sign In </SubmitButton>
        <SubmitButton formAction={signUp} pendingText="Signing Up..."> Sign Up </SubmitButton>
        {searchParams?.message && (<p> {searchParams.message} </p>)}
      </form>
    </div>
  );
}
