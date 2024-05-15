import AuthButton from "./AuthButton";
import { createClient } from "@/utils/supabase/server";

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

export async function NavAuthButton(){

  return (
    <> {isSupabaseConnected && <AuthButton />} </>
  )
}