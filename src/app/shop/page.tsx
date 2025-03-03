/**
 * Page component for the /shop endpoint
 * Displays a listing of all files in the library
 */

import { scanLibrary } from '@/lib/fileSystem';
import DirList from '@/components/dir-list';

/**
 * Shop page component (server component)
 */
export default async function ShopPage() {
  // Scan the library for files
  const files = await scanLibrary();

  // Render the client component with the files
  return <DirList files={files} />;
}
