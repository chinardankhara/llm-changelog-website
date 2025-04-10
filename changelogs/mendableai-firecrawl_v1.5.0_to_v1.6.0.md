# 🔥 firecrawl Changelog: v1.5.0 → v1.6.0 (2025-03-06)

This release introduces a major overhaul of AI integrations using the Vercel AI SDK, enabling support for Ollama, Claude 3.7, GPT-4.5, and generic OpenAI-compatible APIs. Significant progress was made on the Deep Research Alpha feature, alongside numerous improvements to crawling logic, self-hosting capabilities, performance via database read replicas, and various bug fixes across the platform. New examples showcasing integrations with different AI models have also been added.

## 📈 New Features

*   **AI Integration Overhaul**:
    *   Migrated core AI functionalities to the Vercel AI SDK for improved flexibility and maintainability (#1220)
    *   Added support for Ollama models (#1220, #1269)
    *   Added support for using any OpenAI-compatible API endpoint for self-hosted instances (#1245)
    *   Implemented support for Claude 3.7 models (#1257)
    *   Added support for GPT-4.5 models (#1276)
*   **Deep Research (Alpha)**:
    *   Introduced initial alpha version with core functionality (#1271, #1284)
    *   Added configuration for `maxUrls` and `sources` (#1271)
    *   Implemented `onSource` callback for real-time source updates (#1284)
    *   Refined status reporting and internal service logic (#1271, #1284, #30c1e92, #aa54fd1)
*   **SDKs**:
    *   Added `regexOnFullURL` option to the JS SDK crawl parameters for more flexible URL matching (#1303)
    *   Updated JS and Python SDKs to include new Deep Research alpha functionality (#1284)

## 🔧 Improvements

*   **Crawling**:
    *   Improved handling of `includes` and `excludes` parameters, including ignoring empty lists and dropping initial scrapes if excluded (#1223, #1303)
    *   Enhanced redirect handling to differentiate between cross-origin and same-origin redirects (#1279)
    *   Increased the default limit for the `map` endpoint to 30,000 URLs (#1d3757b)
    *   Improved `llmstxt` generation by truncating cache based on `maxUrls` limit (#1285)
    *   Updated crawl status WebSocket (`/v1/crawl-status-ws`) behavior to ignore errors similarly to the standard `/v1/crawl-status` endpoint (#1234)
*   **Self-Hosting**:
    *   Allowed configuration of the internal API port via Docker Compose (#82adf81)
    *   Added an option to use Valkey instead of Redis via Docker Compose (#1228)
    *   Enabled passing Ollama environment variables through Docker Compose (#1269)
    *   Improved Dockerfile build process for production dependencies (#1232)
*   **AI & Extraction**:
    *   Refactored LLM extraction logic using the new AI SDK abstractions (#1220)
    *   Removed `zod-to-json-schema` dependency (#1220)
*   **Billing**:
    *   Implemented batch billing system for improved efficiency (#1264, #b72e21a)
    *   Added dedicated billing tests and fixed related minor issues (#1283)
    *   Refined credit billing logic and team checks (#7b05512)

## 🐛 Bug Fixes

*   **Scraping**:
    *   Improved character set detection from meta tags and HTTP headers to handle encoding issues correctly (#1221, #7bf04d4)
    *   Allowed more time for stealth proxy operations during scraping (#283a3bf)
*   **Crawling**:
    *   Fixed crawler to correctly ignore empty `includes`/`excludes` arrays (#1223)
    *   Resolved issues with `includes`/`excludes` logic, particularly with initial URL checks (#1303)
    *   Fixed crawler checks for certain strings (potentially related to ad/tracker blocking) (#c22c87a)
*   **Extraction**:
    *   Fixed issues related to token limits during the extraction process (#1236, #5ab86b8)
    *   Corrected handling of AI responses that return JSON within a code block (#1280)
    *   Fixed missing `systemPrompt` parameter in extraction calls (#8cfc946)
*   **Self-Hosting**:
    *   Forced Docker container host to `0.0.0.0` to resolve environment variable precedence issues (#1225, #b88b573)
    *   Fixed passing of SearXNG parameters in Docker Compose configuration (#51bc775)
*   **SDKs**:
    *   Resolved build issues in the JS SDK publishing workflow (#856ec37)
    *   Fixed issues in the JS SDK related to recent API changes (#39b6113)
*   **Authentication & Billing**:
    *   Addressed issues related to preview token handling (#1305, #60346ec)
    *   Fixed miscellaneous billing logic issues (#1283)
*   **API**:
    *   Fixed handling of empty `includes`/`excludes` in `crawl-redis` (#1223)

## 🚀 Performance

*   **Database Scaling**:
    *   Implemented Supabase read replica routing for improved read performance (#1274, #904e69b)
    *   Routed Active User Usage Count (ACUC) checks to read replicas (#44bf592, #67ee266, #8620bf3)
    *   Moved crawl-related database reads to replicas (#a1e6c13)
*   **Caching**:
    *   Cached Active User Usage Count (ACUC) results for 1 hour (#44bf592)

## 📚 Documentation

*   Added example for using Firecrawl with Groq for web crawling/analysis (#1267, #522f2d2)
*   Added example demonstrating Gemini for GitHub analysis (#1229, #9671e68)
*   Added example for web crawling using Claude 3.7 (#1257, #2da6d7b)
*   Added example for web crawling using GPT-4.5 (#1276, #ab8dcab)
*   Added example for web extraction using Claude 3.7 (#1291, #72eb360)
*   Updated `SELF_HOST.md` with embedding parameter info and AI configuration details (#1220, #1245)
*   Removed an undefined `required` field from API documentation (#1282)

Suggested Filename: `ai_sdk_deep_research_v1.5.0_to_v1.6.0.md`