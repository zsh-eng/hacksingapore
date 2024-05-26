/**
 * mik:
 * this component displays the balance of one of the user's 4 CPF accounts.
 * the user can hover over one of the cards, and click on them for more details about the different accounts.
 */

import { Card, CardTitle, CardContent } from "./card";
import { SetStateAction, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import SavingsAccountModal from "./savings_account_modal";

interface props {
    title: string;
    balance: number;
    description: string;
    className?: string;
}

const BalanceCard: React.FC<props> = ({ title, balance, description }) => {
    const [isVisible, setVisibility] = useState(false); // tracks whether the card exists on the page, used for the ease-in transition
    const [isModalVisible, setModalVisiblity] = useState(false); // tracks whether the '?' modal is shown when the user hovers over it for more information

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [infoModalContent, setInfoModalContent] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibility(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, []); // this function is for the fade-in effects of the cards

    const showModal = () => {
        setModalVisiblity(true);
    };

    const hideModal = () => {
        setModalVisiblity(false);
    };

    const showInfoModal = (description: string) => {
        setIsInfoModalOpen(true);
        setInfoModalContent(description);
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
        setInfoModalContent("");
    };

    return (
        <div>
            <SavingsAccountModal 
                isOpen={isInfoModalOpen}
                onClose={closeInfoModal}
                content={description}
                accountName={title}
            />
            <Card
                className={`w-48 h-72 text-center flex flex-col items-center justify-center relative drop-shadow-sm cursor-pointer hover:drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                onMouseEnter={showModal}
                onMouseLeave={hideModal}
                onClick={() => showInfoModal(description)}
            >
                <CardContent>
                    {balance}
                    {isModalVisible && <Modal />}
                </CardContent>
                <CardTitle className="cursor-pointer">{title.replace(" Account", "")}</CardTitle>
            </Card>
        </div>
    );
};

// modal component, mainly so that the user knows that an action can be taken on it (clicking for more info).
const Modal = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-75 text-white">
            <FaQuestion size={50} />
        </div>
    );
};

export default BalanceCard;
