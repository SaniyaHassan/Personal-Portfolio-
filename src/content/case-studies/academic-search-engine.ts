import type { CaseStudy } from "@/content/case-studies";

/**
 * Academic Search Engine — NUST DSA course project. Three-tier architecture:
 * Python ingestion, C++17 retrieval backend, React frontend. Built on a
 * custom Trie + inverted index + BM25 ranking, deployed on Azure.
 */
export const academicSearchEngine: CaseStudy = {
  slug: "academic-search-engine",
  title: "Academic Search Engine: Trie-indexed, BM25-ranked",
  subtitle:
    "A from-scratch search engine over 5,000 research papers. Custom Trie for autocomplete, custom inverted index for retrieval, BM25 with title-boost for ranking. Sub-100 ms query latency.",
  role: "Team project, NUST DSA coursework",
  yearRange: "2024 – 2025",
  stack: [
    "C++17",
    "CMake 3.10+",
    "httplib",
    "nlohmann/json",
    "Python (PyMuPDF)",
    "React 19 + Vite",
    "Azure VM",
  ],

  problem:
    "Off-the-shelf search engines hide the DSA that powers them behind black-box APIs. The goal here was to go the other way and build every layer ourselves. Tokenizer, indexer, ranker, server. Every decision in a production retrieval system comes from choices we made, not from an SDK we imported. The corpus is research papers pulled live from OpenAlex; the product is a search UI that returns results in under 100 ms.",

  whatIBuilt: [
    "A three-tier architecture with deliberately strict boundaries. Python handles PDF parsing, data ingestion, and tokenization. A C++17 HTTP server handles search and ranking only. A React 19 frontend built with Vite does UI. Each tier has one job, documented in the repo's ARCHITECTURE.md.",
    "The heart of the backend is three custom structures. A Trie that powers autocomplete in under 50 ms. An inverted index keyed by term to posting list for fast retrieval. A JSON-based lexicon mapping terms to index positions. A forward index alongside stores document content for snippet extraction. Ranking uses BM25 with a title boost so matches in titles outrank matches in body text.",
    "The ingestion pipeline runs four sequential stages. Async PDF download from the OpenAlex API. Document renumbering to contiguous IDs. Parsing and tokenization. Metadata extraction for publication dates, citations, and keywords. The result is a ~500 MB on-disk index over 5,000 papers that the C++ server memory-maps and serves alongside the built React SPA on a single port.",
  ],

  diagram: {
    svgId: "ase-arch",
    alt: "Indexing pipeline. OpenAlex corpus feeds a Python tokenizer, which builds forward and inverted indexes plus a Trie for autocomplete. A C++ HTTP server on port 8080 serves both the API and the React UI.",
    caption:
      "Pipeline: corpus, tokenizer, forward + inverted indexes, Trie autocomplete, all served by a C++ HTTP server.",
  },

  decisions: [
    {
      decision: "Custom Trie over a prefix-hash map",
      alternative: "std::unordered_map<string, vector<string>> of prefixes",
      why: "A real Trie gives autocomplete suggestions in sorted order for free via in-order traversal, and scales memory better as term count grows past a few thousand. The unordered_map approach balloons once prefixes repeat.",
    },
    {
      decision: "Three structures, not one: forward, inverted, lexicon",
      alternative: "Inverted index only",
      why: "Inverted alone answers 'which docs contain this term'. The forward index lets us pull document content for snippets without a second round-trip. The lexicon maps terms to positions without scanning sequentially. Every query touches all three, and the overhead is worth the sub-100 ms latency.",
    },
    {
      decision: "BM25 with title boost as the ranker",
      alternative: "Classic TF-IDF scoring",
      why: "BM25's length normalization and saturation term dominate TF-IDF on academic corpora where abstract length varies wildly. Title-boost captures the human intuition that a matching title is a stronger signal than a matching body paragraph.",
    },
    {
      decision: "Python for ingestion, C++ for serving",
      alternative: "Pure C++ end-to-end",
      why: "Python's PDF and HTTP libraries (PyMuPDF, requests) made ingestion a two-day job. Rewriting them in C++ would have taken two weeks. The cost is one language boundary, acceptable for a once-per-corpus ingest.",
    },
    {
      decision: "Single-port unified deploy",
      alternative: "Separate API and static hosts",
      why: "The build copies the React bundle to backend/static/ and the C++ server serves both the API and the SPA on port 8080. One process, one hostname, zero CORS config. Deployment to the Azure VM becomes a single binary and a static directory.",
    },
  ],

  outcomes: [
    {
      label: "Documents indexed",
      value: "5,000",
      note: "Research papers fetched live from OpenAlex",
    },
    {
      label: "Query latency",
      value: "< 100 ms",
      note: "On most queries, measured on the Azure VM",
    },
    {
      label: "Autocomplete",
      value: "< 50 ms",
      note: "Trie walk on warm memory",
    },
    {
      label: "Index footprint",
      value: "~500 MB",
      note: "Forward + inverted + lexicon, ~200 MB runtime memory",
    },
  ],

  links: [
    {
      label: "Source on GitHub",
      href: "https://github.com/Abdullah2240/DSA-project-search-engine",
      icon: "github",
    },
  ],
};
