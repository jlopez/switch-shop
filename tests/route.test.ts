/**
 * Unit tests for the route handler
 * Tests the handling of non-ASCII characters in filenames
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { NextRequest } from 'next/server';
import { fileURLToPath } from 'url';
import path from 'path';
import { GET, HEAD } from '../src/app/shop/[name]/route';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Route Handler with Special Characters', () => {
  // Store the original environment variable
  const originalShopPath = process.env.SHOP_PATH;
  const testLibraryPath = path.join(__dirname, 'test-library-02');

  // The filename with the decomposed diacritic that causes the issue
  // This is what appears in the URL and causes the error
  const decomposedFileName = '[B] Abzu\u0302 [0100C1300BBC6000][v0-0].nsp';

  // Set up the test environment
  beforeAll(() => {
    // Set the environment variable to point to our test directory
    process.env.SHOP_PATH = testLibraryPath;
  });

  // Clean up after tests
  afterAll(() => {
    // Restore the original environment variable
    if (originalShopPath) {
      process.env.SHOP_PATH = originalShopPath;
    } else {
      delete process.env.SHOP_PATH;
    }
  });

  test('HEAD request should handle non-ASCII characters in filename', async () => {
    // Create a mock request
    const request = new NextRequest('http://localhost:3000/shop/' + encodeURIComponent(decomposedFileName), {
      method: 'HEAD',
    });

    // Create mock params
    const params = Promise.resolve({ name: decomposedFileName });

    // This should succeed (but will fail with the current implementation)
    const response = await HEAD(request, { params });

    // Verify the response is successful
    expect(response.status).toBe(200);

    // Verify the Content-Disposition header is set correctly
    const contentDisposition = response.headers.get('Content-Disposition');
    expect(contentDisposition).toBeDefined();
    expect(contentDisposition).toContain('attachment');
    expect(contentDisposition).toContain('filename=');
  });

  test('GET request should handle non-ASCII characters in filename', async () => {
    // Create a mock request
    const request = new NextRequest('http://localhost:3000/shop/' + encodeURIComponent(decomposedFileName), {
      method: 'GET',
    });

    // Create mock params
    const params = Promise.resolve({ name: decomposedFileName });

    // This should succeed (but will fail with the current implementation)
    const response = await GET(request, { params });

    // Verify the response is successful
    expect(response.status).toBe(200);

    // Verify the Content-Disposition header is set correctly
    const contentDisposition = response.headers.get('Content-Disposition');
    expect(contentDisposition).toBeDefined();
    expect(contentDisposition).toContain('attachment');
    expect(contentDisposition).toContain('filename=');
  });
});
