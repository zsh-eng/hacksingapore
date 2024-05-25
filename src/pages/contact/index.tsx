import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function feature_1() {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
            <p>Contact Us</p>
        </main>
    )
}