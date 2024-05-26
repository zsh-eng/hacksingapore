/**
 * mik:
 * this page displays an overview of the user's 4 CPF balances, along with a pie chart illustrating how the total CPF is allocated across them.
 * the user can hover over any of the cards and click on them for more info.
 * currently the pie chart does not serve any purpose other than a static display.
 * TODO: find a better pie chart this one actually blows
 */

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Chart } from 'react-google-charts';
import BalanceCard from '@/components/ui/balance_card';
import { useChatHistory } from '@/components/chatbot/Chat';

// user IC: S6005053H
const data = [
  ['Account', 'Balance', 'Description'],
  [
    'Ordinary Account',
    49602.38,
    'Used for housing, insurance, and education. Can be used for investment.',
  ],
  [
    'Medical Account',
    17253,
    'Used for hospitalization fees and approved medical insurance.',
  ],
  [
    'Special Account',
    12939.75,
    'Used for old age. Can invest in retirement-related financial products.',
  ],
  [
    'Retirement Account',
    34265.64,
    'For retirement, created when you turn 55 years old, putting the Ordinary and Special accounts together.',
  ],
];

export const options = {
  is3D: true,
  backgroundColor: 'transparent',
};

export default function SavingsPage() {
  const { setInput, setIsChatOpen } = useChatHistory();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <div className='flex'>
        <div className='flex flex-col justify-center items-center gap-8'>
          {data.slice(1, 3).map((item, index) => (
            <BalanceCard
              key={index}
              title={String(item[0])}
              balance={Number(item[1])}
              onClick={() => {
                setInput(`What is a CPF ${item[0]} account?`);
                setIsChatOpen(true);
              }}
            />
          ))}
        </div>
        <div className='bg-inherit flex items-center justify-center'>
          <Chart
            chartType='PieChart'
            data={data}
            options={options}
            width={'100%'}
            height={'500px'}
          />
        </div>
        <div className='flex flex-col justify-center items-start gap-8'>
          {data.slice(3, 5).map((item, index) => (
            <BalanceCard
              key={index}
              title={String(item[0])}
              balance={Number(item[1])}
              onClick={() => {
                setInput(`What is a CPF ${item[0]} account?`);
                setIsChatOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
