import { ClerkLoaded, ClerkLoading, UserProfile } from '@clerk/nextjs';

import AccountLoading from '@/components/account-loading';

export default function AccountPage() {
  return (
    <div className='container'>
      <div className='my-profile min-h-[1125px]'>
        <ClerkLoading>
          <AccountLoading />
        </ClerkLoading>
        <ClerkLoaded>
          <UserProfile />
        </ClerkLoaded>
      </div>
    </div>
  );
}
