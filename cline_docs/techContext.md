# Tech Context

## Technologies Used

1. **Next.js**: A React framework for building server-rendered applications
   - Version: 15.2.0
   - Using App Router for file-based routing
   - Server and Client Components for optimal performance

2. **Bun**: A JavaScript runtime and package manager
   - Used as the runtime for improved performance
   - Used for package management and development server

3. **TypeScript**: A typed superset of JavaScript
   - Used for type safety and improved developer experience
   - Interfaces for data structures and function signatures

4. **React**: A JavaScript library for building user interfaces
   - Server Components for data fetching
   - Client Components for interactive UI elements
   - styled-jsx for component-scoped CSS

5. **Node.js File System API**: Used for file system operations
   - Promises API for asynchronous operations
   - Directory scanning and file reading

6. **Environment Variables**: Used for configuration
   - `SHOP_PATH`: Path to the library directory
   - `SHOP_PORT`: Port for the HTTP server

## Development Setup

1. **Prerequisites**:
   - Bun installed
   - Node.js installed (for compatibility)

2. **Project Setup**:
   - Created with `bun create next-app`
   - ESLint configured for code quality
   - TypeScript configured for type safety

3. **Project Structure**:
   - `src/app`: Next.js App Router pages and routes
   - `src/components`: React components
   - `src/lib`: Utility functions and shared code

4. **Running the Project**:
   - Development: `bun run dev`
   - Production: `bun run build && bun run start`

5. **Environment Configuration**:
   - Create a `.env.local` file with:
     ```
     SHOP_PATH=/path/to/library
     SHOP_PORT=3000
     ```

## Technical Constraints

1. **Library Structure**:
   - The library has a nested structure with one level of directories
   - Each directory contains files (primarily NSP files for Nintendo Switch)
   - File names may contain special characters and spaces

2. **File Access**:
   - Files need to be accessible by name regardless of their location
   - The server maps file names to their actual paths for downloading

3. **Performance Considerations**:
   - Asynchronous file system operations for better performance
   - Server components for efficient data fetching
   - Client components only where interactivity is needed

4. **Error Handling**:
   - Appropriate HTTP status codes for different error conditions
   - Graceful handling of missing files and directories
   - Proper error messages for debugging

5. **Security Considerations**:
   - Validation of file paths to prevent directory traversal attacks
   - Content-Type headers for proper file handling
   - Error handling that doesn't leak sensitive information

6. **Next.js Specific Constraints**:
   - Server/Client component separation
   - Dynamic route parameters as promises in Next.js 15
   - File-based routing with the App Router
