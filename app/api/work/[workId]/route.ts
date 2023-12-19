import db from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(
  req: Request,
  { params }: { params: { workId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { title, description, image, liveSiteUrl, githubUrl, category } =
      body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image is required.' },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required.' },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { success: false, error: 'Description is required.' },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { success: false, error: 'GitHub URL is required.' },
        { status: 400 }
      );
    }

    if (!liveSiteUrl) {
      return NextResponse.json(
        { success: false, error: 'Website URL is required.' },
        { status: 400 }
      );
    }

    if (!params.workId) {
      return NextResponse.json(
        { success: false, error: 'Work ID is required.' },
        { status: 400 }
      );
    }

    const workFound = await db.work.findUnique({
      where: {
        id: params.workId,
        userId
      }
    });

    if (!workFound) {
      return NextResponse.json(
        { success: false, error: 'Work not found.' },
        { status: 400 }
      );
    }

    const work = await db.work.update({
      where: {
        id: params.workId
      },
      data: {
        userId,
        image,
        title,
        description,
        githubUrl,
        liveSiteUrl,
        category
      }
    });

    revalidatePath('/');

    return NextResponse.json({ success: true, work });
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    console.log('[WORK_WORKID_POST]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { workId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!params.workId) {
      return NextResponse.json(
        { success: false, error: 'Work ID is required.' },
        { status: 400 }
      );
    }

    const workFound = await db.work.findUnique({
      where: {
        id: params.workId,
        userId
      }
    });

    if (!workFound) {
      return NextResponse.json(
        { success: false, error: 'Work not found.' },
        { status: 400 }
      );
    }

    const work = await db.work.delete({
      where: {
        id: params.workId
      }
    });

    revalidatePath('/');

    return NextResponse.json({ success: true, work });
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    console.log('[WORK_WORKID_DELETE]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
