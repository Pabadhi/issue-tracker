
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import{z} from 'zod';
import prisma from '@/prisma/client';
import { use} from 'react';

const createIssueSchema = z.object({
  title: z.string().min(1,'Title is required').max(255),
  description: z.string().min(1,'Description is required').max(1000),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);


  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

