/**
 * Route handler for the /shop/[name] endpoint
 * Handles file downloads
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs, createReadStream } from 'fs';
import { getFileByName } from '@/lib/fileSystem';
import { getContentType } from '@/lib/utils';
import { LibraryFile } from '@/lib/types';

/**
 * Create a ReadableStream from a LibraryFile
 * @param file The LibraryFile object containing path and name
 * @returns A ReadableStream that streams the file content
 */
function createReadableStream(file: LibraryFile): ReadableStream {
  const fileStream = createReadStream(file.path);

  return new ReadableStream({
    start(controller) {
      fileStream.on('data', (chunk) => {
        controller.enqueue(chunk);
      });

      fileStream.on('end', () => {
        controller.close();
      });

      fileStream.on('error', (error) => {
        console.error(`Error streaming file ${file.name}:`, error);
        controller.error(error);
      });
    },
    cancel() {
      fileStream.destroy();
    }
  });
}

/**
 * Handle file download request
 * @param fileName The name of the file to download
 * @param sendBody Whether to include the file content in the response
 * @returns The response with the file content or headers only
 */
async function handleFileDownload(fileName: string, sendBody: boolean = true): Promise<NextResponse> {
  try {
    // Get the file information
    const file = await getFileByName(fileName);

    // If the file doesn't exist, return a 404 response
    if (!file) {
      return new NextResponse(sendBody ? 'File not found' : null, {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // Get the content type
    const contentType = getContentType(fileName);

    // Get file stats for Content-Length
    const stats = await fs.stat(file.path);

    // Create a ReadableStream from the file if sendBody is true
    const body = sendBody ? createReadableStream(file) : null;

    // Return the response with or without body
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Content-Length': stats.size.toString(),
      },
    });
  } catch (error) {
    console.error(`Error handling /shop/${fileName} request:`, error);

    // Return a 500 error response
    return new NextResponse(sendBody ? 'Internal Server Error' : null, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

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
  return handleFileDownload(fileName, true);
}

/**
 * HEAD handler for the /shop/[name] endpoint
 * Returns headers without the file content
 * @param request The incoming request
 * @param params The route parameters
 * @returns The response with headers only
 */
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
): Promise<NextResponse> {
  // Await params before using its properties
  const { name: fileName } = await params;
  return handleFileDownload(fileName, false);
}
