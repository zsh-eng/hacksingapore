import Link from "next/link";
import { Button } from "./button";
import { useState } from "react";

export default function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <div className={`bg-slate-800 w-64 h-screen hidden overflow-hidden lg:flex flex-col justify-between absolute left-0 z-50 transform ${isNavbarOpen ? 'translate-x-0' : '-translate-x-44'} transition-transform duration-300 ease-in-out`}>
            <nav className=" text-gray-300 relative flex flex-col justify-between h-full">
                <div className="p-2">
                    <div className="flex flex-row justify-end">
                        <Button onClick={toggleNavbar}>
                            {isNavbarOpen ? 'Close' : 'Open'}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                        <Button
                            variant={"link"}
                        >
                            <Link className="text-gray-300" href="/about">About Us</Link>
                        </Button>
                        <Button
                            variant={"link"}
                        >
                            <Link className="text-gray-300" href="/contact">Contact</Link>
                        </Button>
                        <Button
                            variant={"link"}
                        >
                            <Link className="text-gray-300" href="/faq">FAQ</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <h3 className="">navbar uwu</h3>
                </div>
            </nav>
        </div>
    );
}
