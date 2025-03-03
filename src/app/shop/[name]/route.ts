/**
 * Route handler for the /shop/[name] endpoint
 * Handles file downloads
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { getFileByName } from '@/lib/fileSystem';
import { getContentType } from '@/lib/utils';

/**
 * GET handler for the /shop/[name] endpoint
 * @param request The incoming request
 * @param params The route parameters
 * @returns The response with the file content
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
): Promise<NextResponse> {
  // Await params before using its properties
  const { name: fileName } = await params;
  try {
    // Get the file information
    const file = await getFileByName(fileName);

    // If the file doesn't exist, return a 404 response
    if (!file) {
      return new NextResponse('File not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // Read the file content
    const fileContent = await fs.readFile(file.path);

    // Get the content type
    const contentType = getContentType(fileName);

    // Return the file content
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error(`Error handling /shop/${fileName} request:`, error);

    // Return a 500 error response
    return new NextResponse('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
