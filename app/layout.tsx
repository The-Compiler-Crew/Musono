import "./styles/globals.css";
import "./styles/navbar.css";
import { createClient } from "@/utils/supabase/server";
import { Navbar } from '../components/Navbar'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Musono",
  description: "The opensource Todo List",
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

export default function RootLayout({children}: {children: React.ReactNode;}){

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main> {children} </main>
      </body>
    </html>
  );
}
