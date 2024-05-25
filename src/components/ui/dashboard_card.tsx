import { Card, CardTitle, CardContent } from "./card";
import { Button } from "./button";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface props {
    title: string;
    href: string;
    children: any,
}

const DashboardCard: React.FC<props> = ({ title, href, children }) => {
    const handleClick = () => {
        console.log("clicked")
    }
    return (
        <Card
            className={`w-48 h-72 flex flex-col items-center justify-center relative drop-shadow-sm cursor-pointer hover:drop-shadow-2xl hover:bg-red-300`}
            onClick={handleClick}
        >
            <CardContent>{children}</CardContent>
            <CardTitle className="cursor-pointer">{title}</CardTitle>
        </Card>
    );
};

export default DashboardCard;
