import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='min-h-[calc(100vh-100px-428.44px)] md:min-h-[calc(100vh-100px-332.44px)] lg:min-h-[calc(100vh-100px-254.44px)]'>
        {children}
      </main>
      <Footer />
    </>
  );
}
