import { Card, CardTitle, CardContent } from "./card";
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";

interface props {
    title: string;
    balance: number;
}

const BalanceCard: React.FC<props> = ({title, balance}) => {
    const [isVisible, setVisibility] = useState(false) // tracks whether the card exists on the page, used for the ease-in transition
    const [isModalVisible, setModalVisiblity] = useState(false) // tracks whether the '?' modal is shown when the user hovers over it for more information

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibility(true)
        }, 500)
        return () => clearTimeout(timeout)
    }, [])

    const showModal = () => {
        setModalVisiblity(true)
    }

    const hideModal = () => {
        setModalVisiblity(false)
    }

    return (
        <Card
            className={`w-48 h-72 flex flex-col items-center justify-center relative drop-shadow-sm cursor-pointer hover:drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onMouseEnter={showModal}
            onMouseLeave={hideModal}
        >
            <CardContent>
                {balance}
                {isModalVisible && <InfoModal />}
            </CardContent>
            <CardTitle className="cursor-pointer">{title}</CardTitle>
        </Card>
    );
}

const InfoModal = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-75 text-white">
            <FaQuestion size={50}/>
        </div>
    )
}

export default BalanceCard