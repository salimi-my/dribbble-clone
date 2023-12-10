import db from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
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

    const project = await db.project.create({
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

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.log('[PROJECT_POST]', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
