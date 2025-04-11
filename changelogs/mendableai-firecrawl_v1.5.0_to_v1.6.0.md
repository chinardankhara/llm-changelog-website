# 🔥 firecrawl Changelog: v1.5.0 → v1.6.0 (2024-03-07)

This release introduces the Deep Research Alpha feature, migrates core AI functionality to the Vercel AI SDK enabling Ollama and Claude 3.7 support, and adds OpenAI-compatible API support for self-hosting. Significant improvements were made to crawling logic, self-hosting configuration, billing systems, and database performance via read replica routing, alongside numerous bug fixes.

## 📈 New Features

*   **Deep Research Alpha**:
    *   Introduced initial alpha version of the Deep Research feature (#1271, #1284)
    *   Added support for `maxUrls` and `sources` parameters (#1271)
    *   Implemented `onSource` callback for real-time source updates (#1284)
    *   Renamed `topic` parameter to `query` for clarity (#1284)
*   **AI & Extraction**:
    *   Migrated core LLM extraction logic to Vercel AI SDK for enhanced flexibility and future model support (#1220)
    *   Added support for `Ollama` models via the new AI SDK integration (#1220)
    *   Implemented support for `Claude 3.7` models in crawler and extractor (#1257, #1291)
    *   Enabled self-hosted instances to use any OpenAI-compatible API endpoint (#1245)
*   **SDKs**:
    *   Added `regexOnFullURL` option to JS SDK crawl parameters for more flexible include/exclude matching (#1303)
*   **API**:
    *   Introduced a new `/v1/token-usage` endpoint for monitoring token consumption (Implied by file changes)
*   **Billing**:
    *   Implemented a new batch billing system for improved efficiency (#1264, b72e21a)

## 🔧 Improvements

*   **Crawling & Scraping**:
    *   Improved handling of `includes` and `excludes` parameters, including dropping initial scrape if excluded and fixing various logic bugs (#1303)
    *   Enhanced redirect handling to differentiate between cross-origin and same-origin redirects (#1279)
    *   Updated `/v1/crawl-status-ws` WebSocket endpoint behavior to ignore errors similarly to the standard `/v1/crawl-status` endpoint (#1234)
    *   Increased the default limit for the `map` endpoint to 30,000 URLs (#1d3757b)
    *   Improved `maxUrls` handling and caching logic in LLMStxt generation (#1285)
    *   Updated internal blocklist used during scraping (#ae010a7)
*   **Self-Hosting**:
    *   Added experimental support for using `Valkey` as an alternative to Redis via `docker-compose.yaml` (#1228)
    *   Allowed configuration of the internal API port through environment variables (#82adf81)
    *   Enabled passing `Ollama`-specific environment variables via `docker-compose.yaml` (#1269)
    *   Optimized Dockerfile build stages for faster and more reliable builds (#1231, #1232)
*   **Billing**:
    *   Added comprehensive billing tests and fixed miscellaneous related issues (#1283)
    *   Refined batch billing processing logic (#1de5a2c)
*   **Internal & Infrastructure**:
    *   Improved job logging for better traceability (#1263)
    *   Refined rate limiting logic for API endpoints (#6c51ef4, #72d894c, #1ced546)

## 🐛 Bug Fixes

*   **Scraping & Extraction**:
    *   Fixed character set detection for fetched content, ensuring correct decoding (#1221)
    *   Improved regex for parsing `<meta charset="...">` tags (#1265)
    *   Resolved errors related to token limits during the LLM extraction process (#1236)
    *   Fixed handling of AI responses that return JSON within a markdown code block (#1280)
    *   Corrected an issue where the system prompt was missing from extraction parameters (#8cfc946)
*   **Crawling**:
    *   Prevented errors when empty `includes` or `excludes` arrays were provided (#1223)
    *   Fixed crawler checks for certain strings, improving detection of ads/trackers or specific content patterns (#c22c87a)
*   **Self-Hosting & Docker**:
    *   Forced Docker container host binding to `0.0.0.0` to resolve environment variable precedence issues (#1225)
    *   Ensured `SearXNG` parameters are correctly passed in Docker Compose setups (#51bc775)
*   **SDKs**:
    *   Fixed the JS SDK build process to ensure it's correctly built before publishing (#856ec37)
    *   Addressed various functional issues within the JS SDK (#39b6113)
*   **Authentication & Billing**:
    *   Corrected team membership checks within credit billing logic (#7b05512)
    *   Resolved issues related to authentication using preview tokens (#1305)
    *   Fixed caching behavior for Authentication/Usage Count (ACUC) lookups (#44bf592)
    *   Addressed multiple issues related to database read replica routing for authentication checks (#8620bf3, #1beadf3, #57b3136, #5a149a1, #982b3da)

## 🚀 Performance

*   **Database**:
    *   Implemented routing for specific read operations (like authentication checks and crawling metadata) to Supabase read replicas, reducing load on the primary database (#904e69b, #67ee266, #a1e6c13)
    *   Optimized Authentication/Usage Count (ACUC) caching duration to 1 hour (#44bf592)

## 📚 Documentation

*   **Examples**:
    *   Added a new example demonstrating web crawling using Groq (`groq_web_crawler`) (#1267)
    *   Added a new example showcasing a GitHub analyzer using Gemini (`gemini-github-analyzer`) (#1229)
    *   Added a new example for web crawling with GPT-4.5 (`gpt-4.5-web-crawler`) (#1276)
    *   Added a new example for web crawling with Claude 3.7 (`claude3.7-web-crawler`) (#1257)
    *   Added a new example for web extraction using Claude 3.7 (`claude3.7-web-extractor`) (#1291)
*   **Guides**:
    *   Updated `SELF_HOST.md` with details on embedding parameters and configuring OpenAI-compatible APIs (#1220, #1245)
    *   Removed an erroneous `required` field definition from API documentation (#1282)