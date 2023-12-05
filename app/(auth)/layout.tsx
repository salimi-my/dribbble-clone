export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
  params: string;
}) {
  return (
    <div className='flex items-stretch h-screen overflow-hidden'>
      {children}
    </div>
  );
}
