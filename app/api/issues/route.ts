
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { use} from 'react';
import { createIssueSchema } from './validation';

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

