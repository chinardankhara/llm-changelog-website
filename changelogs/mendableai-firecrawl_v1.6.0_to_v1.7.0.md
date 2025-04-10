# 🔥 mendableai/firecrawl Changelog: v1.6.0 → v1.7.0 (2025-04-04)

This release introduces the Alpha version of the Deep Research feature, enabling structured data extraction and customizable analysis prompts. Key additions include the `maxDiscoveryDepth` parameter for crawls and making URLs optional in the `/extract` endpoint. Numerous improvements enhance rate limiting, notifications, SDK functionality, and overall stability, alongside several important bug fixes.

## 📈 New Features

*   **Deep Research (Alpha)**:
    *   Introduce Deep Research Alpha v1, enabling structured outputs using Zod/Pydantic schemas and custom analysis prompts via the `/v1/deep-research` endpoint and SDKs (#1365, #1351, #4fc5e6f).
*   **Crawl API (`/crawl`)**:
    *   Add `maxDiscoveryDepth` parameter to control the maximum depth the crawler follows links from the initial URLs (#1329).
*   **Extract API (`/extract`)**:
    *   Make the `urls` parameter optional, allowing extraction directly from provided `html` or `markdown` content without needing a URL (#1346, #20c93db).
*   **Scrape API (`/scrape`)**:
    *   Add `all: true` option to the `pageOptions.actions.click` parameter, allowing interaction with *all* elements matching the selector instead of just the first (#1342).
    *   Return results from JavaScript executed via `pageOptions.runJs` back in the scrape response (#1385).
    *   Introduce a `diff` transformer (`extractorOptions.mode: 'diff'`) to compare scraped content against a previous version (#1405).
*   **LLM Support**:
    *   Add support for Claude 3.7 models in relevant features (#1336).

## 🔧 Improvements

*   **Rate Limiting & Concurrency**:
    *   Refine rate-limiting logic, particularly for concurrent browser usage across different subscription tiers (#1331, #9edbdc9, #d438b23, #d54af97, #3e0d3db, #867e545).
    *   Enhance the notification system for concurrency limits, providing clearer messages based on job type (scrape/crawl) and subscription status (#1398, #1404, #1409).
    *   Add a `concurrencyLimited` warning field to scrape results if the job was impacted by concurrency limits (#1348).
*   **SDKs (JS & Python)**:
    *   Update SDKs to support new features: optional `urls` in extract, custom Deep Research prompts, and receiving JS return values from scrape (#1346, #1351, #4fc5e6f, #1385).
    *   Improve SDK error handling to specifically manage `403 Forbidden` responses (#1357).
*   **Logging & Error Handling**:
    *   Improve clarity of log messages for errors related to high resource usage during scraping (#da6b750).
    *   Increase logging detail within scrape operations to better diagnose issues (#611c2d9).
*   **HTML Extraction**:
    *   Improve content extraction reliability for specific website structures (e.g., Swoogo event pages) by forcing inclusion of certain tags (#2e2c3d5).
*   **Search**:
    *   Remove default categories in SearXNG integration, allowing users to specify engines without conflicting defaults (#1319).

## 🐛 Bug Fixes

*   **Crawl**:
    *   Prevent sitemaps from incorrectly adding unrelated links ("poisoning") to the crawl queue (#1334).
    *   Fix issue preventing crawl jobs from running longer than 24 hours (#d12feae).
    *   Ensure the origin of crawl jobs is tracked correctly within the API (#f0e0d3e).
    *   Adjust crawl limit behavior to automatically cap the `crawlerOptions.limit` at the user's remaining credits if the requested limit is too high, preventing an error (#1350).
*   **Scrape**:
    *   Ensure logs generated during scrape operations are correctly associated with and visible in API queries (#bad8224).
*   **Extract**:
    *   Resolve issues with LLM extraction (`llmExtract`) caused by unsupported JSON schema properties (#1335).
*   **Search**:
    *   Fix potential circular JSON structure errors during error handling within the search function (#1330).
*   **Map API (`/map`)**:
    *   Correct an issue where map jobs failed to filter results by path correctly if the path was indexed (#1333).
*   **JS SDK**:
    *   Fix Zod type validation errors in the `extract` method arising from potential Zod version discrepancies (#0154e40).
    *   Implement automatic retries (up to 3 times) for status check calls (`crawl` and `batchScrape`) if they initially return an error (#1343).
*   **Python SDK**:
    *   Address minor inconsistencies and issues within the Python SDK (#7e7b7e1).

## 🔒 Security

*   Prevent potentially sensitive BullMQ connection secrets from being logged (#f87e117).

## 📚 Documentation

*   Add numerous examples showcasing integration with various LLMs (Claude 3.7, Mistral Small 3.1, Gemini 2.5 Pro, DeepSeek V3) for crawling, extraction, and deep research (#1336, #1366, #1369, #1380, #1381, #1383, #1384).
*   Include a comprehensive example demonstrating the Deep Research feature for an "Apartment Finder" application (#1378).