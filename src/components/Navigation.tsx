'use client'

import Link from 'next/link';


export default function Navigation() {
  // const pathname = usePathname(); // Kept for potential future use with active link styling
  // const router = useRouter(); // Kept for potential future use

  // useEffect(() => {
  //   // TODO: Re-implement section scrolling with Next.js patterns (e.g., query params or hash)
  // }, [pathname, router]);

  return (
    <nav className="bg-blue-950 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <img src="/assets/objetiva-logo.svg" alt="Objetiva Representações" className="w-40" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-yellow-500">Home</Link>
            <Link 
              href="/#brands" 
              className="hover:text-yellow-500"
            >
              Representadas
            </Link>
            <Link 
              href="/#contact" 
              className="hover:text-yellow-500"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}