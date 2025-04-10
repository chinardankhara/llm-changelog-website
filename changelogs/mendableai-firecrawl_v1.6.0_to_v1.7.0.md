# 🔥 firecrawl Changelog: v1.6.0 → v1.7.0 (2025-04-03)

This release introduces the Deep Research Alpha with structured outputs and custom prompts, enhances crawl control with `maxDiscoveryDepth`, and makes the `/extract` endpoint more flexible by allowing optional URLs. It also includes numerous improvements to rate limiting, notifications, SDKs, and bug fixes across crawling, scraping, and extraction.

## 📈 New Features

*   **Deep Research Alpha**:
    *   Introduce Deep Research capabilities for in-depth analysis and structured data generation (#1365, #a50dc10)
    *   Add support for structured outputs using Zod (JS) and Pydantic (Python) schemas (#a50dc10)
    *   Allow users to provide custom analysis prompts for tailored research results (#1351, #e97a279, #4fc5e6f)
    *   Update JS and Python SDKs to support new Deep Research parameters (#4fc5e6f)
*   **Crawl**:
    *   Add `maxDiscoveryDepth` parameter to limit the depth of link discovery during crawls (#1329, #7cf2e52)
*   **Extract API (`/v1/extract`)**:
    *   Make the `urls` parameter optional, allowing extraction based solely on provided `html` or `markdown` content (#1346, #20c93db, #f1206e4)
*   **Scrape**:
    *   Add `all: true` parameter to the `click` page action to enable clicking all matching elements instead of just the first (#1342, #d0b468e)
    *   Return results from JavaScript executed via the `pageOptions.executeJavaScript` parameter (#1385, #46048bc)
    *   Introduce a new `diff` transformer to compare scraped content against a previous version (#1405, #24f5199)
*   **LLM Support**:
    *   Add support for Claude 3.7 models (#1336, #db3faf8)

## 🔧 Improvements

*   **Rate Limiting**:
    *   Refine rate limiting logic for concurrent browser usage and different subscription tiers (#1331, #1e6b484, #9edbdc9, #d438b23, #d54af97, #e8f27be, #2b39788, #e799cf2, #b3b6348, #8c1579d, #3e0d3db, #867e545)
*   **Notifications**:
    *   Implement improved notification system for concurrency limit events, including conditional emails based on subscription status and specific job types (scrape/crawl) (#1398, #73a297d, #1404, #3300c6c, #1409, #b57d5f2, #58e587d, #7468464, #b900f34, #426151c)
    *   Add a warning message to scraped documents when the job was affected by concurrency limits (#1348, #200de9e)
*   **Logging**:
    *   Improve log messages for high resource usage errors to provide more context (#da6b750)
    *   Enhance logging within the scrape process for better debugging (#611c2d9)
    *   Change certain internal error logs to warnings to reduce noise (#c6cad94)
    *   Improve logging for the internal `admin/check-fire-engine` endpoint (#42236ef)
*   **SDKs**:
    *   Add handling for `403 Forbidden` errors in SDK error handlers (#1357, #6d3c639)
    *   Update JS SDK to handle new return format from `scrapeURL` when JavaScript execution results are present (#46048bc)
*   **Search**:
    *   Remove default categories in SearXNG integration to allow flexible engine usage (#1319, #c53df86)
*   **Scrape/HTML Parsing**:
    *   Add specific CSS classes (`swoogo`) to the list of selectors that force inclusion of `<main>` tags during HTML processing (#2e2c3d5)
*   **Internal**:
    *   Update internal ACUC (presumably usage/credit) balance adjustments and tracking logic (#0c457e6, #6dc5b1c, #0bdaa97, #5e35782, #e0a3c54)
    *   Refactor Tally API integration (#1328, #71b6b83)
    *   Add internal `team_id_o` tracking (#4cc33e1)

## 🐛 Bug Fixes

*   **Search**:
    *   Resolve circular JSON structure errors in the search function's error handling by avoiding logging large response objects (#1330, #e9804d2)
*   **JS SDK**:
    *   Fix Zod type checking issues caused by version discrepancies in the `/extract` endpoint handler (#0154e40)
    *   Implement retries (up to 3 times) for crawl and batch scrape status check calls if they initially fail (#1343, #ca93ba6)
*   **Python SDK**:
    *   Address unspecified fixes in the Python SDK (#7e7b7e1)
*   **Crawl**:
    *   Prevent sitemaps from adding unrelated links ("poisoning") to the crawl queue (#1334, #c7ae50d)
    *   Adjust credit checking logic to snap the crawl limit to remaining credits if the requested limit exceeds available credits, instead of erroring out (#1350, #670ca84)
    *   Allow crawl jobs to run for longer than the previous 24-hour limit (#d12feae)
    *   Fix crawl origin tracking logic (#f0e0d3e)
*   **Map**:
    *   Correct an issue where the map feature failed to filter results by path if the site was indexed (#1333, #134de67)
*   **LLM Extract**:
    *   Remove unsupported JSON schema properties (`additionalProperties`, `patternProperties`) that could cause errors during LLM extraction (#1335, #c3ebfaf)
*   **Scrape**:
    *   Ensure logs generated during scrape operations correctly appear in API query results (#bad8224)

## 🔒 Security

*   **Logging**:
    *   Prevent sensitive Bull queue secrets from being logged (#f87e117)

## 📚 Documentation

*   **Examples**:
    *   Add Claude 3.7 Stock Analyzer example (#1336, #db3faf8)
    *   Add Mistral Small 3.1 Crawler example (#1366, #2fb29ee)
    *   Add Mistral Small 3.1 Company Researcher (Extractor) example (#1369, #6a6199e)
    *   Add Deep Research Apartment Finder example (#1378, #87539aa)
    *   Add Gemini 2.5 Pro Crawler example (#1380, #6e8644a)
    *   Add Gemini 2.5 Company Extractor example (#1381, #be43598)
    *   Add DeepSeek v3 Crawler example (#1383, #da76524)
    *   Add DeepSeek v3 Company Researcher (Extractor) example (#1384, #28928f0)