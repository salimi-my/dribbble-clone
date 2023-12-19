import { notFound } from 'next/navigation';
import type { User } from '@clerk/nextjs/server';
import { Metadata, ResolvingMetadata } from 'next';
import { clerkClient, currentUser } from '@clerk/nextjs';

import db from '@/lib/db';
import WorkList from '@/components/work-list';
import ProfileNav from '@/components/profile-nav';
import ProfileHeader from '@/components/profile-header';

type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const profile = await db.profile.findUnique({
    where: {
      username: params.username
    }
  });

  if (!profile) {
    notFound();
  }

  const user = await clerkClient.users.getUser(profile.userId);

  const previousTitle = (await parent).title || '';

  return {
    title:
      typeof user.firstName === 'string'
        ? user.firstName + ' ' + user.lastName + ' | Bribbble'
        : previousTitle
  };
}

export default async function ProfilePage({
  params
}: {
  params: { username: string };
}) {
  let user: User;

  // get logged in user
  const loggedInUser = await currentUser();

  // get user profile of the username
  const profile = await db.profile.findUnique({
    where: {
      username: params.username
    }
  });

  if (!profile) {
    notFound();
  }

  // check logged in user is the owner of the profile page
  if (loggedInUser && loggedInUser.id === profile.userId) {
    user = loggedInUser;
  } else {
    user = await clerkClient.users.getUser(profile.userId);
  }

  if (!user) {
    notFound();
  }

  // get user profile's works
  const [works, totalWorks] = await db.$transaction([
    db.work.findMany({
      take: 12,
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    db.work.count({
      where: {
        userId: user.id
      }
    })
  ]);

  const pageCount = Math.ceil(totalWorks / 12);

  return (
    <section className='flex flex-col justify-start items-center lg:px-20 py-6 px-5'>
      <ProfileHeader
        user={user}
        profile={profile}
        works={works}
        isOwner={
          loggedInUser && loggedInUser.id === profile.userId ? true : false
        }
      />
      <ProfileNav username={profile.username} activeNav='work' />

      <div className='w-full mt-3 flex flex-col items-center'>
        <WorkList
          initialData={works}
          pageCount={pageCount}
          isProfile={true}
          isOwner={
            loggedInUser && loggedInUser.id === profile.userId ? true : false
          }
          userId={user.id}
          userFullname={user.firstName + ' ' + user.lastName}
        />
      </div>
    </section>
  );
}
