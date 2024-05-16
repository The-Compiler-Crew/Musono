import { NavAuthButton } from "./NavAuthButton";


export async function Navbar(){
  return (
    <nav>
        <a id="home" href="/">Home</a>
        <NavAuthButton />
    </nav>
  );
}

