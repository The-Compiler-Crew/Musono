import { NavAuthButton } from "./NavAuthButton";

export async function Navbar(){
  return (
    <nav>
        <a href="/" id="home">Home</a>
        <NavAuthButton />
        <div className={`animation`}></div>
    </nav>
  );
}

