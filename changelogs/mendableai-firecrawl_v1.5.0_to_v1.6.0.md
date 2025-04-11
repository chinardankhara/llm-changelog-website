# 🔥 mendableai/firecrawl Changelog: v1.5.0 → v1.6.0 (2025-03-07)

This release introduces significant advancements, including the integration of the Vercel AI SDK with Ollama support, the alpha version of Deep Research capabilities, and a new batch billing system. Numerous improvements enhance crawling logic, self-hosting options (like Valkey support and configurable ports), and overall system performance through database read replica utilization. Several bug fixes address issues in scraping character sets, extraction token limits, crawling includes/excludes logic, and the JS SDK build process.

## 📈 New Features

*   **AI SDK Integration**:
    *   Migrated core extraction logic to the Vercel AI SDK, enabling broader model support and future flexibility (#1220).
    *   Added initial support for using Ollama models for extraction (#1220, #78334e4).
    *   Enabled the use of any OpenAI-compatible API endpoint for AI features in self-hosted deployments (#15489be, #1245).
*   **Deep Research (Alpha)**:
    *   Introduced initial alpha functionality for deep research tasks (#289e351, #1271, #22d4f0d, #1284).
    *   Added configuration options for `maxUrls` and `sources` (#289e351).
    *   Implemented an `onSource` callback in the SDKs for real-time updates on discovered sources (#22d4f0d, #aa54fd1).
*   **Batch Billing**:
    *   Implemented a new system for batch processing of billing events for improved efficiency (#b72e21a, #1264).
*   **Model Support**:
    *   Added support for Claude 3.7 in crawling and extraction workflows (#6508afc, #2da6d7b, #bced299, #72eb360).
*   **GitHub Analyzer**:
    *   Implemented a new analyzer specifically designed for processing GitHub repositories (#448b44c, #9671e68).
*   **JS SDK**:
    *   Added a `regexOnFullURL` option to the `crawl` method for more flexible URL matching during crawls (#e1cfe1d).
*   **API**:
    *   Added a new endpoint `/v1/token-usage` to retrieve token usage information (#9ad9478, #1283).

## 🔧 Improvements

*   **Crawling**:
    *   Improved handling of `includes`/`excludes` patterns, ensuring empty lists are ignored and initial URLs are checked correctly against patterns (#16c3057, #1223, #e1cfe1d, #1303).
    *   Enhanced redirect handling to differentiate between cross-origin and same-origin redirects for more accurate crawling (#e8c698d, #1279).
    *   Optimized `llmstxt` generation by truncating the cache based on the `maxUrls` limit, improving resource usage for large crawls (#5a18869, #1285).
    *   Updated the crawl status WebSocket endpoint (`/v1/crawl-status-ws`) behavior to ignore errors similarly to the standard `/v1/crawl-status` endpoint (#8c42b08, #1234).
*   **Self-Hosting**:
    *   Added the option to use Valkey (a Redis fork) as the caching backend via `docker-compose.yaml` (#bfe6a0a, #1228).
    *   Allowed configuration of the internal API port through `docker-compose.yaml` for easier integration in complex network setups (#82adf81).
    *   Enabled passing Ollama-related environment variables directly into the Docker Compose setup for easier configuration (#78334e4, #1269).
    *   Improved the API Dockerfile for better dependency management and build stages (#76e1f29, #1231, #1232).
*   **AI & Extraction**:
    *   Refactored internal AI model adapters for better abstraction and maintainability following the AI SDK migration (#25d9bdb).
    *   Removed the `zod-to-json-schema` dependency as part of the AI SDK migration (#25d9bdb).
*   **API & Infrastructure**:
    *   Increased the maximum number of URLs supported by the `/v1/map` endpoint to 30,000 (#1d3757b).
    *   Enhanced logging details for background jobs for better observability (#59d09f5, #0f05203, #ec90aaf, #31df234).
    *   Refined rate-limiting logic for API endpoints (#6c51ef4, #72d894c, #1ced546).
*   **Billing**:
    *   Added comprehensive integration tests for billing logic and fixed related minor issues (#9ad9478, #1283).

## 🐛 Bug Fixes

*   **Scraping**:
    *   Fixed issues with detecting the correct character set (charset) from HTTP headers or meta tags and re-decoding content accordingly, preventing garbled text (#283a3bf, #1221).
    *   Improved the regular expression used to parse charset information from HTML `meta` tags for better accuracy (#7bf04d4, #1265).
    *   Increased timeouts when using the stealth proxy option to allow more time for complex pages (#283a3bf - commit message detail).
*   **Extraction**:
    *   Resolved errors related to token limits during the LLM extraction process (#5ab86b8, #1236).
    *   Fixed handling of AI model responses that incorrectly wrap JSON output within a markdown code block (#4f25f12, #1280).
    *   Corrected an issue where the `systemPrompt` was missing from extraction parameters under certain conditions (#8cfc946).
*   **Crawling**:
    *   Ensured that empty `includes` or `excludes` arrays provided in crawl requests are correctly ignored (#16c3057, #1223).
    *   Improved detection logic for certain strings within web pages (potentially related to ads or specific content patterns) (#c22c87a).
*   **Self-Hosting**:
    *   Forced the Docker container host binding to `0.0.0.0` to prevent environment variable precedence issues that could cause the API to be unreachable (#b88b573, #1225).
    *   Fixed the passing of SearXNG parameters in the Docker Compose setup (#51bc775).
*   **JS SDK**:
    *   Resolved build issues in the CI pipeline that prevented the JS SDK from being published correctly (#856ec37).
    *   Fixed various unspecified issues within the JS SDK for improved stability (#39b6113).
*   **Billing**:
    *   Corrected a check related to team identification logic within the credit billing system (#7b05512).
*   **Authentication & Preview**:
    *   Addressed issues related to preview token generation and validation (#e6c3f20, #60346ec, #1305).

## 🚀 Performance

*   **Database Optimization**:
    *   Implemented read replica routing for Supabase database queries, directing read-heavy operations like authentication checks and crawl status lookups to replicas to reduce load on the primary database (#904e69b, #1274, #67ee266, #8620bf3, #a1e6c13, #783fad9).
*   **Caching**:
    *   Implemented a 1-hour cache for ACUC (Authentication Check User Credits) results to reduce database lookups (#44bf592).

## 📚 Documentation

*   **New Examples**:
    *   Added an example demonstrating a Groq-powered web crawler (`groq_web_crawler`) (#75ac980, #522f2d2).
    *   Added an example for a GPT-4.5 powered web crawler (`gpt-4.5-web-crawler`) (#06cdd98, #ab8dcab).
    *   Added an example showcasing a Claude 3.7 web crawler (`claude3.7-web-crawler`) (#6508afc, #2da6d7b).
    *   Added an example for using Claude 3.7 for web extraction (`claude3.7-web-extractor`) (#bced299, #72eb360).
    *   Added an example demonstrating a Gemini-based GitHub repository analyzer (`gemini-github-analyzer`) (#448b44c, #9671e68).
*   **Self-Hosting Guide**:
    *   Updated `SELF_HOST.md` to include information about the `embedding` parameter and configuring external AI providers like Ollama (#25d9bdb, #15489be).
*   **API Documentation**:
    *   Removed an erroneous `required` field definition from the API specification (#42e9221, #1282).

Suggested Filename: `ai-sdk_deep-research-alpha_billing_v1.5.0_to_v1.6.0.md`