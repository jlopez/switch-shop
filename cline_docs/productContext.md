# Product Context

## Why This Project Exists

The Switch Shop project exists to provide a simple, efficient way to serve and download files from a library directory via a web interface. It's designed to be a lightweight solution for sharing files within a structured library, specifically focused on Nintendo Switch game files (NSP files).

## Problems It Solves

1. **File Access**: Provides easy access to files stored in a nested directory structure
2. **File Discovery**: Creates a unified view of all files regardless of their actual location in the directory structure
3. **File Distribution**: Enables simple downloading of files through a web interface
4. **Clean Presentation**: Displays file names in a clean, user-friendly format by removing technical prefixes and IDs
5. **Organization**: Shows parent directory information to help users understand the file organization

## How It Works

1. **File Listing**: The `/shop` endpoint displays a React-rendered listing of all files in the library
   - Files are displayed with links regardless of their actual location in the directory structure
   - The listing shows all files from nested directories (one level deep)
   - File names are cleaned up for better readability (removing technical prefixes and IDs)
   - File sizes are displayed in human-readable format
   - Parent directories are shown to provide context

2. **File Download**: The `/shop/[name]` endpoint allows downloading individual files
   - Files can be accessed directly by name, regardless of their location in the directory structure
   - Appropriate content types are set for different file extensions
   - Content-Disposition headers ensure proper file downloading

3. **Configuration**:
   - The library directory path is configured via the `SHOP_PATH` environment variable
   - The server port is configured via the `SHOP_PORT` environment variable
   - Default values are provided for when environment variables are not set

4. **Error Handling**:
   - Returns appropriate HTTP status codes (e.g., 404 for non-existent files)
   - Handles requests for non-existent files and subdirectories
   - Provides clear error messages for debugging

5. **Architecture**:
   - Server components handle data fetching and file system operations
   - Client components handle UI rendering and interactivity
   - Clear separation of concerns for better maintainability
