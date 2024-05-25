import { Card, CardTitle, CardContent } from "./card";
import { useEffect, useState } from "react";

interface props {
    title: string;
    href: string;
    children: any;
}

const DashboardCard: React.FC<props> = ({ title, href, children }) => {
    const [isVisible, setVisibility] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibility(true)
        }, 500)
        return () => clearTimeout(timeout)
    }, [])

    const handleClick = () => {
        window.location.href = href;
    };

    return (
        <Card
            className={`w-48 h-72 flex flex-col items-center justify-center relative drop-shadow-sm cursor-pointer hover:drop-shadow-2xl hover:bg-red-300 hover:-translate-y-2 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClick}
        >
            <CardContent>{children}</CardContent>
            <CardTitle className="cursor-pointer">{title}</CardTitle>
        </Card>
    );
};

export default DashboardCard;
