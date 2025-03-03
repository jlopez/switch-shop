/**
 * File system utilities for the Switch Shop
 * Handles scanning the library directory and retrieving files
 *
 * NOTE: This file contains server-side code only and should not be imported by client components
 */

import { promises as fs } from 'fs';
import path from 'path';
import { getLibraryPath } from './config';
import { LibraryFile } from './types';
import { cleanupFileName } from './utils';

/**
 * Scan the library directory and return all files
 * @returns A promise that resolves to an array of LibraryFile objects
 */
export async function scanLibrary(): Promise<LibraryFile[]> {
  const libraryPath = getLibraryPath();
  const files: LibraryFile[] = [];

  try {
    // Check if the library directory exists
    try {
      await fs.access(libraryPath);
    } catch (error) {
      console.error(`Library directory not found: ${libraryPath}`);
      return [];
    }

    // Get all directories in the library (one level deep)
    const dirents = await fs.readdir(libraryPath, { withFileTypes: true });
    const directories = dirents
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // Scan each directory for files
    for (const dir of directories) {
      const dirPath = path.join(libraryPath, dir);
      const dirDirents = await fs.readdir(dirPath, { withFileTypes: true });

      const dirFilePromises = dirDirents
        .filter(dirent => dirent.isFile())
        .map(async dirent => {
          const filePath = path.join(dirPath, dirent.name);
          const stats = await fs.stat(filePath);
          return {
            name: dirent.name,
            displayName: cleanupFileName(dirent.name),
            path: filePath,
            size: stats.size,
            parentDir: dir
          };
        });

      const dirFiles = await Promise.all(dirFilePromises);
      files.push(...dirFiles);
    }

    return files;
  } catch (error) {
    console.error('Error scanning library:', error);
    return [];
  }
}

/**
 * Get a file by its name
 * @param fileName The name of the file to retrieve
 * @returns The file object if found, undefined otherwise
 */
export async function getFileByName(fileName: string): Promise<LibraryFile | undefined> {
  const files = await scanLibrary();
  return files.find(file => file.name === fileName);
}
