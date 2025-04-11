# 🔥 mendableai/firecrawl Changelog: v1.5.0 → v1.6.0 (2025-03-07)

This release introduces significant enhancements, including the migration to the AI-SDK for broader model support (Ollama, OpenAI-compatible APIs) and improved extraction capabilities. Deep Research functionality enters alpha with new controls and callbacks. Self-hosting is enhanced with Valkey support and configuration options, while performance is boosted through Supabase read replica routing for authentication and crawling. Numerous bug fixes address issues in scraping, crawling, extraction, and billing.

## 📈 New Features

*   **AI & Extraction:**
    *   Migrated core LLM extraction logic to the Vercel AI SDK, enabling broader model compatibility (#1220)
    *   Added support for Ollama models in extraction workflows (#1220)
    *   Enabled self-hosted instances to use any OpenAI-compatible API for extraction and AI features (#1245)
*   **Deep Research (Alpha):**
    *   Introduced alpha version of Deep Research feature (#289e351, #22d4f0d)
    *   Added `maxUrls` and `maxSources` parameters for controlling research scope (#289e351)
    *   Implemented `onSource` callback in SDKs for real-time source discovery updates (#22d4f0d)
*   **Billing:**
    *   Implemented a new batch billing system for improved efficiency and accuracy (#b72e21a, #9ad9478)
*   **SDKs (JS/Python):**
    *   Added support for the new Deep Research feature and its parameters/callbacks (#22d4f0d)
    *   Introduced `regexOnFullURL` option for more flexible crawl path matching (#e1cfe1d)
*   **Examples:**
    *   Added example: Claude 3.7 Web Crawler (#1257)
    *   Added example: Claude 3.7 Web Extractor (#1291)
    *   Added example: Gemini GitHub Analyzer (#1229)
    *   Added example: GPT-4.5 Web Crawler (#1276)
    *   Added example: Groq Web Crawler (#1267)

## 🔧 Improvements

*   **Self-Hosting:**
    *   Added option to use Valkey (Redis fork) as the cache/queue backend via `docker-compose.yaml` (#1228)
    *   Allowed configuration of the internal API port using the `INTERNAL_PORT` environment variable (#82adf81)
    *   Enabled passing Ollama-related environment variables (`OLLAMA_API_BASE_URL`, `OLLAMA_MODEL`) through `docker-compose.yaml` (#1269)
    *   Optimized Dockerfile build process for better dependency management and smaller image size (#1231, #1232)
*   **Crawling:**
    *   Enhanced `includes`/`excludes` logic: correctly handles patterns, drops initial non-matching scrapes, and adds `regexOnFullURL` option for SDKs (#e1cfe1d, #16c3057)
    *   Improved handling of cross-origin redirects during crawls (#1279)
    *   Aligned `crawl-status-ws` (WebSocket) behavior to ignore certain errors, matching the standard `/v1/crawl-status` endpoint (#1234)
    *   Improved `maxUrls` handling in crawl jobs and ensured `llmstxt` cache respects this limit (#5a18869)
    *   Increased the default URL limit for the `/v1/map` endpoint to 30,000 (#1d3757b)
*   **Billing & Usage:**
    *   Refined credit billing logic and added comprehensive billing tests (#9ad9478, #1de5a2c)
*   **Internal & API:**
    *   Improved logging details for background jobs like crawling and indexing (#1263)
    *   Enhanced rate limiting mechanisms (#6c51ef4, #72d894c, #1ced546)
    *   Updated internal website blocklist (#ae010a7)

## 🐛 Bug Fixes

*   **Scraping:**
    *   Significantly improved character set detection by checking both `<meta>` tags and `Content-Type` headers, fixing decoding issues for various websites (#1221, #7bf04d4)
    *   Increased timeouts for stealth proxy operations to prevent premature failures on slow sites (Mentioned in #1221 context)
*   **Crawling:**
    *   Fixed issue where providing empty `includes` or `excludes` arrays caused crawl jobs to fail (#1223)
    *   Corrected crawler checks for certain strings, likely improving ad/tracker avoidance (#c22c87a)
*   **Extraction & AI:**
    *   Resolved errors related to token limits during the LLM extraction process (#1236)
    *   Fixed parsing issues when AI models return JSON responses wrapped in markdown code blocks (e.g., ```json ... ```) (#1280)
    *   Corrected an issue where the `systemPrompt` was missing from extraction parameters (#8cfc946)
*   **Self-Hosting:**
    *   Forced Docker container host binding to `0.0.0.0` to resolve environment variable precedence conflicts (#1225)
    *   Ensured SearXNG parameters (`SEARXNG_BASE_URL`) are correctly passed in the Docker Compose setup (#51bc775)
*   **Billing:**
    *   Fixed incorrect team checks within the credit billing logic (#7b05512)
*   **Authentication & Usage:**
    *   Addressed caching problems related to Active User Count (ACUC) checks (#44bf592)
*   **SDKs:**
    *   Fixed the JS SDK build process in CI to ensure it's correctly built before publishing (#856ec37)
    *   Addressed various minor issues in the JS SDK (#39b6113)
*   **API & Internal:**
    *   Temporarily disabled the `/crawlPreview` endpoint due to instability (#e6c3f20)
    *   Fixed handling of preview tokens (#1305)

## 🚀 Performance

*   Implemented Supabase read replica routing for database queries related to authentication (ACUC) and crawl status checks, reducing load on the primary database (#904e69b, #67ee266, #8620bf3, #a1e6c13)

## 📚 Documentation

*   Removed an erroneous `required` field definition from the API documentation (#1282)
*   Updated `SELF_HOST.md` to include information about the `EMBEDDING_MODEL_PROVIDER` parameter and the option to use Valkey (#25d9bdb, #bfe6a0a)

Suggested Filename: `ai-sdk_deep-research_perf_v1.5.0_to_v1.6.0.md`