/**
 * Configuration module for the Switch Shop
 * Handles environment variables and provides defaults
 */

/**
 * Get the library directory path from environment variables
 * @returns The library directory path
 */
export function getLibraryPath(): string {
  const path = process.env.SHOP_PATH;
  if (!path) {
    console.warn('SHOP_PATH environment variable not set, using default path');
    return './library'; // Default path
  }
  return path;
}

/**
 * Get the server port from environment variables
 * @returns The server port
 */
export function getServerPort(): number {
  const port = process.env.SHOP_PORT;
  if (!port) {
    console.warn('SHOP_PORT environment variable not set, using default port');
    return 3000; // Default port
  }
  return parseInt(port, 10);
}
