import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <>
      <form action={signOut} style={{ display: 'inline' }}>
        <button id="logout"> Logout </button>
      </form>
    </>
  ) : (
    <a href="/login" id="login_btn"> Login </a>
  );
}
