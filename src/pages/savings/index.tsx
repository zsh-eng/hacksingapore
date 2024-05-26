/**
 * mik:
 * this page displays an overview of the user's 4 CPF balances, along with a pie chart illustrating how the total CPF is allocated across them.
 * the user can hover over any of the cards and click on them for more info.
 * currently the pie chart does not serve any purpose other than a static display.
 * TODO: find a better pie chart this one actually blows
 */

import { useChatHistory } from '@/components/chatbot/Chat';
import BalanceCard from '@/components/ui/balance_card';
import { Inter } from 'next/font/google';
import { Chart } from 'react-google-charts';
const inter = Inter({ subsets: ['latin'] });

// user IC: S6005053H
const data = [
  ['Account', 'Balance'],
  ['Ordinary', 49602.38],
  ['Medical', 17253],
  ['Special', 12939.75],
  ['Retirement', 34265.64],
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
        <div className='flex flex-col justify-center items-start gap-8'>
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
