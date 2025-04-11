# 🔥 firecrawl Changelog: v1.5.0 → v1.6.0 (2025-03-07)

This release introduces the alpha version of the Deep Research API, enabling more complex research tasks. It significantly enhances flexibility by migrating to the Vercel AI SDK, adding support for Ollama and any OpenAI-compatible API for self-hosting. Performance is boosted through Supabase read replica integration, and numerous improvements and fixes have been made to crawling, extraction, billing, and the developer SDKs.

## 📈 New Features

*   **Deep Research API (Alpha)**:
    *   Introduced the initial alpha version of the Deep Research API for complex, multi-step research tasks (#1271, #1284)
    *   Added options for `maxUrls` and `sources` (#1271)
    *   Implemented status endpoint (`/v1/deep-research-status`) with activity/source callbacks (#1284, aa54fd1)
*   **AI & LLM Integration**:
    *   Added support for local LLMs via Ollama through the AI SDK migration (#1220)
    *   Enabled self-hosted instances to use any OpenAI-compatible API endpoint (#1245)
*   **SDKs**:
    *   Added `regexOnFullURL` option to the JS SDK crawl parameters for more flexible URL matching (#1303)

## 🔧 Improvements

*   **Core & Extraction**:
    *   Migrated core LLM interactions to the Vercel AI SDK for better maintainability and broader model support (#1220)
    *   Abstracted model adapters for easier integration of future LLM providers (#1220)
    *   Removed `zod-to-json-schema` dependency (#1220)
*   **Crawling**:
    *   Improved handling of `includes` and `excludes` parameters, including ignoring empty arrays and dropping initial scrapes if excluded (#1223, #1303)
    *   Enhanced handling of cross-origin redirects during crawls (#1279)
    *   Truncate `llmstxt` cache based on `maxUrls` limit and improve `maxUrls` handling logic (#1285)
    *   Increased the default limit for the `map` endpoint to 30,000 URLs (1d3757b)
    *   Updated the crawl status WebSocket endpoint (`/v1/crawl-status-ws`) behavior to ignore errors similarly to the standard `/v1/crawl-status` endpoint (#1234)
*   **Self-Hosting**:
    *   Added option to use Valkey as an alternative to Redis in `docker-compose.yaml` (#1228)
    *   Allowed configuration of the internal API port via environment variables (82adf81)
    *   Enabled passing Ollama environment variables directly into the Docker Compose setup (#1269)
    *   Optimized Dockerfile build stages (#1231, #1232)
*   **Billing**:
    *   Implemented a new batch billing system for improved efficiency (#1264, b72e21a)
    *   Added comprehensive billing tests and related fixes (#1283)
*   **API & Services**:
    *   Enhanced job logging for better traceability (#1263)
    *   Updated rate limiting logic (6c51ef4, 72d894c, 1ced546)
    *   Improved scraper blocklist (ae010a7)

## 🐛 Bug Fixes

*   **Scraping**:
    *   Improved character set detection by discovering charset from HTTP headers and refining the meta tag parsing regex (#1221, #7bf04d4)
    *   Allowed more time for stealth proxy operations during scraping (fix(snips/scrape))
*   **Extraction**:
    *   Resolved issues related to token limits during the extraction process (#1236)
    *   Fixed handling of AI responses that return JSON within a markdown code block (#1280)
    *   Ensured the `systemPrompt` is correctly included when passed in extract parameters (8cfc946)
*   **Crawling**:
    *   Fixed `crawl-redis` to correctly ignore empty `includes`/`excludes` arrays (#1223)
    *   Improved detection of certain tracking pixels/strings (c22c87a)
*   **Self-Hosting**:
    *   Forced Docker container host binding to `0.0.0.0` to prevent environment variable precedence issues (#1225)
    *   Correctly passed SearXNG parameters in the `docker-compose.yaml` file (51bc775)
*   **SDKs**:
    *   Fixed JS SDK build process for reliable publishing (856ec37)
    *   Addressed various minor issues in the JS SDK (39b6113)
*   **Billing**:
    *   Corrected team membership checks in credit-based billing logic (7b05512)
*   **Authentication**:
    *   Fixed issues related to preview token validation and usage (#1305)
*   **API**:
    *   Temporarily disabled the `/v0/crawlPreview` endpoint due to instability (e6c3f20)

## 🚀 Performance

*   **Database**:
    *   Implemented Supabase read replica routing to distribute read load and improve performance for various operations (#1274, 904e69b, 783fad9)
    *   Migrated crawl status checks and related read operations to use the read replica (a1e6c13)
*   **Authentication**:
    *   Optimized Active User Count (ACUC) checks by utilizing read replicas and implementing caching (#44bf592, #67ee266, #8620bf3)

## 📚 Documentation & Examples

*   **New Examples**:
    *   Added example: Claude 3.7 web crawler (#1257)
    *   Added example: Claude 3.7 web extractor (#1291)
    *   Added example: GPT-4.5 web crawler (#1276)
    *   Added example: Groq web crawler (#1267)
    *   Added example: Gemini GitHub analyzer (#1229)
*   **Documentation Updates**:
    *   Updated `SELF_HOST.md` with details on embedding parameters and configuring OpenAI-compatible API endpoints (#1220, #1245)
    *   Removed an erroneous `required` field from API documentation (#1282)