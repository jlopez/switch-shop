/**
 * Type definitions for the Switch Shop
 */

/**
 * Represents a file in the library
 */
export interface LibraryFile {
  /** The name of the file (without path) */
  name: string;
  /** The display name of the file (cleaned up for UI) */
  displayName: string;
  /** The full path to the file */
  path: string;
  /** The size of the file in bytes */
  size: number;
  /** The parent directory name */
  parentDir: string;
}
