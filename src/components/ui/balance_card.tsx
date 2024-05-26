/**
 * mik:
 * this component displays the balance of one of the user's 4 CPF accounts.
 * the user can hover over one of the cards, and click on them for more details about the different accounts.
 */

import { Card, CardTitle, CardContent } from './card';
import { useEffect, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';

interface props {
  title: string;
  balance: number;
  className?: string;
  onClick?: () => void;
}

const BalanceCard: React.FC<props> = ({ title, balance, onClick }) => {
  const [isVisible, setVisibility] = useState(false); // tracks whether the card exists on the page, used for the ease-in transition
  const [isModalVisible, setModalVisiblity] = useState(false); // tracks whether the '?' modal is shown when the user hovers over it for more information

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

  return (
    <Card
      className={`w-48 h-72 flex flex-col items-center justify-center relative drop-shadow-sm cursor-pointer hover:drop-shadow-2xl hover:bg-cyan-700 hover:-translate-y-2 transition-all ease-in-out hover:text-primary-foreground ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseEnter={showModal}
      onMouseLeave={hideModal}
      onClick={() => onClick && onClick()}
    >
      <CardContent>
        {balance}
        {isModalVisible && <InfoModal />}
      </CardContent>
      <CardTitle className='cursor-pointer'>{title}</CardTitle>
    </Card>
  );
};

// modal component, mainly so that the user knows that an action can be taken on it (clicking for more info).
const InfoModal = () => {
  return (
    <div className='absolute inset-0 flex items-start justify-end rounded-md  text-white'>
      <FaQuestion size={20} className='mt-4 mr-4' />
    </div>
  );
};

export default BalanceCard;
