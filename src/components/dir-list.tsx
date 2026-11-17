"use client";

import { LibraryFile } from '@/lib/types';
import { formatFileSize } from '@/lib/utils';

interface DirListProps {
  files: LibraryFile[];
}

/**
 * File item component
 */
function FileItem({ file }: { file: LibraryFile }) {
  return (
    <tr>
      <td><i className="icon icon-_page"></i></td>
      <td className="perms"><code>(-rwxrwxrwx)</code></td>
      <td className="last-modified">15-Oct-2024 13:37</td>
      <td className="file-size"><code>{formatFileSize(file.size)}</code></td>
      <td className="display-name">
        <a href={encodeURIComponent(file.name)}>{file.name}</a>
      </td>
    </tr>
  );
}

/**
 * Directory listing component (client component)
 */
// Listing styles live in globals.css on purpose: styled-jsx adds class="jsx-…" to every element, and DBI
// parses listings with the regex <a href="([^"]+)">([^<]+)</a>, which tolerates no other attributes on the anchor.
export default function DirList({ files }: DirListProps) {
  return (
    <div>
      <h1>Index of /</h1>
      <table>
        <tbody>
          {files.length > 0 ? (
            files.map((file) => (
              <FileItem key={file.path} file={file} />
            ))
          ) : (
            <tr>
              <td colSpan={5}>No files found in the library.</td>
            </tr>
        )}
        </tbody>
      </table>
      <br />
      <address>Node.js v22.11.0/ <a href="https://github.com/jlopez/switch-shop">switch-shop</a> server running @ 192.168.0.91:3000</address>
    </div>
  );
}
