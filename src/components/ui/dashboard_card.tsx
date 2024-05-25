/**
 * mik:
 * this component displays one of the main features of the product.
 * a user can click on it to be redirected to the feature.
 */

import { Card, CardTitle, CardContent } from "./card";
import { useEffect, useState } from "react";

interface props {
    title: string;
    href: string;
    children: any;
}

const DashboardCard: React.FC<props> = ({ title, href, children }) => {
    const [isVisible, setVisibility] = useState(false) // tracks whether the card exists on the page, used for the ease-in transition

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibility(true)
        }, 500)
        return () => clearTimeout(timeout)
    }, []) // this function is for the fade-in effects of the cards

    const handleClick = () => {
        window.location.href = href;
    }; // clicking on this card redirects the user to the feature of choice

    return (
        <Card
            className={`w-48 h-72 flex flex-col items-center justify-center relative drop-shadow-sm cursor-pointer hover:drop-shadow-2xl hover:bg-red-300 hover:-translate-y-2 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClick}
        >
            <CardContent>{children}</CardContent>
            <CardTitle className="cursor-pointer text-center">{title}</CardTitle>
        </Card>
    );
};

export default DashboardCard;
