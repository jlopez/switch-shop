/**
 * Unit tests for the file system utilities
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { scanLibrary, getFileByName } from '../src/lib/fileSystem';
import { LibraryFile } from '../src/lib/types';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('File System Utilities', () => {
  // Store the original environment variable
  const originalShopPath = process.env.SHOP_PATH;
  const testLibraryPath = path.join(__dirname, 'test-library-01');

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

  test('scanLibrary should find all files in the test directory', async () => {
    // Call the scanLibrary function
    const files = await scanLibrary();

    // Verify that we found the expected number of files (6 files in the first level directories)
    expect(files.length).toBe(6);

    // Create a map of file names for easier testing
    const fileMap = new Map<string, LibraryFile>();
    files.forEach(file => {
      fileMap.set(file.name, file);
    });

    // Verify that all expected files are found
    expect(fileMap.has('[B] Game1 Base [01234567890ABCDE][v0].nsp')).toBe(true);
    expect(fileMap.has('[C] Game1 Update [01234567890ABCDE][v1].nsp')).toBe(true);
    expect(fileMap.has('[B] Game2 [FEDCBA9876543210][v0].nsp')).toBe(true);
    expect(fileMap.has('[B] Game3 [1A2B3C4D5E6F7890][v0].nsp')).toBe(true);
    expect(fileMap.has('[C] Game3 Update [1A2B3C4D5E6F7890][v1].nsp')).toBe(true);
    expect(fileMap.has('[D] Game3 DLC [1A2B3C4D5E6F7890][v0].nsp')).toBe(true);

    // Verify that the nested file is NOT found (current implementation only scans one level deep)
    expect(fileMap.has('[B] NestedGame [0987654321ABCDEF][v0].nsp')).toBe(false);
  });

  test('scanLibrary should correctly capture file metadata', async () => {
    const files = await scanLibrary();
    const fileMap = new Map<string, LibraryFile>();
    files.forEach(file => {
      fileMap.set(file.name, file);
    });

    // Check metadata for a specific file
    const game1Base = fileMap.get('[B] Game1 Base [01234567890ABCDE][v0].nsp');
    expect(game1Base).toBeDefined();
    if (game1Base) {
      // Check file name
      expect(game1Base.name).toBe('[B] Game1 Base [01234567890ABCDE][v0].nsp');

      // Check display name (should be cleaned up)
      expect(game1Base.displayName).toBe('Game1 Base.nsp');

      // Check parent directory
      expect(game1Base.parentDir).toBe('Game1');

      // Check file path
      expect(game1Base.path).toBe(path.join(testLibraryPath, 'Game1', '[B] Game1 Base [01234567890ABCDE][v0].nsp'));

      // Check file size (should be greater than 0)
      expect(game1Base.size).toBeGreaterThan(0);
    }
  });

  test('scanLibrary should handle different file sizes correctly', async () => {
    const files = await scanLibrary();
    const fileMap = new Map<string, LibraryFile>();
    files.forEach(file => {
      fileMap.set(file.name, file);
    });

    // Get files with different content lengths
    const game1Base = fileMap.get('[B] Game1 Base [01234567890ABCDE][v0].nsp');
    const game1Update = fileMap.get('[C] Game1 Update [01234567890ABCDE][v1].nsp');

    expect(game1Base).toBeDefined();
    expect(game1Update).toBeDefined();

    if (game1Base && game1Update) {
      // The update file has more content, so it should be larger
      expect(game1Update.size).toBeGreaterThan(game1Base.size);
    }
  });

  test('getFileByName should return the correct file', async () => {
    // Get a specific file by name
    const file = await getFileByName('[B] Game2 [FEDCBA9876543210][v0].nsp');

    // Verify that the file is found
    expect(file).toBeDefined();

    if (file) {
      // Check file properties
      expect(file.name).toBe('[B] Game2 [FEDCBA9876543210][v0].nsp');
      expect(file.displayName).toBe('Game2.nsp');
      expect(file.parentDir).toBe('Game2');
      expect(file.path).toBe(path.join(testLibraryPath, 'Game2', '[B] Game2 [FEDCBA9876543210][v0].nsp'));
    }
  });

  test('getFileByName should return undefined for non-existent files', async () => {
    // Try to get a file that doesn't exist
    const file = await getFileByName('non-existent-file.nsp');

    // Verify that the file is not found
    expect(file).toBeUndefined();
  });

  test('scanLibrary should handle nested directories correctly', async () => {
    const files = await scanLibrary();

    // Check that we have files from the first level directories
    const game1Files = files.filter(file => file.parentDir === 'Game1');
    const game2Files = files.filter(file => file.parentDir === 'Game2');
    const game3Files = files.filter(file => file.parentDir === 'Game3');
    const nestedFiles = files.filter(file => file.parentDir === 'NestedTest');

    // Verify counts for each directory
    expect(game1Files.length).toBe(2);
    expect(game2Files.length).toBe(1);
    expect(game3Files.length).toBe(3);

    // NestedTest directory should have no files (since we don't scan subdirectories)
    expect(nestedFiles.length).toBe(0);

    // Verify that no files from subdirectories are included
    const subFolderFiles = files.filter(file => file.parentDir === 'SubFolder');
    expect(subFolderFiles.length).toBe(0);
  });
});
