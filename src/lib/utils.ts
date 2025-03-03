/**
 * Utility functions for the Switch Shop
 */

/**
 * Format file size in a human-readable way
 * @param bytes The size in bytes
 * @returns The formatted size string
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Clean up a file name for display
 * Removes common prefixes and suffixes from NSP files
 * @param fileName The original file name
 * @returns The cleaned up file name
 */
export function cleanupFileName(fileName: string): string {
  // Remove common prefixes like [B], [C], [U], etc.
  let cleanName = fileName.replace(/^\[[A-Z]\]\s+/, '');

  // Remove title ID and version info in square brackets
  cleanName = cleanName.replace(/\s+\[[0-9A-F]{16}\](\[v[0-9\-\.]+\])?\.nsp$/, '.nsp');

  return cleanName;
}

/**
 * Get the content type for a file based on its extension
 * @param fileName The name of the file
 * @returns The content type
 */
export function getContentType(fileName: string): string {
  const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

  const contentTypes: Record<string, string> = {
    '.bin': 'application/octet-stream',
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.nsp': 'application/octet-stream' // Nintendo Switch Package
  };

  return contentTypes[ext] || 'application/octet-stream';
}
