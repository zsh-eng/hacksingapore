import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/ui/navbar";

export default function feature_1() {
    return (
        <main className={`flex min-h-screen bg-slate-500 flex-col items-center justify-center p-24 ${inter.className}`}>
            <Navbar />
            <p>Feature 3 goes here</p>
        </main>
    )
}