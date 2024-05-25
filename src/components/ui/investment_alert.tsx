import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function InvestmentAlert() {
    const [isShown, setIsShown] = useState(true);

    const toggleShow = () => {
        setIsShown(!isShown);
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <Alert className={`w-3/5 h-[250px] flex flex-col items-center transform transition-transform duration-500 ${isShown ? 'translate-y-0' : 'translate-y-[26.5rem]'}`}>
                <div className="flex w-full justify-between">
                    <AlertCircle className="h-8 w-8"/>
                    <Button className="w-3 h-8 text-xs" onClick={toggleShow}>
                        {isShown ? "Hide" : "Show"}
                    </Button>
                </div>
                <AlertTitle className="mt-8">Warning</AlertTitle>
                <AlertDescription>
                    You are not able to invest under the CPF Investment Scheme (CPFIS), because you either:<br />
                    - Are under 18 years old<br />
                    - Have less than $20000 in your Ordinary Account, and less than $40000 in your Special Account.
                </AlertDescription>
            </Alert>
        </div>
    );
}
