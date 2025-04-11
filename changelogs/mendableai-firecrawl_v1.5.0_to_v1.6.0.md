# 🔥 mendableai/firecrawl Changelog: v1.5.0 → v1.6.0 (2025-03-07)

This release introduces the alpha version of the Deep Research feature, allowing for more in-depth analysis and source gathering. Significant enhancements include migrating to the AI SDK for improved LLM interactions, adding support for Ollama and generic OpenAI-compatible APIs in self-hosted setups, and introducing several new examples showcasing integrations with models like Claude 3.7, GPT-4.5, and Groq. Additionally, numerous improvements and bug fixes have been implemented across crawling, scraping, extraction, billing, and self-hosting capabilities, alongside performance optimizations using database read replicas.

## 📈 New Features

*   **Deep Research (Alpha)**:
    *   Introduced initial alpha version for deep research capabilities (#289e351, #22d4f0d)
    *   Added configuration for `maxUrls` and `sources` (#289e351)
    *   Implemented `onSource` callback for tracking sources during research (#22d4f0d)
    *   Added unit tests for `deep-research-redis` (`apps/api/src/__tests__/deep-research/unit/deep-research-redis.test.ts`)
*   **AI & Extraction**:
    *   Added support for using any OpenAI-compatible API endpoint in self-hosted environments (#15489be)
    *   Implemented Claude 3.7 web crawler example (`examples/claude3.7-web-crawler`) (#6508afc, #2da6d7b)
    *   Added Claude 3.7 web extractor example (`examples/claude3.7-web-extractor`) (#bced299, #72eb360)
    *   Added GPT-4.5 web crawler example (`examples/gpt-4.5-web-crawler`) (#06cdd98, #ab8dcab)
    *   Added Groq web crawler example (`examples/groq_web_crawler`) (#75ac980, #522f2d2)
    *   Added Gemini GitHub analyzer example (`examples/gemini-github-analyzer`) (#448b44c, #9671e68)
*   **Billing**:
    *   Implemented a new batch billing system for improved efficiency (#b72e21a, `apps/api/src/services/billing/batch_billing.ts`)
    *   Added new endpoint `v1/token-usage` (`apps/api/src/controllers/v1/token-usage.ts`)
*   **JS SDK**:
    *   Added `regexOnFullURL` option for more flexible crawl path matching (#e1cfe1d)

## 🔧 Improvements

*   **AI & Extraction**:
    *   Migrated core extraction logic to use the Vercel AI SDK for better maintainability and model compatibility (#25d9bdb)
    *   Added initial support for Ollama models via the AI SDK (#25d9bdb)
    *   Abstracted model adapters for easier integration of future LLMs (#25d9bdb)
    *   Removed `zod-to-json-schema` dependency (#25d9bdb)
*   **Crawling**:
    *   Improved handling of `includes` and `excludes` patterns, including ignoring empty lists and dropping initial scrapes if excluded (#16c3057, #e1cfe1d)
    *   Enhanced handling of cross-origin redirects compared to same-origin redirects (#e8c698d)
    *   Improved `maxUrls` handling and cache truncation for `llmstxt` generation (#5a18869)
    *   Updated behavior of `/v1/crawl-status-ws` to ignore errors similarly to the standard `/v1/crawl-status` endpoint (#8c42b08)
    *   Updated crawler blocklist (`apps/api/src/scraper/WebScraper/utils/blocklist.ts`) (#ae010a7)
*   **Self-Hosting**:
    *   Allowed configuration of the internal API port via `docker-compose.yaml` (#82adf81)
    *   Added an option to use Valkey instead of Redis in `docker-compose.yaml` (#bfe6a0a, #1228)
    *   Enabled passing Ollama environment variables into the Docker Compose setup (#78334e4)
    *   Optimized Dockerfile build stages and copy operations (#76e1f29)
*   **API & SDKs**:
    *   Updated JS and Python SDKs to reflect API changes, particularly for Deep Research (#39b6113, #22d4f0d)
*   **Billing**:
    *   Refined batch billing logic (`apps/api/src/services/billing/batch_billing.ts`) (#1de5a2c)
    *   Added more comprehensive billing tests (`apps/api/src/__tests__/snips/billing.test.ts`) (#9ad9478)
*   **Internal & CI**:
    *   Added CODEOWNERS file (`.github/CODEOWNERS`) (#115b6b6)
    *   Improved logging in various services like `log_job.ts` (#59d09f5, #0f05203)
    *   Updated rate limiting logic (`apps/api/src/services/rate-limiter.ts`) (#6c51ef4, #72d894c, #1ced546)
    *   Increased map limit to 30k (#1d3757b)

## 🐛 Bug Fixes

*   **Scraping**:
    *   Fixed character set detection by discovering charset from headers/meta tags and re-decoding content if necessary (#283a3bf, #1221)
    *   Improved regex for parsing charset information from meta tags (#7bf04d4, #1265)
    *   Allowed more time for stealth proxy operations during scraping (#fix(snips/scrape): allow more time for stealth proxy)
*   **Extraction**:
    *   Fixed issues related to token limits during extraction (#5ab86b8, #1236)
    *   Correctly handled AI responses that return JSON within a code block (#4f25f12, #1280)
    *   Fixed system prompt parameter being missed in extraction calls (#8cfc946)
*   **Crawling**:
    *   Fixed crawler logic to check for additional strings (potentially related to content filtering or detection) (#c22c87a)
*   **Self-Hosting**:
    *   Forced Docker container host to `0.0.0.0` to resolve environment variable precedence issues (#b88b573, #1225)
    *   Fixed passing of SearXNG parameters in Docker Compose setup (#51bc775)
*   **Billing**:
    *   Corrected team checks in credit billing logic (#7b05512)
    *   Addressed miscellaneous billing issues found during testing (#9ad9478)
*   **Authentication & Authorization**:
    *   Fixed issues related to preview token handling (#60346ec, #1305)
    *   Resolved inconsistencies in load balancing between database instances for authentication checks (#8620bf3, #1beadf3)
*   **JS SDK**:
    *   Addressed unspecified issues in the JS SDK (#39b6113)
*   **Preview Feature**:
    *   Temporarily disabled the preview feature, likely due to instability or bugs (#e6c3f20)

## 🚀 Performance

*   **Database**:
    *   Implemented read replica routing for Supabase connections to distribute read load (#904e69b, #1274)
    *   Moved crawl-related database reads to the read replica (#a1e6c13)
    *   Utilized read replicas for Active Credits / User Counts (ACUC) checks to reduce load on the primary database (#67ee266, #783fad9, #982b3da)
*   **Caching**:
    *   Implemented 1-hour caching for ACUC checks (#44bf592)

## 📚 Documentation

*   **API Docs**:
    *   Removed an undefined `required` field from API documentation (#42e9221)
*   **Self-Hosting**:
    *   Updated `SELF_HOST.md` regarding embedding parameter configuration (#25d9bdb)

Suggested Filename: `deep-research-alpha_ai-sdk_v1.5.0_to_v1.6.0.md`