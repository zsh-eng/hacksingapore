import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';

const transactions: {
  date_time: string;
  transaction_type:
    | 'Transport'
    | 'Banking'
    | 'Retail'
    | 'Entertainment'
    | 'Food'
    | 'Services';
  amount: number;
  place: string;
}[] = [
  {
    date_time: '2024-04-01 16:14:10',
    transaction_type: 'Retail',
    amount: -1798.83,
    place: 'Popular Bookstore',
  },
  {
    date_time: '2024-04-02 07:31:37',
    transaction_type: 'Entertainment',
    amount: -1071.26,
    place: 'Hong Prawning',
  },
  {
    date_time: '2024-04-02 18:33:20',
    transaction_type: 'Retail',
    amount: -1025.82,
    place: 'Popular Bookstore',
  },
  {
    date_time: '2024-04-02 23:52:05',
    transaction_type: 'Entertainment',
    amount: -1095.89,
    place: 'Hong Prawning',
  },
  {
    date_time: '2024-04-03 10:49:40',
    transaction_type: 'Transport',
    amount: -31.75,
    place: 'Singapore Airlines',
  },
  {
    date_time: '2024-04-04 05:51:47',
    transaction_type: 'Transport',
    amount: -1692.25,
    place: 'SMRT transit',
  },
  {
    date_time: '2024-04-04 13:19:13',
    transaction_type: 'Banking',
    amount: 398.54,
    place: 'DBS',
  },
  {
    date_time: '2024-04-04 17:04:19',
    transaction_type: 'Food',
    amount: -1709.27,
    place: 'Koi',
  },
  {
    date_time: '2024-04-04 17:34:18',
    transaction_type: 'Food',
    amount: -1999.85,
    place: 'Bangkok Street Mookata',
  },
  {
    date_time: '2024-04-05 01:08:00',
    transaction_type: 'Retail',
    amount: -1200.93,
    place: 'Popular Bookstore',
  },
  {
    date_time: '2024-04-05 01:15:57',
    transaction_type: 'Entertainment',
    amount: -1012.29,
    place: 'Cathay Cineplexes',
  },
  {
    date_time: '2024-04-05 05:24:22',
    transaction_type: 'Entertainment',
    amount: -55.75,
    place: 'Cathay Cineplexes',
  },
  {
    date_time: '2024-04-06 06:40:12',
    transaction_type: 'Banking',
    amount: -1402.69,
    place: 'DBS',
  },
  {
    date_time: '2024-04-08 08:29:20',
    transaction_type: 'Food',
    amount: -1637.19,
    place: 'KFC',
  },
  {
    date_time: '2024-04-08 18:44:31',
    transaction_type: 'Retail',
    amount: -373.7,
    place: 'Angelhack',
  },
  {
    date_time: '2024-04-08 21:45:31',
    transaction_type: 'Banking',
    amount: 1487.59,
    place: 'DBS',
  },
  {
    date_time: '2024-04-10 00:23:55',
    transaction_type: 'Transport',
    amount: -1075.29,
    place: 'Air Asia',
  },
  {
    date_time: '2024-04-10 16:02:11',
    transaction_type: 'Entertainment',
    amount: -212.33,
    place: 'Hong Prawning',
  },
  {
    date_time: '2024-04-12 06:16:43',
    transaction_type: 'Transport',
    amount: -1475.86,
    place: 'Singapore Airlines',
  },
  {
    date_time: '2024-04-12 19:29:34',
    transaction_type: 'Banking',
    amount: 696.01,
    place: 'DBS',
  },
  {
    date_time: '2024-04-12 22:08:16',
    transaction_type: 'Services',
    amount: -1142.04,
    place: "Wui Hong's Upz Carwash Service",
  },
  {
    date_time: '2024-04-13 08:36:34',
    transaction_type: 'Food',
    amount: -1173.78,
    place: 'Bangkok Street Mookata',
  },
  {
    date_time: '2024-04-13 18:39:19',
    transaction_type: 'Services',
    amount: -1696.09,
    place: "Bob's Bicycle Repair",
  },
  {
    date_time: '2024-04-14 04:47:05',
    transaction_type: 'Services',
    amount: -346.1,
    place: "Wui Hong's Upz Carwash Service",
  },
  {
    date_time: '2024-04-15 22:38:25',
    transaction_type: 'Retail',
    amount: -1782.74,
    place: 'Kiddy Palace',
  },
  {
    date_time: '2024-04-16 10:27:06',
    transaction_type: 'Food',
    amount: -1415.17,
    place: 'KFC',
  },
  {
    date_time: '2024-04-18 08:47:11',
    transaction_type: 'Food',
    amount: -616.49,
    place: 'Kopitiam',
  },
  {
    date_time: '2024-04-18 17:36:47',
    transaction_type: 'Transport',
    amount: -15.18,
    place: 'Air Asia',
  },
  {
    date_time: '2024-04-19 01:58:49',
    transaction_type: 'Food',
    amount: -1731.78,
    place: 'Bangkok Street Mookata',
  },
  {
    date_time: '2024-04-19 12:10:06',
    transaction_type: 'Food',
    amount: -743.07,
    place: 'Kopitiam',
  },
  {
    date_time: '2024-04-19 19:46:23',
    transaction_type: 'Banking',
    amount: 1998.97,
    place: 'DBS',
  },
  {
    date_time: '2024-04-20 12:06:51',
    transaction_type: 'Food',
    amount: -240.71,
    place: 'Koi',
  },
  {
    date_time: '2024-04-20 14:44:31',
    transaction_type: 'Transport',
    amount: -644.58,
    place: 'Air Asia',
  },
  {
    date_time: '2024-04-21 03:12:04',
    transaction_type: 'Services',
    amount: -1375.1,
    place: 'Tan Tailor and Stitching',
  },
  {
    date_time: '2024-04-21 12:39:17',
    transaction_type: 'Food',
    amount: -793.09,
    place: 'Bangkok Street Mookata',
  },
  {
    date_time: '2024-04-21 12:49:18',
    transaction_type: 'Banking',
    amount: 1310.23,
    place: 'DBS',
  },
  {
    date_time: '2024-04-22 15:49:59',
    transaction_type: 'Services',
    amount: -1062.27,
    place: 'Tan Tailor and Stitching',
  },
  {
    date_time: '2024-04-23 11:23:41',
    transaction_type: 'Retail',
    amount: -163.34,
    place: 'Love Bonito',
  },
  {
    date_time: '2024-04-23 13:46:39',
    transaction_type: 'Transport',
    amount: -668.09,
    place: 'Singapore Airlines',
  },
  {
    date_time: '2024-04-27 17:24:00',
    transaction_type: 'Retail',
    amount: -1664.28,
    place: 'Angelhack',
  },
  {
    date_time: '2024-04-28 06:25:48',
    transaction_type: 'Retail',
    amount: -666.48,
    place: 'Popular Bookstore',
  },
  {
    date_time: '2024-04-29 05:28:49',
    transaction_type: 'Food',
    amount: -187.3,
    place: 'Hawker Centre',
  },
  {
    date_time: '2024-04-29 20:01:38',
    transaction_type: 'Retail',
    amount: -440.12,
    place: 'Love Bonito',
  },
  {
    date_time: '2024-04-30 23:50:51',
    transaction_type: 'Banking',
    amount: -1294.22,
    place: 'DBS',
  },
  {
    date_time: '2024-05-01 04:42:40',
    transaction_type: 'Retail',
    amount: -933.18,
    place: 'Popular Bookstore',
  },
  {
    date_time: '2024-05-01 09:39:58',
    transaction_type: 'Services',
    amount: -1681.26,
    place: "Wui Hong's Upz Carwash Service",
  },
  {
    date_time: '2024-05-01 09:42:58',
    transaction_type: 'Services',
    amount: -832.25,
    place: "Bob's Bicycle Repair",
  },
  {
    date_time: '2024-05-01 11:25:05',
    transaction_type: 'Retail',
    amount: -1184.48,
    place: 'Angelhack',
  },
  {
    date_time: '2024-05-01 14:05:03',
    transaction_type: 'Transport',
    amount: -849.3,
    place: 'SMRT transit',
  },
  {
    date_time: '2024-05-01 17:20:44',
    transaction_type: 'Food',
    amount: -631.41,
    place: 'KFC',
  },
  {
    date_time: '2024-05-03 01:33:15',
    transaction_type: 'Entertainment',
    amount: -1365.93,
    place: 'Teo Heng KTV',
  },
  {
    date_time: '2024-05-03 05:12:10',
    transaction_type: 'Food',
    amount: -432.61,
    place: 'Kopitiam',
  },
  {
    date_time: '2024-05-04 06:29:59',
    transaction_type: 'Food',
    amount: -562.4,
    place: 'Hawker Centre',
  },
  {
    date_time: '2024-05-04 20:28:27',
    transaction_type: 'Banking',
    amount: 1253.97,
    place: 'DBS',
  },
  {
    date_time: '2024-05-05 21:42:42',
    transaction_type: 'Transport',
    amount: -1494.42,
    place: 'Scoot',
  },
  {
    date_time: '2024-05-05 22:11:02',
    transaction_type: 'Services',
    amount: -1923.4,
    place: 'Sim Lim PC Repair',
  },
  {
    date_time: '2024-05-06 06:50:51',
    transaction_type: 'Banking',
    amount: -452.95,
    place: 'DBS',
  },
  {
    date_time: '2024-05-06 10:41:27',
    transaction_type: 'Banking',
    amount: -122.69,
    place: 'DBS',
  },
  {
    date_time: '2024-05-06 15:05:34',
    transaction_type: 'Food',
    amount: -485.45,
    place: 'Hawker Centre',
  },
  {
    date_time: '2024-05-06 18:17:56',
    transaction_type: 'Food',
    amount: -1986.4,
    place: 'KFC',
  },
  {
    date_time: '2024-05-07 19:12:41',
    transaction_type: 'Food',
    amount: -750.1,
    place: 'Kopitiam',
  },
  {
    date_time: '2024-05-08 02:42:27',
    transaction_type: 'Food',
    amount: -1495.03,
    place: 'Kopitiam',
  },
  {
    date_time: '2024-05-08 08:59:52',
    transaction_type: 'Transport',
    amount: -1543.87,
    place: 'Air Asia',
  },
  {
    date_time: '2024-05-08 16:57:02',
    transaction_type: 'Entertainment',
    amount: -1820.33,
    place: 'Hong Prawning',
  },
  {
    date_time: '2024-05-09 06:47:10',
    transaction_type: 'Retail',
    amount: -690.35,
    place: 'Popular Bookstore',
  },
  {
    date_time: '2024-05-09 12:07:24',
    transaction_type: 'Services',
    amount: -1550.83,
    place: "Bob's Bicycle Repair",
  },
  {
    date_time: '2024-05-10 21:40:39',
    transaction_type: 'Services',
    amount: -898.8,
    place: 'Sim Lim PC Repair',
  },
  {
    date_time: '2024-05-10 23:47:19',
    transaction_type: 'Services',
    amount: -485.73,
    place: 'Tan Tailor and Stitching',
  },
  {
    date_time: '2024-05-11 07:06:27',
    transaction_type: 'Services',
    amount: -120.47,
    place: "Bob's Bicycle Repair",
  },
  {
    date_time: '2024-05-11 23:40:52',
    transaction_type: 'Transport',
    amount: -979.78,
    place: 'Singapore Airlines',
  },
  {
    date_time: '2024-05-12 09:40:23',
    transaction_type: 'Services',
    amount: -573.57,
    place: 'Tan Tailor and Stitching',
  },
  {
    date_time: '2024-05-13 03:48:31',
    transaction_type: 'Transport',
    amount: -1117.88,
    place: 'Air Asia',
  },
  {
    date_time: '2024-05-13 12:10:06',
    transaction_type: 'Retail',
    amount: -543.11,
    place: 'Kiddy Palace',
  },
  {
    date_time: '2024-05-14 00:31:18',
    transaction_type: 'Retail',
    amount: -118.83,
    place: 'Popular Bookstore',
  },
  {
    date_time: '2024-05-14 08:06:08',
    transaction_type: 'Retail',
    amount: -1612.86,
    place: 'Love Bonito',
  },
  {
    date_time: '2024-05-15 12:02:58',
    transaction_type: 'Food',
    amount: -533.22,
    place: 'Bangkok Street Mookata',
  },
  {
    date_time: '2024-05-15 14:17:34',
    transaction_type: 'Transport',
    amount: -1965.37,
    place: 'Scoot',
  },
  {
    date_time: '2024-05-15 15:01:17',
    transaction_type: 'Services',
    amount: -339.22,
    place: 'Tan Tailor and Stitching',
  },
  {
    date_time: '2024-05-15 22:37:39',
    transaction_type: 'Services',
    amount: -1228.01,
    place: "Wui Hong's Upz Carwash Service",
  },
  {
    date_time: '2024-05-15 23:48:38',
    transaction_type: 'Food',
    amount: -1645.08,
    place: 'Bangkok Street Mookata',
  },
  {
    date_time: '2024-05-16 04:54:30',
    transaction_type: 'Food',
    amount: -451.98,
    place: 'Mcdonalds',
  },
  {
    date_time: '2024-05-16 12:31:32',
    transaction_type: 'Retail',
    amount: -1976.44,
    place: 'Cold Storage',
  },
  {
    date_time: '2024-05-16 20:13:47',
    transaction_type: 'Entertainment',
    amount: -121.28,
    place: 'Cathay Cineplexes',
  },
  {
    date_time: '2024-05-17 07:31:32',
    transaction_type: 'Retail',
    amount: -1029.01,
    place: 'Kiddy Palace',
  },
  {
    date_time: '2024-05-17 21:39:13',
    transaction_type: 'Banking',
    amount: 998.45,
    place: 'DBS',
  },
  {
    date_time: '2024-05-18 06:29:42',
    transaction_type: 'Transport',
    amount: -243.15,
    place: 'Singapore Airlines',
  },
  {
    date_time: '2024-05-19 17:30:55',
    transaction_type: 'Entertainment',
    amount: -715.19,
    place: 'Teo Heng KTV',
  },
  {
    date_time: '2024-05-20 11:24:09',
    transaction_type: 'Food',
    amount: -1512.31,
    place: 'Bangkok Street Mookata',
  },
  {
    date_time: '2024-05-20 14:10:29',
    transaction_type: 'Services',
    amount: -1960.84,
    place: 'Tan Tailor and Stitching',
  },
  {
    date_time: '2024-05-20 16:06:04',
    transaction_type: 'Entertainment',
    amount: -834.21,
    place: 'Cathay Cineplexes',
  },
  {
    date_time: '2024-05-23 14:38:31',
    transaction_type: 'Services',
    amount: -964.58,
    place: 'Tan Tailor and Stitching',
  },
  {
    date_time: '2024-05-24 08:25:07',
    transaction_type: 'Entertainment',
    amount: -1361.04,
    place: 'Cathay Cineplexes',
  },
  {
    date_time: '2024-05-25 07:48:24',
    transaction_type: 'Banking',
    amount: 1424.86,
    place: 'DBS',
  },
  {
    date_time: '2024-05-29 03:17:50',
    transaction_type: 'Banking',
    amount: -360.8,
    place: 'DBS',
  },
  {
    date_time: '2024-05-29 03:44:46',
    transaction_type: 'Retail',
    amount: -1119.28,
    place: 'Kiddy Palace',
  },
  {
    date_time: '2024-05-29 16:02:55',
    transaction_type: 'Retail',
    amount: -444.53,
    place: 'NTUC Fairprice',
  },
  {
    date_time: '2024-05-30 19:31:35',
    transaction_type: 'Food',
    amount: -200.07,
    place: 'Mcdonalds',
  },
  {
    date_time: '2024-05-30 22:13:58',
    transaction_type: 'Transport',
    amount: -1147.94,
    place: 'Scoot',
  },
  {
    date_time: '2024-05-31 08:26:32',
    transaction_type: 'Services',
    amount: -911.7,
    place: 'Sim Lim PC Repair',
  },
  {
    date_time: '2024-05-31 20:40:56',
    transaction_type: 'Retail',
    amount: -1958.95,
    place: 'Cold Storage',
  },
];

const transactionsWithId = transactions.map((transaction, i) => ({
  ...transaction,
  id: `INV` + `${i + 1}`.padStart(3, '0'),
}));

const totalBalance = transactionsWithId
  .reduce((acc, transaction) => acc + transaction.amount, 100000)
  .toFixed(2);

export function TransactionsTable() {
  const totalPages = Math.ceil(transactions.length / 10);
  const [page, setPage] = useState(1);
  const transactionsForPage = transactionsWithId.slice(
    (page - 1) * 10,
    page * 10
  );
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <h2 className='ml-2'>Total Balance: ${totalBalance}</h2>
      <Table className=''>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionsForPage.map((transaction, i) => (
            <TableRow key={transaction.id}>
              <TableCell className='font-medium'>{transaction.id}</TableCell>
              <TableCell>{transaction.transaction_type}</TableCell>
              <TableCell>{transaction.date_time}</TableCell>
              <TableCell className='text-right'>{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Net Balance</TableCell>
            <TableCell className='text-right'>
              {transactionsForPage
                .reduce((acc, transaction) => acc + transaction.amount, 0)
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>

          {pagesArray.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink href='#' onClick={() => setPage(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
