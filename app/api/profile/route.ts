import db from '@/lib/db';
import { NextResponse } from 'next/server';
import type { Profile } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { username, bio, githubUrl, linkedinUrl } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username is required.' },
        { status: 400 }
      );
    }

    if (!bio) {
      return NextResponse.json(
        { success: false, error: 'Bio is required.' },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { success: false, error: 'GitHub URL is required.' },
        { status: 400 }
      );
    }

    if (!linkedinUrl) {
      return NextResponse.json(
        { success: false, error: 'LinkedIn URL is required.' },
        { status: 400 }
      );
    }

    const currentUsername = await db.profile.findUnique({
      where: {
        username,
        NOT: {
          userId
        }
      }
    });

    if (currentUsername) {
      return NextResponse.json(
        { success: false, error: 'Username is not available.' },
        { status: 400 }
      );
    }

    const currentProfile = await db.profile.findFirst({
      where: {
        userId
      }
    });

    let profile: Profile;

    if (!currentProfile) {
      profile = await db.profile.create({
        data: {
          userId,
          username,
          bio,
          githubUrl,
          linkedinUrl
        }
      });
    } else {
      profile = await db.profile.update({
        where: {
          id: currentProfile.id
        },
        data: {
          userId,
          username,
          bio,
          githubUrl,
          linkedinUrl
        }
      });
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    console.log('[PROFILE_POST]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(_req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const profile = await db.profile.findFirst({
      where: {
        userId: user.id
      }
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Profile not found.' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user, profile });
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    console.log('[PROFILE_GET]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
