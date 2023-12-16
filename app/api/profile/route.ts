import db from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

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
        username
      }
    });

    if (currentUsername) {
      return NextResponse.json(
        { success: false, error: 'Username is not available.' },
        { status: 400 }
      );
    }

    const profile = await db.profile.create({
      data: {
        userId,
        username,
        bio,
        githubUrl,
        linkedinUrl
      }
    });

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
