import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/ui/navbar";

export default function feature_1() {
    return (
        <main className={`flex min-h-screen flex-col items-center bg-slate-500 justify-center p-24 ${inter.className}`}>
            <p>FAQ</p>
        </main>
    )
}