# 🔥 mendableai/firecrawl Changelog: v1.6.0 → v1.7.0 (2025-04-03)

This release introduces the Deep Research Alpha feature, enabling structured data extraction with custom prompts and schema support (Zod/Pydantic). Key additions include the `maxDiscoveryDepth` parameter for crawls, Claude 3.7 model support, and making URLs optional in the `/extract` endpoint. Numerous improvements enhance rate limiting, concurrency notifications, SDK error handling, and bug fixes address issues in crawl duration, sitemap handling, map filtering, and LLM extraction schemas.

## 📈 New Features

*   **Deep Research (`/v1/deep-research`)**:
    *   Introduce Deep Research Alpha for advanced, structured data extraction and analysis.
    *   Add support for structured outputs using Zod (JS) and Pydantic (Python) schemas (#1365, a50dc10).
    *   Allow custom `analysis_prompt` for tailored research insights (#1351, e97a279).
    *   Update JS and Python SDKs to support custom analysis prompts (#4fc5e6f).
*   **Crawl API (`/v1/crawl`)**:
    *   Add `maxDiscoveryDepth` parameter to limit the depth of link discovery during crawls (#1329, 7cf2e52).
*   **Extract API (`/v1/extract`)**:
    *   Make the `urls` parameter optional, allowing extraction solely based on provided `html` or `markdown` content (#1346, 20c93db, f1206e4).
*   **Scrape API (`/v1/scrape`)**:
    *   Introduce a new `diff` transformer to compare HTML content between scrapes (#1405, 24f5199).
    *   Add `all: true` parameter to the `pageOptions.actions.click` action, enabling interaction with all elements matching the selector (#1342, d0b468e).
    *   Return results from JavaScript execution (`page.evaluate`) within the browser context when using the Fire Engine scraper (#1385, 46048bc).
    *   Add a `concurrencyLimited` warning field to the scrape result if the job was affected by concurrency limits (#1348, 200de9e).
*   **LLM Support**:
    *   Add support for Anthropic's Claude 3.7 models (#1336, db3faf8).

## 🔧 Improvements

*   **Rate Limiting & Concurrency**:
    *   Implement multiple enhancements and adjustments to rate limiting logic for better performance and concurrent browser management (#1331, 9edbdc9, d438b23, 1e6b484, d54af97, 3e0d3db, 867e545, e8f27be, 2b39788, e799cf2, b3b6348, 8c1579d).
*   **Notifications**:
    *   Refine notification logic for concurrency limits, adding conditional notifications based on team subscription status and distinguishing between scrape/crawl job types (#1398, #1404, #1409, 58e587d, 7468464, b900f34, 426151c).
*   **SDKs**:
    *   Add handling for `403 Forbidden` HTTP errors in SDK error handlers (#1357, 6d3c639).
    *   Update JS SDK to correctly handle the new `jsReturnValues` field from scrape results (#1385, 46048bc).
*   **Search**:
    *   Remove default categories in SearXNG integration, allowing usage of engines without specifying categories (#1319, c53df86).
*   **HTML Extraction**:
    *   Force inclusion of `<main>` tags containing specific `swoogo` classes during content extraction to improve compatibility with certain site structures (2e2c3d5).
*   **Logging & Error Handling**:
    *   Provide more descriptive log messages for errors related to high resource usage (da6b750).
    *   Enhance logging within the `/v1/scrape` endpoint to better diagnose potential issues (611c2d9).
    *   Adjust some internal error logs to `warn` level (c6cad94).
*   **Internal**:
    *   Perform multiple updates and fixes to the internal ACUC (Account Credit Unit Controller) system (0c457e6, 6dc5b1c, 0bdaa97, 5e35782, e0a3c54).
    *   Refactor Tally integration API switchover (#1328, 71b6b83).
    *   Adjust internal routing for crawl fetch operations (4f0510e, b9dde3f).
    *   Improve logging for the internal `check-fire-engine` admin tool (42236ef).

## 🐛 Bug Fixes

*   **Crawl API (`/v1/crawl`)**:
    *   Fix an issue that prevented crawls from executing for longer than 24 hours (d12feae).
    *   Resolve a bug where sitemaps could incorrectly add unrelated links (outside the initial domain/prefix scope) to the crawl queue (#1334, c7ae50d).
    *   Correctly adjust the crawl `limit` parameter to match remaining account credits if the requested limit is too high, avoiding job failure (#1350, 670ca84).
    *   Fix internal tracking of crawl origin (FIR-1499, f0e0d3e).
*   **Map API (`/v1/map`)**:
    *   Fix an issue where filtering map results by `path` failed if the path had been indexed (#1333, 134de67).
*   **Search API (`/v1/search`)**:
    *   Prevent errors caused by logging circular JSON structures in search function responses (#1330, e9804d2).
*   **LLM Extract (`llmExtract` transformer)**:
    *   Remove unsupported JSON schema properties (`additionalProperties`, `patternProperties`) that could cause extraction failures (#1335, c3ebfaf).
*   **Scrape API (`/v1/scrape`)**:
    *   Ensure internal diagnostic logs added via (611c2d9) are correctly associated with API queries (bad8224).
*   **JS SDK**:
    *   Fix a Zod type validation issue in the `/extract` method caused by potential Zod version discrepancies (0154e40).
    *   Implement automatic retries (up to 3 times) for job status check calls within the `crawl()` and `batchScrape()` methods if they encounter transient errors (#1343, ca93ba6).
*   **Python SDK**:
    *   Apply general fixes to improve SDK stability (7e7b7e1).

## 🔒 Security

*   **Logging**:
    *   Prevent potentially sensitive BullMQ connection secrets from being logged (f87e117).

## 📚 Documentation

*   **Examples**:
    *   Add example: Claude 3.7 Stock Analyzer (#1336).
    *   Add example: Mistral Small 3.1 Crawler (#1366, 2fb29ee).
    *   Add example: Mistral Small 3.1 Company Researcher (#1369, 6a6199e).
    *   Add example: Deep Research Apartment Finder (#1378, 87539aa).
    *   Add example: Gemini 2.5 Pro Crawler (#1380, 6e8644a, 56d23cc).
    *   Add example: Gemini 2.5 Company Extractor (#1381, be43598, 4965c87).
    *   Add example: DeepSeek V3 Crawler (#1383, da76524, 10ce20e).
    *   Add example: DeepSeek V3 Company Researcher (#1384, 28928f0, 830d15f).