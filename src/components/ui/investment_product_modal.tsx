import { useEffect, useState } from "react";
import { Button } from "./button";

interface props {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    productName: string;
}

const InvestmentProductModal: React.FC<props> = ({
    isOpen,
    onClose,
    content,
    productName,
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const [risk, description] = content.split(" + ");

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`bg-white p-8 rounded shadow-lg relative max-w-lg w-full h-96 transform transition-transform duration-300 ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <Button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </Button>
                <div>{productName}</div>
                <div className="mt-4">{risk}</div>
                <div className="mt-4">{description}</div>
            </div>
        </div>
    );
};

export default InvestmentProductModal;
