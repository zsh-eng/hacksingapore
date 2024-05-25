import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import InvestmentAccountCard from "@/components/ui/investment_account_card";
import InvestmentAlert from "@/components/ui/investment_alert";
import InvestmentProduct from "@/components/ui/investment_product";
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

// investment products
const investmentProducts = [
    ["Stocks", "Stocks represent ownership in a company and constitute a claim on part of the company’s assets and earnings."],
    ["Bonds", "Bonds are fixed income instruments that represent a loan made by an investor to a borrower."],
    ["Exchange Traded Funds", "ETFs are investment funds traded on stock exchanges, much like stocks."],
    ["Singapore Government Bonds", "SGBs are debt securities issued by the government of Singapore to fund government operations."],
    ["Fixed Deposits", "Fixed deposits are a type of financial instrument offered by banks with a fixed rate of interest."],
    ["Fund Management Accounts", "These are investment accounts managed by professionals, offering diversification and professional management."],
];

export default function Invest() {
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
    //console.log(age)
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
        if (!canInvest) {
            setShowAlert(true);
        }
    });



    return (
        <main
            className={`flex min-h-screen bg-slate-500 flex-col items-center justify-center p-12 ${inter.className}`}
        >
            {showAlert && <InvestmentAlert />}
            <div className="w-4/5 flex flex-row justify-around">
                <div className="relative flex flex-col gap-y-12">
                    {investmentProducts.slice(0, 3).map((product, index) => (
                        <div key={index}>
                            <InvestmentProduct product={product}/>
                        </div>
                    ))}
                </div>
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
                <div className="relative flex flex-col gap-y-12">
                    {investmentProducts.slice(3, 6).map((product, index) => (
                        <div key={index}>
                            <InvestmentProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
