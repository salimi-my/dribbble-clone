import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';

import db from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await clerkClient.users.getUser(params.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found.' },
        { status: 400 }
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

    console.log('[PROFILE_USERID_GET]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
