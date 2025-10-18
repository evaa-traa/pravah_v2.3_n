# AI Rules and Tech Stack Guidelines

This document outlines the core technologies used in this application and provides guidelines for their usage.

## Tech Stack Overview

*   **SolidJS**: A declarative JavaScript library for creating user interfaces, focusing on fine-grained reactivity and high performance.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs directly in your markup.
*   **Web Components**: Custom elements built using SolidJS (`solid-element`) to encapsulate functionality and styling, allowing for reusable UI widgets.
*   **Node.js / Express.js**: The backend proxy server is built with Node.js and the Express.js framework to handle API requests securely.
*   **Rollup**: A module bundler for JavaScript, used to compile small pieces of code into something larger and more complex, like a library or application.
*   **HTTP Client (Fetch / Axios)**: `fetch` API is used for client-side requests, while `axios` and `node-fetch` are used on the server-side for making HTTP calls.
*   **Markdown Rendering**: The `@ts-stack/markdown` library is used for parsing and rendering Markdown content within the UI.
*   **Form Validation**: `zod` is employed for schema validation, ensuring data integrity for forms.
*   **Environment Variables**: `dotenv` is used for managing environment-specific configurations.

## Library Usage Rules

To maintain consistency and efficiency, please adhere to the following rules when developing:

*   **UI Development**: All new UI components and features must be built using **SolidJS**. Leverage SolidJS's reactivity primitives (`createSignal`, `createEffect`, etc.) for state management.
*   **Styling**: **Tailwind CSS** is the exclusive styling framework. All styling should be applied using Tailwind utility classes. Avoid writing custom CSS unless absolutely necessary and only within `<style>` tags in components, if unavoidable.
*   **HTTP Requests (Client-side)**: For making API calls from the frontend, use the existing `sendRequest` utility which wraps the native `fetch` API.
*   **HTTP Requests (Server-side)**: On the Node.js proxy server, use `axios` or `node-fetch` for external API interactions.
*   **Markdown Display**: When displaying Markdown content, utilize the `@ts-stack/markdown` library for parsing and rendering.
*   **Form Validation**: For any form data validation, use **Zod** schemas to define and validate input structures.
*   **Web Components**: When creating reusable UI elements that need to be exposed as custom HTML tags, use `solid-element` as demonstrated in `src/register.tsx`.
*   **Icons**: Prefer using custom SVG icons as currently implemented. If a new icon is needed, create a new SVG component in `src/components/icons/`.
*   **UUID Generation**: For generating unique identifiers, use the `uuid` package.
*   **Audio Recording**: Use the existing `src/utils/audioRecording.ts` utility for any audio recording functionality.