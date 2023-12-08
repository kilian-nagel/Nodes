import Link from "next/link";
import { useState } from "react";

const CollapsibleNavbar: React.FunctionComponent = () => {
    const [display,setDisplay] = useState(false);
  return (
    <nav className="colapsible-nav absolute hidden w-80">
      <p className="close-icon" onClick={()=>setDisplay(!display)}>X</p>
      <ul>
        <li>
          <Link href="/" className="text-light">
            home
          </Link>
        </li>
        <li>
          <Link href="/" className="text-light">
            about
          </Link>
        </li>
        <li>
          <Link href="/" className="text-light">
            messages
          </Link>
        </li>
      </ul>
    </nav>
  );
};
