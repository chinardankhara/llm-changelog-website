# 🔥 mendableai/firecrawl Changelog: v1.6.0 → v1.7.0 (2025-04-03)

This release introduces the alpha version of Deep Research with structured output support and custom analysis prompts. It significantly expands LLM support by adding Claude 3.7, Mistral Small 3.1, Gemini 2.5 Pro, and DeepSeek V3. Crawling capabilities are enhanced with a new `maxDiscoveryDepth` parameter, and numerous improvements have been made to scraping, extraction, SDKs, rate limiting, and error handling, alongside several bug fixes.

## 📈 New Features

*   **Deep Research (Alpha)**:
    *   Introduced Alpha v1 featuring structured output generation using Zod (JS) or Pydantic (Python) schemas (#1365, a50dc10)
    *   Added `analysisPrompt` parameter to customize the final analysis step in both the API and SDKs (#1351, e97a279, 4fc5e6f)
*   **Crawl API**:
    *   Added `maxDiscoveryDepth` parameter to limit the depth of link discovery during crawls (#1329, 7cf2e52)
*   **Extract API (`/extract`)**:
    *   Made the `urls` parameter optional, enabling extraction directly from provided `html` or `markdown` content (#1346, 20c93db, f1206e4)
*   **Scrape API (`/scrape`)**:
    *   Added `all: true` option to the `pageOptions.actions.click` action, allowing interaction with *all* elements matching the selector instead of just the first one (#1342, d0b468e)
    *   Return JavaScript execution results (`jsReturns`) when using the Fire Engine scraper (`pageOptions.runJs`) (#1385, 46048bc)
*   **LLM Support**:
    *   Added support for Claude 3.7 models (#1336, db3faf8)
    *   Added examples demonstrating usage with Mistral Small 3.1 (#1366, 2fb29ee, #1369, 6a6199e)
    *   Added examples demonstrating usage with Gemini 2.5 Pro (#1380, 6e8644a, #1381, be43598)
    *   Added examples demonstrating usage with DeepSeek V3 (#1383, da76524, #1384, 28928f0)

## 🔧 Improvements

*   **Rate Limiting & Concurrency**:
    *   Improved internal rate limiting logic, particularly for concurrent browser usage (#1331, 1e6b484)
    *   Implemented email notifications for jobs hitting concurrency limits, conditional on team subscription status (#1398, 73a297d, #1404, 3300c6c, #1409, b57d5f2, 58e587d, 7468464, b900f34, 426151c)
    *   Added a `warning` field to scraped document results when processing was affected by concurrency limits (#1348, 200de9e)
    *   Refined internal rate limit parameters across various tiers and scenarios (9edbdc9, d438b23, d54af97, 3e0d3db, 867e545, e8f27be, 2b39788, e799cf2, b3b6348, 8c1579d)
*   **Scraping & Extraction**:
    *   Enhanced HTML content extraction logic to better handle sites using specific structures (e.g., forcing inclusion of `<main>` tags with Swoogo classes) (2e2c3d5)
    *   Introduced a new `diff` transformer for comparing scrape results (24f5199)
    *   Added more detailed logging during scrape operations to aid debugging (611c2d9)
    *   Improved clarity of log messages for high resource usage errors during scraping (da6b750)
    *   Updated internal ACUC (credit) balance adjustment logic (0c457e6, 6dc5b1c, 0bdaa97, 5e35782, e0a3c54)
*   **Crawling**:
    *   Increased maximum allowed execution time for crawls beyond the previous 24-hour limit (d12feae)
*   **SDKs**:
    *   Implemented automatic retries (up to 3 times) for status check calls (`crawlStatus`, `batchScrapeStatus`) in the JS SDK if an initial error occurs (#1343, ca93ba6)
    *   Enhanced SDK error handlers to properly manage `403 Forbidden` responses (#1357, 6d3c639)
*   **Search**:
    *   Removed default category filtering in SearXNG integration, allowing broader engine usage without needing explicit category overrides (#1319, c53df86)
*   **Billing**:
    *   Adjusted credit check logic: if a requested crawl limit slightly exceeds available credits, it now snaps to the available amount instead of failing the job (#1350, 670ca84)
*   **Internal**:
    *   Completed Tally API switchover for internal metrics (#1328, 71b6b83)
    *   Improved logging for internal Fire Engine health checks (42236ef)
    *   Changed severity of some internal error logs to warnings where appropriate (c6cad94)

## 🐛 Bug Fixes

*   **Crawl**:
    *   Fixed an issue where sitemaps containing links outside the initial domain/scope could incorrectly add unrelated URLs to the crawl queue (#1334, c7ae50d)
    *   Corrected tracking of crawl origin for internal analytics (f0e0d3e)
*   **Map API (`/map`)**:
    *   Resolved a bug where filtering map results by `path` failed if the path data was indexed (#1333, 134de67)
*   **LLM Extract**:
    *   Removed unsupported properties (`additionalProperties`, `patternProperties`) from generated JSON schemas sent to LLMs, preventing potential extraction failures (#1335, c3ebfaf)
*   **Search API (`/search`)**:
    *   Fixed an error handler that could fail due to circular JSON structures when logging certain response objects (#1330, e9804d2)
*   **JS SDK**:
    *   Resolved a Zod type validation error in the `/extract` function helper caused by potential discrepancies in Zod versions between the SDK and user projects (0154e40)
*   **Python SDK**:
    *   Addressed minor internal issues within the Python SDK (7e7b7e1)
*   **Logging**:
    *   Ensured logs generated during scrape operations are correctly associated with and visible in API query results (bad8224)

## 🔒 Security

*   Prevented potentially sensitive BullMQ connection secrets from being logged (f87e117)

## 📚 Documentation

*   Added new examples showcasing various LLM integrations and features:
    *   Claude 3.7 Stock Analyzer (#1336)
    *   Mistral Small 3.1 Crawler (#1366)
    *   Mistral Small 3.1 Company Researcher (#1369)
    *   Deep Research Apartment Finder (#1378)
    *   Gemini 2.5 Pro Crawler (#1380)
    *   Gemini 2.5 Company Extractor (#1381)
    *   DeepSeek V3 Crawler (#1383)
    *   DeepSeek V3 Company Researcher (#1384)