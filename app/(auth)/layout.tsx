import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex items-stretch h-screen overflow-hidden'>
      <section className='w-[400px] grow-0 relative text-white'>
        <div className='flex flex-col justify-between h-full'>
          <Link href='/' className='absolute top-10 left-10'>
            <Image
              src='/bribbble-logo.svg'
              alt='bribbble logo'
              width={90}
              height={31}
            />
          </Link>
          <video
            playsInline
            className='w-full object-cover h-full'
            autoPlay
            loop
            muted
            src='sign-in.mp4'
          />
        </div>
      </section>
      <section className='flex flex-col flex-1 overflow-auto justify-center w-full'>
        {children}
      </section>
    </div>
  );
}
