import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import InvestmentAccountCard from "@/components/ui/investment_account_card";
import InvestmentAlert from "@/components/ui/investment_alert"
import { useState, useEffect } from "react";

// user IC: S6005053H
const data = [
    ["Account", "Balance"],
    ["Ordinary", 49602.38],
    ["Medical", 17253],
    ["Special", 12939.75],
    ["Retirement", 34265.64],
];
const dob = "1948-09-10";

export default function feature_1() {
    const ordinaryAccount = data.find((account) => account[0] === "Ordinary");
    const specialAccount = data.find((account) => account[0] === "Special");
    const calculateAge = (dob: string | number | Date) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    const age = calculateAge(dob);
    let canInvest = false;

    if (!ordinaryAccount || !specialAccount) {
        console.log("an account is not available");
    } else {
        canInvest =
            age >= 18 &&
            (Number(ordinaryAccount[1]) >= 20000 ||
                Number(specialAccount[1]) >= 40000);
    }

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if(!canInvest) {
            setShowAlert(true)
        }
    })

    return (
        <main
            className={`flex min-h-screen bg-slate-500 flex-col items-center justify-center p-12 ${inter.className}`}
        >
            {showAlert && 
                <InvestmentAlert />
            }
            <div className="flex flex-row gap-x-10">
                {ordinaryAccount && (
                    <InvestmentAccountCard
                        title={String(ordinaryAccount[0])}
                        balance={Number(ordinaryAccount[1])}
                    />
                )}
                {specialAccount && (
                    <InvestmentAccountCard
                        title={String(specialAccount[0])}
                        balance={Number(specialAccount[1])}
                    />
                )}
            </div>
        </main>
    );
}