

import Link from 'next/link';

import { useRouter } from 'next/router';
interface HeaderProps {
    title: string;
    navigation: string[];
}

export default function Header() {
    const router = useRouter();
    return (
        <header className={`flex z-50 h-24 justify-between pl-4 pr-4 sticky top-0 nl:h-36 nl:pl-12 nl:pr-12  ${router.pathname === '/' ? 'home' : ''}`}>
            <Link scroll={false} className='flex items-center ' href="/"><h1 className=' text-H1font'>ROCHE</h1></Link>
            <nav  className='flex items-end pb-5 nl:pb-0 nl: pt-5 nl:items-center'>
            <Link scroll={false} className={`pr-4 opacity ${router.pathname === '/agency' ? 'current' : ''} ${router.pathname === '/' ? 'homeLink' : ''} `} href="/agency">agency</Link>
            <Link  scroll={false} className={`pr-4 opacity ${router.pathname.startsWith('/brands') ? 'current' : ''} ${router.pathname === '/' ? 'homeLink' : ''}`} href="/brands">brands</Link>
            <Link scroll={false} className={`opacity ${router.pathname === '/contact' ? 'current' : ''} ${router.pathname === '/' ? 'homeLink' : ''}`} href="/contact">contact</Link>
            </nav>
        </header>
    );
   
}
