import { TransactionsTable } from '@/components/transactions-table';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Transactions() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-4 items-start justify-start p-12 ${inter.className} max-w-3xl mx-auto`}
    >
      <h1 className='text-3xl font-bold ml-2'>Transactions</h1>
      <TransactionsTable />
    </main>
  );
}
