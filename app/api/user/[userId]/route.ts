import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';

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

    return NextResponse.json(user);
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    console.log('[USERID_GET]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
