import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import InvestmentProductModal from "./investment_product_modal";

interface props {
    product: string[];
}

const InvestmentProduct: React.FC<props> = ({ product }) => {
    const productName = product[0]
    const productDescription = product[1]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("")

    const showModal = () => {
        setIsModalOpen(true)
        setModalContent(productDescription)
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent("");
    }

    return (
        <div>
            <InvestmentProductModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} productName={productName} />
            <Badge
                className="w-24 h-24 flex justify-center items-center text-center bg-slate-800 cursor-pointer"
                onClick={showModal}
            >
                {product[0]}
            </Badge>
        </div>
    );
};

export default InvestmentProduct;
