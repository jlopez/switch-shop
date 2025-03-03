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
    <li className="file-item">
      <a href={`/shop/${encodeURIComponent(file.name)}`} className="file-link">
        <span className="file-name">{file.displayName}</span>
      </a>
      <span className="file-info">
        <span className="file-size">{formatFileSize(file.size)}</span>
        <span className="file-parent">{file.parentDir}</span>
      </span>
    </li>
  );
}

/**
 * Directory listing component (client component)
 */
export default function DirList({ files }: DirListProps) {
  return (
    <div className="shop-container">
      <h1>Switch Shop</h1>

      {files.length > 0 ? (
        <ul className="file-list">
          {files.map((file) => (
            <FileItem key={file.path} file={file} />
          ))}
        </ul>
      ) : (
        <p className="empty-message">No files found in the library.</p>
      )}

      <style jsx>{`
        .shop-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f5f5f5;
        }
        h1 {
          color: #333;
          border-bottom: 2px solid #ddd;
          padding-bottom: 0.5rem;
        }
        .file-list {
          list-style: none;
          padding: 0;
        }
        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }
        .file-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        }
        .file-link {
          color: #0066cc;
          text-decoration: none;
          font-weight: 500;
        }
        .file-link:hover {
          text-decoration: underline;
        }
        .file-info {
          display: flex;
          gap: 1rem;
          color: #666;
          font-size: 0.9rem;
        }
        .file-parent {
          background-color: #eee;
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
        }
        .empty-message {
          text-align: center;
          padding: 2rem;
          color: #666;
        }
      `}</style>
    </div>
  );
}
