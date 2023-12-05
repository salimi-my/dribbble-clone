import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex items-stretch h-screen overflow-hidden'>
      <section className='hidden lg:flex w-[400px] grow-0 relative text-white'>
        <div className='flex flex-col justify-between h-full'>
          <Link href='/' className='absolute top-10 left-10 z-10'>
            <Image
              src='/bribbble-light-logo.svg'
              alt='bribbble logo'
              className='w-[90px] h-[30px]'
              width={90}
              height={30}
              priority
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
          <Link href='/' className='absolute bottom-10 left-10 text-sm'>
            @glebich
          </Link>
        </div>
      </section>
      <section className='flex flex-col flex-1 overflow-auto justify-center w-full'>
        <main className='flex justify-center xl:justify-start grow items-center w-full h-full'>
          <div className='xl:ml-28'>{children}</div>
        </main>
      </section>
    </div>
  );
}
