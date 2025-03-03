# System Patterns

## How the System is Built

The Switch Shop is built as a Next.js application using Bun as the runtime. It follows the App Router architecture with the following components:

1. **Next.js App Router**: Used to implement the routes (`/shop` and `/shop/[name]`)
2. **Server Components**: Used for data fetching and server-side operations
3. **Client Components**: Used for interactive UI elements with client-side JavaScript
4. **File System Utilities**: Functions to scan the library directory and retrieve files

## Key Technical Decisions

1. **Next.js with Bun**:
   - Using Next.js for its robust routing and server-side rendering capabilities
   - Using Bun as the runtime for improved performance and modern JavaScript features

2. **Server/Client Component Separation**:
   - Server components for data fetching and file system operations
   - Client components for UI rendering with styled-jsx
   - Clear separation to optimize performance and bundle size

3. **Environment Variables for Configuration**:
   - Using environment variables (`SHOP_PATH` and `SHOP_PORT`) for configuration
   - This allows for flexible deployment and easy configuration changes

4. **File System Abstraction**:
   - Creating an abstraction layer for file system operations
   - This separates the file system logic from the HTTP server logic

5. **Flat File Representation**:
   - Presenting files in a flat structure regardless of their actual location
   - This simplifies the user experience and makes file access more intuitive

## Architecture Patterns

1. **App Router Pattern**:
   - Using Next.js App Router for file-based routing
   - Page components for rendering routes
   - Route handlers for API endpoints

2. **Server/Client Component Pattern**:
   - Server components for data fetching and processing
   - Client components for interactive UI elements
   - Clear separation with "use client" directive

3. **Service Layer Pattern**:
   - Implementing a service layer for file system operations
   - This separates the business logic from the HTTP request handling

4. **Configuration Pattern**:
   - Using a configuration module to handle environment variables
   - This centralizes configuration management and provides defaults

5. **Error Handling Pattern**:
   - Implementing consistent error handling across the application
   - Using appropriate HTTP status codes for different error conditions

6. **Type-Driven Development**:
   - Using TypeScript interfaces to define data structures
   - Separating types into a dedicated module for better organization
