import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Welcome</h1>
      </header>
      <main>
        <p>Login as:</p>
        <Button variant="link" asChild>
          <Link href="/intern/login">Intern</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/intern/supervisor">Supervisor</Link>
        </Button>
      </main>
    </div>
  );
}
