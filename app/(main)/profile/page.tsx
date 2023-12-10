import { ClerkLoaded, ClerkLoading, UserProfile } from '@clerk/nextjs';

import ProfileLoading from '@/components/profile-loading';

export default function ProfilePage() {
  return (
    <div className='container'>
      <div className='my-profile min-h-[1125px]'>
        <ClerkLoading>
          <ProfileLoading />
        </ClerkLoading>
        <ClerkLoaded>
          <UserProfile />
        </ClerkLoaded>
      </div>
    </div>
  );
}
