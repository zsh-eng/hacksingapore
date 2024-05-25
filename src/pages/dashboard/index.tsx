import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <main>
            <main
                className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
            >
                <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-xl lg:flex">
                    This is the dashboard page
                </div>
                <Button
                    variant={"outline"}
                    onClick={() => console.log("home button clicked")}
                >
                    <Link href="/">Home Page</Link>
                </Button>
            </main>
        </main>
    );
}
