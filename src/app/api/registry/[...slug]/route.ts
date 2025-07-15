import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const { slug } = await params;
    
    if (!slug || slug.length === 0) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    // Handle registry file requests
    const filename = slug.join('/');
    const filePath = path.join(process.cwd(), 'public', 'r', `${filename}.json`);
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      return NextResponse.json(data, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      });
    } catch (error) {
      console.error(`Failed to read registry file: ${filePath}`, error);
      return NextResponse.json({ error: 'Registry item not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Registry API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}