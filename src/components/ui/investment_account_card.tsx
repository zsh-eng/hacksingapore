import { Card, CardTitle, CardContent } from "./card";
import { useEffect, useState } from "react";

interface props {
    title: string;
    balance: number;
}

const InvestmentAccountCard: React.FC<props> = ({ title, balance }) => {
    const [isVisible, setVisibility] = useState(false); // tracks whether the card exists on the page, used for the ease-in transition

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibility(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, []); // this function is for the fade-in effects of the cards

    return (
        <div>
            <Card
                className={`w-48 h-72 flex flex-col items-center justify-center relative drop-shadow-sm transition-opacity duration-1000 ease-in-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            >
                <CardContent>{balance}</CardContent>
                <CardTitle>{title}</CardTitle>
            </Card>
        </div>
    );
};

export default InvestmentAccountCard;
