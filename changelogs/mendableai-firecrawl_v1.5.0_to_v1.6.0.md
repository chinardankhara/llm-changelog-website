# 🔥 mendableai/firecrawl Changelog: v1.5.0 → v1.6.0 (2025-03-07)

This release introduces the Alpha version of the Deep Research feature, migrates core AI functionalities to the Vercel AI SDK enabling broader model compatibility (including Ollama and any OpenAI-compatible API), and significantly enhances performance through database read replica utilization. It also includes numerous improvements to crawling logic, self-hosting options, billing systems, and various bug fixes across scraping, extraction, and SDKs.

## 📈 New Features

*   **Deep Research (Alpha)**:
    *   Introduced the initial Alpha release of the Deep Research feature for comprehensive topic analysis (#1271, #1284)
    *   Added `maxUrls` and `sources` parameters for controlling research scope (#1271)
    *   Implemented `onSource` callback in SDKs for real-time source discovery updates (#1284)
*   **AI SDK Integration & Model Support**:
    *   Migrated core LLM extraction logic to the Vercel AI SDK for improved flexibility and maintainability (#1220)
    *   Added support for Ollama models in extraction tasks (#1220)
    *   Enabled self-hosted instances to use any OpenAI-compatible API endpoint for AI tasks (#1245)
*   **New Examples**:
    *   Added Gemini GitHub Analyzer example (#1229)
    *   Added Claude 3.7 Web Crawler example (#1257)
    *   Added Groq Web Crawler example (#1267)
    *   Added GPT-4.5 Web Crawler example (#1276)
    *   Added Claude 3.7 Web Extractor example (#1291)

## 🔧 Improvements

*   **Crawling**:
    *   Improved handling of `includes` and `excludes` parameters, including ignoring empty arrays and better logic for initial scrape checks (#1223, #1303)
    *   Implemented distinct handling for cross-origin vs. same-origin redirects during crawls (#1279)
    *   Enhanced `maxUrls` handling and implemented LLMStxt cache truncation based on this limit (#1285)
    *   Added `regexOnFullURL` option to the JavaScript SDK for more flexible URL matching in crawl parameters (#1303)
    *   Increased the URL limit for the `/map` endpoint to 30,000 (1d3757b)
    *   Aligned `/v1/crawl-status-ws` behavior to ignore errors similarly to the standard `/v1/crawl-status` endpoint (#1234)
*   **Self-Hosting**:
    *   Added experimental support for Valkey (Redis fork) via Docker Compose (#1228)
    *   Allowed configuration of the internal API port through environment variables (82adf81)
    *   Enabled passing Ollama-specific environment variables via Docker Compose for easier integration (#1269)
    *   Optimized Dockerfile build stages for faster and more reliable builds (#1231, #1232)
*   **Billing**:
    *   Implemented a new batch billing system for improved efficiency (#1264, b72e21a)
    *   Added comprehensive billing tests and fixed related minor issues (#1283)
*   **Logging & Monitoring**:
    *   Enhanced job logging details for better traceability (`log_job.ts`) (#1263, 0f05203)
*   **Internal & CI**:
    *   Added an automated evaluation run workflow triggered after production deployments (#1224)

## 🐛 Bug Fixes

*   **Scraping**:
    *   Improved charset detection logic to correctly decode content from pages with non-standard meta tags or headers (#1221, #7bf04d4)
*   **Crawling**:
    *   Fixed issue where empty `includes`/`excludes` arrays were not correctly ignored (#1223)
    *   Enhanced detection and blocking of common ad/tracker pixels and strings (#c22c87a)
*   **Extraction**:
    *   Resolved errors related to token limits during the LLM extraction process (#1236)
    *   Fixed parsing issues when AI models return responses wrapped in JSON code blocks (#1280)
    *   Corrected an issue where the system prompt was missing from extraction parameters (#8cfc946)
*   **Self-Hosting**:
    *   Forced Docker container host to `0.0.0.0` to prevent environment variable precedence issues (#1225)
    *   Ensured SearXNG parameters are correctly passed through in the Docker Compose setup (#51bc775)
*   **SDKs**:
    *   Fixed build issues and addressed functional bugs within the JavaScript SDK (#39b6113, #856ec37)
*   **Billing & Authentication**:
    *   Corrected logic for team checks within the credit billing system (#7b05512)
    *   Resolved authentication issues related to preview tokens (#1305)
    *   Fixed caching behavior for Active Credits Usage Control (ACUC) checks (44bf592)

## 🚀 Performance

*   **Database Read Replicas**:
    *   Implemented Supabase read replica routing to distribute database load and improve scalability (#904e69b, #783fad9)
    *   Migrated core crawling data lookups to utilize read replicas, reducing load on the primary database (a1e6c13)
    *   Optimized authentication and Active Credits Usage Control (ACUC) checks by routing them to read replicas (#67ee266, #8620bf3, #57b3136)
*   **Rate Limiting**:
    *   Refined rate-limiting logic for more consistent behavior (6c51ef4, 72d894c, 1ced546)

## 📚 Documentation

*   Added several new examples showcasing integrations with various AI models and platforms (See New Features)
*   Updated `SELF_HOST.md` with new configuration options (embedding params, internal port, Valkey, OpenAI-compatible APIs)
*   Removed an erroneous `required` field definition from API documentation (#1282)