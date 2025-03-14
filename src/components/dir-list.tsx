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
        <a href={`/shop/${encodeURIComponent(file.name)}`}>{file.displayName}</a>
      </td>

      <style jsx>{`
        i.icon {
          display: block;
          height: 16px;
          width: 16px;
        }

        td.file-size {
          text-align: right;
          padding-left: 1em;
        }

        td.display-name {
          padding-left: 1em;
        }

        i.icon-_page {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmhJREFUeNpsUztv01AYPfdhOy/XTZ80VV1VoCqlA2zQqUgwMEErWBALv4GJDfEDmOEHsFTqVCTExAiiSI2QEKJKESVFFBWo04TESRzfy2c7LY/kLtf2d8+555zvM9NaI1ora5svby9OnbUEBxgDlIKiWjXQeLy19/X17sEtcPY2rtHS96/Hu0RvXXLz+cUzM87zShsI29DpHCYt4E6Box4IZzTnbDx7V74GjhOSfwgE0H2638K9h08A3iHGVbjTw7g6YmAyw/BgecHNGGJjvfQhIfmfIFDAXJpjuugi7djIFVI4P0plctgJQ0xnFe5eOO02OwEp2VkhSCnC8WOCdqgwnzFx4/IyppwRVN+XYXsecqZA1pB48ekAnw9/4GZx3L04N/GoTwEjX4cNH5vlPfjtAIYp8cWrQutxrC5Mod3VsXVTMFSqtaE+gl9dhaUxE2tXZiF7nYiiatJ3v5s8R/1yOCNLOuwjkELiTbmC9dJHpIaGASsDkoFQGJQwHWMcHWJYOmUj1OjvQotuytt5nHMLEGkCyx6QU384jwkUAd2sxJbS/QShZtg/8rHzzQOzSaFhxQrA6YgQMQHojCUlgnCAAvKFBoXXaHfArSCZDE0gyWJgFIKmvUFKO4MUNIk2a4+hODtDUVuJ/J732AKS6ZtImdTyAQQB3bZN8l9t75IFh0JMUdVKsohsUPqRgnka0tYgggYpCHkKGTsHI5NOMojB4iTICCepvX53AIEfQta1iUCmoTiBmdEri2RgddKFhuJoqb/af/yw/d3zTNM6UkaOfis62aUgddAbnz+rXuPY+Vnzjt9/CzAAbmLjCrfBiRgAAAAASUVORK5CYII=");
        }
      `}</style>
    </tr>
  );
}

/**
 * Directory listing component (client component)
 */
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

      <style jsx>{`
        table tr {
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
