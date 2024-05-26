import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  CircleHelp,
  DollarSign,
  Info,
  LineChart,
  PiggyBank,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Button } from './button';

type NavItemProps = {
  icon: React.FC<{ className?: string }>;
  href: string;
  label: string;
  small?: boolean;
};

function NavItem({ icon: Icon, href, label, small = false }: NavItemProps) {
  if (small) {
    return (
      <Button
        size={'icon'}
        className={cn(
          'hover:bg-muted-foreground transition-all py-4 px-4 ml-auto w-12 h-12'
        )}
      >
        <Link
          className={cn(
            'text-muted text-lg font-normal flex items-center translate'
          )}
          href={href}
        >
          <Icon className={cn('text-background h-6 w-6')} />
        </Link>
      </Button>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-start hover:bg-muted-foreground w-full transition-all py-2 cursor-pointer px-2'
      )}
    >
      <Link
        className={cn(
          'text-muted text-lg font-normal flex items-center translate'
        )}
        href={href}
      >
        <Icon className={cn('text-background mr-2 h-5 w-5')} />
        <span>{label}</span>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div
      className={cn(
        'bg-slate-800 w-64 min-h-screen hidden overflow-hidden lg:flex flex-col justify-between fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out',
        isNavbarOpen ? 'translate-x-0' : '-translate-x-48'
      )}
    >
      <nav className=' text-gray-300 relative flex flex-col justify-between h-full'>
        <div className='p-2'>
          <div className='flex flex-row justify-end -mr-0.25'>
            <Button onClick={toggleNavbar}>
              {isNavbarOpen ? <FaArrowLeft /> : <FaArrowRight />}
            </Button>
          </div>
          <h3 className='text-xl ml-2 text-muted-foreground'>General</h3>
          <div className='flex flex-col gap-1 items-start mt-2'>
            <NavItem
              icon={PiggyBank}
              href='/savings'
              label='Savings'
              small={!isNavbarOpen}
            />
            <NavItem
              icon={LineChart}
              href='/invest'
              label='Investments'
              small={!isNavbarOpen}
            />
            <NavItem
              icon={DollarSign}
              href='/transactions'
              label='savings'
              small={!isNavbarOpen}
            />
          </div>
          <Separator
            className={cn(
              'w-5/6 mx-auto bg-muted-foreground mb-6 mt-8 transition',
              isNavbarOpen ? 'translate-x-0' : '-translate-x-20'
            )}
          />

          <h3 className='text-xl ml-2 text-muted-foreground'>Help</h3>
          <div className='flex flex-col gap-1 items-start mt-2'>
            <NavItem
              icon={Info}
              href='/about'
              label='About Us'
              small={!isNavbarOpen}
            />
            <NavItem
              icon={User}
              href='/contact'
              label='Contact'
              small={!isNavbarOpen}
            />
            <NavItem
              icon={CircleHelp}
              href='/faq'
              label='FAQ'
              small={!isNavbarOpen}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
