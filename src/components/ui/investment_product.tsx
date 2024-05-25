import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import InvestmentProductModal from "./investment_product_modal";

interface props {
    product: string[];
}

const InvestmentProduct: React.FC<props> = ({ product }) => {
    const productName = product[0];
    const productDescription = product[1];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
        setModalContent(productDescription);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent("");
    };

    const [isVisible, setVisibility] = useState(false); // tracks whether the card exists on the page, used for the ease-in transition

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibility(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, []); // this function is for the fade-in effects of the cards

    return (
        <div>
            <InvestmentProductModal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={modalContent}
                productName={productName}
            />
            <Badge
                className={`w-48 h-36 flex justify-center items-center text-center text-lg bg-slate-800 cursor-pointer transition-opacity duration-1000 ease-in-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                } hover:drop-shadow-2xl hover:bg-slate-600 hover:-translate-y-2`}
                onClick={showModal}
            >
                {product[0]}
            </Badge>
        </div>
    );
};

export default InvestmentProduct;
