# 🔥 firecrawl Changelog: v1.6.0 → v1.7.0 (2025-04-03)

This release introduces the alpha version of Deep Research for structured data extraction and analysis, alongside support for new LLMs including Claude 3.7, Gemini 2.5 Pro, Mistral Small 3.1, and DeepSeek V3. Crawl and Scrape APIs gain new capabilities like `maxDiscoveryDepth`, optional URLs for extraction, and improved concurrency handling. Numerous bug fixes and enhancements across APIs, SDKs, and documentation are also included.

## 📈 New Features

*   **Deep Research (Alpha):**
    *   Introduced Deep Research capabilities for advanced analysis and structured data extraction using LLMs. (#1365, #a50dc10)
    *   Added support for defining structured output schemas using Zod (JS SDK) and Pydantic (Python SDK). (#a50dc10)
    *   Enabled custom analysis prompts via the `analysisPrompt` parameter in SDKs and API. (#1351, #010c875, #4fc5e6f)
*   **Crawl API (`/v1/crawl`):**
    *   Added `crawlerOptions.maxDiscoveryDepth` parameter to limit how many links deep the crawler explores beyond the initial URLs/sitemaps. (#1329, #7cf2e52)
*   **Extract API (`/v1/extract`):**
    *   Made the `urls` parameter optional, allowing extraction based solely on provided `pageOptions` (e.g., `html`, `markdown`). (#1346, #20c93db, #f1206e4)
*   **Scrape API (`/v1/scrape`):**
    *   Added `pageOptions.runJs.returnValue` option to return results from executed JavaScript on the page. (#1385, #46048bc)
    *   Added `all: true` parameter to the `click` action (`pageOptions.actions`) to interact with all matching elements instead of just the first. (#1342, #d0b468e)
    *   Introduced a `diff` transformer (`pageOptions.responseFormat: 'diff'`) to compare HTML content changes between scrapes. (#1405, #24f5199)
    *   Added a `concurrencyLimited` warning field to the scrape result if the request was affected by concurrency limits. (#1348, #200de9e)
*   **LLM Support:**
    *   Added support for Anthropic's Claude 3.7 models. (#1336, #db3faf8)
    *   Added support for Google's Gemini 2.5 Pro models. (#1380, #1381, #6e8644a, #be43598)
    *   Added support for Mistral's Small 3.1 models. (#1366, #1369, #2fb29ee, #6a6199e)
    *   Added support for DeepSeek V3 models. (#1383, #1384, #da76524, #28928f0)

## 🔧 Improvements

*   **Rate Limiting & Concurrency:**
    *   Improved rate-limiting logic for concurrent browser usage, especially for different subscription tiers. (#1331, #1e6b484, #9edbdc9, #d438b23, #d54af97, #3e0d3db, #867e545)
    *   Enhanced notification system for concurrency limit events, differentiating between job types (scrape/crawl) and team subscription status for more relevant alerts. (#1398, #1404, #1409, #58e587d, #7468464, #b900f34, #426151c)
*   **HTML Extraction:**
    *   Improved content extraction reliability by forcing inclusion of `<main>` tags for specific site structures (e.g., Swoogo). (#2e2c3d5)
*   **Logging & Error Handling:**
    *   Added more descriptive log messages for high resource usage errors during scraping. (#da6b750)
    *   Enhanced logging within the `/v1/scrape` endpoint for easier debugging of scrape issues. (#611c2d9)
    *   Improved SDK error handling to explicitly manage `403 Forbidden` responses. (#1357, #6d3c639)
    *   Reduced log noise by changing some internal error logs to warnings. (#c6cad94)
*   **Search:**
    *   Removed default categories in SearXNG integration, allowing engine usage without needing to specify categories if undesired. (#1319, #c53df86)

## 🐛 Bug Fixes

*   **JS SDK:**
    *   Fixed Zod type checking issues in the `/extract` endpoint handler caused by potential version discrepancies. (#0154e40)
    *   Implemented automatic retries (up to 3 times) for status check calls (`getCrawlStatus`, `getBatchScrapeStatus`) if they initially return an error. (#1343, #ca93ba6)
    *   Ensured the SDK correctly handles the new `returnValue` field from `scrape` when `pageOptions.runJs` is used. (#1385, #46048bc)
*   **Python SDK:**
    *   Addressed various minor issues and inconsistencies in the Python SDK. (#7e7b7e1)
*   **Crawl API (`/v1/crawl`):**
    *   Fixed an issue where sitemaps containing links outside the main domain could incorrectly add unrelated URLs to the crawl queue. (#1334, #c7ae50d)
    *   Removed the implicit 24-hour execution time limit for crawl jobs. (#d12feae)
    *   Corrected internal crawl origin tracking logic. (#f0e0d3e)
*   **Map API (`/v1/map`):**
    *   Fixed path filtering (`includePaths`, `excludePaths`) which was not working correctly when map data was indexed. (#1333, #134de67)
*   **Search API (`/v1/search`):**
    *   Resolved errors caused by circular JSON structures during error logging by preventing the logging of entire large response objects. (#1330, #e9804d2)
*   **LLM Extraction:**
    *   Removed unsupported JSON schema properties (`additionalProperties`, `patternProperties`) that could cause errors during LLM-based extraction with schemas. (#1335, #c3ebfaf)
*   **Billing & Credits:**
    *   Adjusted credit checking logic (`/v1/checkCredits`) to automatically reduce the crawl `limit` parameter to match remaining credits if it exceeds the available balance, preventing unnecessary errors. (#1350, #670ca84)
*   **Logging:**
    *   Fixed an issue where certain scrape-related logs were not appearing correctly in internal monitoring queries. (#bad8224)

## 🔒 Security

*   Prevented potentially sensitive BullMQ connection secrets from being logged. (#f87e117)

## 📚 Documentation

*   Added several new examples demonstrating integrations with newly supported LLMs and features:
    *   Claude 3.7 Stock Analyzer (#1336)
    *   Deep Research Apartment Finder (#1378, #87539aa)
    *   Mistral Small 3.1 Crawler & Company Researcher (#1366, #1369, #2fb29ee, #6a6199e)
    *   Gemini 2.5 Pro Crawler & Web Extractor (#1380, #1381, #6e8644a, #be43598)
    *   DeepSeek V3 Crawler & Company Researcher (#1383, #1384, #da76524, #28928f0)

## 🚀 Performance

*   Refined rate-limiting mechanisms to better manage concurrent browser sessions and optimize resource allocation based on subscription plans, improving overall stability and throughput. (#1331, #1e6b484, #9edbdc9, #d438b23, #d54af97, #3e0d3db, #867e545)