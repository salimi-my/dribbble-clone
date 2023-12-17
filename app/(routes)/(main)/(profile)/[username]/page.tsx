import { notFound } from 'next/navigation';
import type { User } from '@clerk/nextjs/server';
import { clerkClient, currentUser } from '@clerk/nextjs';

import db from '@/lib/db';
import ProfileHeader from '@/components/profile-header';

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

  // get user profile's projects
  const [projects, totalProjects] = await db.$transaction([
    db.project.findMany({
      take: 12,
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    db.project.count({
      where: {
        userId: user.id
      }
    })
  ]);

  const pageCount = Math.ceil(totalProjects / 12);

  return (
    <section className='flex flex-col justify-start items-center lg:px-20 py-6 px-5'>
      <ProfileHeader
        user={user}
        profile={profile}
        projects={projects}
        isOwner={
          loggedInUser && loggedInUser.id === profile.userId ? true : false
        }
      />
    </section>
  );
}
