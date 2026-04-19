import type { CaseStudy } from "@/content/case-studies";

/**
 * Visitor & Employee Management System — full-stack platform with
 * FastAPI + React + MySQL, QR check-ins, JWT auth, RBAC, audit trails.
 * Production-ready v1.0.0 (Dec 2025).
 */
export const vems: CaseStudy = {
  slug: "vems",
  title: "Visitor & Employee Management System",
  subtitle:
    "A production-ready platform for visitor logging, QR-code check-ins, real-time attendance, salary computation, audit trails, and role-based access. FastAPI + React + MySQL, deployed as a single unified app.",
  role: "Team project, full-stack platform",
  yearRange: "2025",
  stack: [
    "FastAPI 0.104",
    "Uvicorn",
    "React 18 + Vite",
    "MySQL 8",
    "JWT (PyJWT)",
    "qrcode / html5-qrcode",
    "openpyxl",
  ],

  problem:
    "Facility access at most organizations is a ledger-and-badge mess. Paper visitor logs, spreadsheet attendance, manual salary calculations, no audit trail when something goes wrong. We wanted a single platform that handles the full workflow end to end. Register visitors with identity validation. Issue temporary QR codes. Scan employees in and out. Calculate salary from real hours. Log every action for compliance.",

  whatIBuilt: [
    "A FastAPI backend with a layered architecture. Ten API route handlers atop nine service modules, each with a single responsibility. The API layer is pure routing. The service layer holds business logic (visitor state, QR lifecycle, attendance flags, salary math, audit logging). The database layer enforces parameterized queries across 13 relational tables in MySQL 8.",
    "QR-based workflows power both sides of the platform. Visitors get temporary 24-hour codes emailed on registration. Employees get permanent codes at onboarding. The React frontend uses html5-qrcode for scanning at gates and qrcode.react for display. Scans verify the code, stamp attendance, and flag arrivals after the 9:10 AM threshold.",
    "Salary computation is a pure function of scanned hours times hourly rate, date-range filtered, and exported to Excel via openpyxl on demand. Security is layered. JWT auth with 24-hour expiry. SHA-256 password hashing. CNIC validation by regex. Role-based access (Admin, Security) gates every protected endpoint. Every user action lands in an AccessLogs table filterable by date range and action type.",
  ],

  diagram: {
    svgId: "vems-arch",
    alt: "Layered architecture: React frontend calls FastAPI routing layer, which calls service-layer modules, which call the parameterized MySQL database layer.",
    caption:
      "Layered backend: 10 API routes, 9 service modules, parameterized MySQL (13 tables).",
  },

  decisions: [
    {
      decision: "JWT + role-based access control, not session cookies",
      alternative: "Server-side sessions with CSRF tokens",
      why: "A single-page React frontend plus a stateless API server favors JWTs stored client-side. RBAC on the server restricts admin-only routes (user management, employee CRUD, site setup) from security-role accounts, which can only scan and log events. 24-hour token expiry bounds the blast radius if a token leaks.",
    },
    {
      decision: "Temporary 24-hour QR codes for visitors, permanent for staff",
      alternative: "One QR-code policy for everyone",
      why: "Visitor codes should auto-expire so a pass issued today doesn't open the door next month. Employee codes are tied to employment and re-issued only on rotation. Separate lifecycles map to how the physical process actually works.",
    },
    {
      decision: "Server-side late-arrival detection at a fixed threshold",
      alternative: "Flag everything manually at month-end",
      why: "Late detection at 9:10 AM runs in the scan endpoint, so attendance rows carry a boolean flag the moment they're written. The alert management interface and any downstream salary adjustment read a single, canonical field.",
    },
    {
      decision: "Parameterized SQL everywhere, no ORM",
      alternative: "SQLAlchemy ORM",
      why: "With 13 tables and straightforward relations, an ORM's abstraction tax wasn't worth the cost. Parameterized queries in the database layer cover injection risk, and the SQL stays auditable from the service code to the table.",
    },
    {
      decision: "Single-port unified deploy",
      alternative: "Separate API and frontend hosts",
      why: "Frontend builds to static assets that FastAPI serves on port 8000 alongside the API. One process, no CORS config, and the FastAPI Swagger UI at /docs ships as live API documentation for every operator who needs to debug.",
    },
  ],

  outcomes: [
    {
      label: "Database tables",
      value: "13",
      note: "Users, roles, visitors, visits, employees, departments, sites, QR codes, audit logs",
    },
    {
      label: "API routes",
      value: "10",
      note: "Across 9 service modules",
    },
    {
      label: "Version",
      value: "v1.0.0",
      note: "Production-ready, released Dec 2025",
    },
    {
      label: "Data export",
      value: "Excel · openpyxl",
      note: "Salary sheets + filterable audit logs",
    },
  ],

  links: [
    {
      label: "Source on GitHub",
      href: "https://github.com/Asim-Shoaib/Visitor-Management-System",
      icon: "github",
    },
  ],
};
