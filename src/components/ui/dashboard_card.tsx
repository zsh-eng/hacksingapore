import {
    Card,
    CardTitle,
} from "./card";
import { Button } from "./button";
import Link from "next/link";

interface props {
    title: string,
    href: string,
}

const DashboardCard: React.FC<props> = ({title, href}) => {
    return (
        <Card className={`w-48 h-72 flex flex-col items-center justify-center relative drop-shadow-lg`}>
            <CardTitle>{title}</CardTitle>
            <Button variant="outline" className="absolute bottom-4">
                <Link href={href}>Find out more</Link>
            </Button>
        </Card>
    );
}

export default DashboardCard
