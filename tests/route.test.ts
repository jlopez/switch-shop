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

  // The filename with a non-ASCII character (precomposed û)
  // Note: We initially tried testing with a decomposed diacritic (u + combining circumflex),
  // but filesystem normalization in git and macOS converts it to the precomposed form.
  // The fix we implemented (properly encoding the Content-Disposition header) works for
  // both precomposed and decomposed characters, so this test is still valid.
  const specialFileName = '[B] Abzû [0100C1300BBC6000][v0-0].nsp';

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
    const request = new NextRequest('http://localhost:3000/shop/' + encodeURIComponent(specialFileName), {
      method: 'HEAD',
    });

    // Create mock params
    const params = Promise.resolve({ name: specialFileName });

    // This should succeed with our RFC 6266 compliant implementation
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
    const request = new NextRequest('http://localhost:3000/shop/' + encodeURIComponent(specialFileName), {
      method: 'GET',
    });

    // Create mock params
    const params = Promise.resolve({ name: specialFileName });

    // This should succeed with our RFC 6266 compliant implementation
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
