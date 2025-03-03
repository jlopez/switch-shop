# Switch Shop

A simple HTTP server built with Next.js and Bun to serve files from a library directory.

## Features

- **File Listing**: Browse all files in the library at `/shop`
- **File Downloads**: Download files by clicking on them
- **Clean Interface**: User-friendly display with file sizes and parent directories
- **Configurable**: Set library path and server port via environment variables

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```

### Configuration

Create a `.env.local` file in the root directory with the following variables:

```
# Path to the library directory
SHOP_PATH=/path/to/your/library

# Port for the HTTP server (default: 3000)
SHOP_PORT=3000
```

### Running the Server

Development mode:
```
bun run dev
```

Production build:
```
bun run build
bun run start
```

## Project Structure

- `src/app/shop/page.tsx`: Main page component for the file listing
- `src/app/shop/[name]/route.ts`: API route for file downloads
- `src/components/dir-list.tsx`: Client component for rendering the file list
- `src/lib/fileSystem.ts`: Server-side utilities for file system operations
- `src/lib/types.ts`: Type definitions
- `src/lib/utils.ts`: Utility functions for formatting and content types

## How It Works

1. The server scans the configured library directory for files
2. Files are displayed in a clean list with their sizes and parent directories
3. Clicking on a file initiates a download
4. The server handles errors with appropriate HTTP status codes

## License

MIT
