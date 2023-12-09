export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex items-stretch h-screen overflow-hidden'>
      {children}
    </div>
  );
}
