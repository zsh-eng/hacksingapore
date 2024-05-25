import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-xl lg:flex">
        This is the home page if we even need it
      </div>
      <Button variant={"outline"} onClick={() => console.log("dashbard button clicked")}>
        <Link href="/dashboard">Dashboard Page</Link>
      </Button>
    </main>
  );
}
