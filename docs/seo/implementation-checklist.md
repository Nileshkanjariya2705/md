# Magnovaa Technology — SEO Implementation Checklist

**Target Domain**: `https://magnovaa.com`  
**Execution Date**: October 18, 2026  
**Auditor & Implementer**: Senior Technical SEO Engineer & Next.js Systems Architect  

---

## 1. Completed Implementation Tasks

### A. Technical Infrastructure & Crawlability
- [x] **Verified Production Canonical Origin**: Standardized `https://magnovaa.com` across `metadataBase`, `robots.ts`, `sitemap.ts`, OpenGraph, Twitter, and Schema.org.
- [x] **Eliminated Legacy Domain Leakage**: Removed 100% of residual occurrences of `mogovaa.com` across the repository.
- [x] **Updated Legacy Brand Terminology**: Replaced all instances of "MD" in customer quotes, hero subtitle, FAQs, and why-choose sections with "Magnovaa".
- [x] **Server-Level 301 Permanent Redirects**: Added 301 permanent redirect rules in `next.config.ts` for `/careers`, `/project`, `/service`, `/client-review`, and `/client-reviews`.
- [x] **XML Sitemap Dynamic Generation**: Configured `src/app/sitemap.ts` to dynamically include all static marketing routes, legal policies, and published dynamic case study URLs with granular change frequencies and priorities.
- [x] **Robots.txt Directives**: Configured `src/app/robots.ts` to allow indexing of public routes while shielding `/admin/`, `/mitali`, and `/dharmesh`.

### B. Header & UI Branding Enhancements
- [x] **Header Logo Prominence**: Increased logo height from `h-8 sm:h-9 md:h-10` to `h-10 sm:h-12 md:h-13 lg:h-14` with `w-auto object-contain shrink-0` and high-DPI attributes (`width={240} height={85}`).
- [x] **Footer & Admin Logo Consistency**: Balanced logo dimensions and branding in `footer.tsx`, `admin-sidebar.tsx`, and `admin/login/page.tsx`.

### C. On-Page Hierarchy & Headings
- [x] **Component Level H1 Support**: Updated `SectionHeading` (`src/components/layout/section-heading.tsx`) to support `as?: 'h1' | 'h2'` prop.
- [x] **Portfolio Landing (`/projects`) H1**: Added semantic `as="h1"` to the hero section.
- [x] **Team Landing (`/team`) H1**: Added semantic `as="h1"` to the hero section.
- [x] **Careers Landing (`/career`) H1**: Added semantic `as="h1"` to the hero section.
- [x] **Client Reviews Landing (`/reviews`) H1**: Added semantic `as="h1"` to the hero section.
- [x] **Contact Landing (`/contact`) H1**: Added semantic `as="h1"` to the hero section.

### D. Metadata & Title Optimization
- [x] **Homepage Title & OpenGraph**: Configured `title.absolute` to eliminate template redundancy and added explicit canonical URL.
- [x] **Services Page Title Correction**: Removed `| Magnovaa Technology` suffix to prevent title template duplication.
- [x] **Team Page Title Correction**: Removed suffix to prevent double branding.
- [x] **Careers Page Title Correction**: Removed suffix to prevent double branding.
- [x] **Reviews Page Title Correction**: Removed suffix to prevent double branding.
- [x] **Self-Referential Canonicals**: Added explicit `alternates: { canonical: ... }` to every public page.

### E. Structured Data (Schema.org JSON-LD)
- [x] **Root Organization Schema**: Validated name, alternateName, url, logo, description, sameAs, and contactPoint.
- [x] **Root WebSite Schema**: Implemented `WebSite` schema inside `@graph` with publisher linking.
- [x] **Homepage FAQPage Schema**: Integrated `<FAQSection />` on the homepage and injected `FAQPage` schema.
- [x] **Services Schema**: Injected `Service` schema with `OfferCatalog` on `/services`.
- [x] **Dynamic Case Study Schema**: Injected `TechArticle` schema on `/projects/[slug]`.
- [x] **BreadcrumbList Schema**: Injected `BreadcrumbList` on all primary landing pages and dynamic case study routes.

### F. Legal & Trust Assets (E-E-A-T)
- [x] **Privacy Policy (`/privacy`)**: Implemented complete Privacy Policy page with canonical tag and breadcrumbs.
- [x] **Terms of Service (`/terms`)**: Implemented complete Terms of Service page with canonical tag and breadcrumbs.
- [x] **Footer Crawlable Links**: Replaced dead `<span>` tags in footer with crawlable `<Link>` components to `/privacy` and `/terms`.

### G. Image Optimization & Accessibility
- [x] **Enriched Team Member Photo Alts**: Included full name, role, and organization.
- [x] **Enriched Client Review Avatar Alts**: Included client name, title, and corporate organization.
- [x] **Enriched Project Card Alts**: Included case study title, technology category, and company attribution.
- [x] **LCP Preloading**: Preserved `priority` on above-the-fold case study and logo images.

---

## 2. Tasks Blocked by Missing External Access

- [ ] **Google Search Console Ownership Verification**: Blocked by need for owner access to DNS provider or Google Search Console console.
- [ ] **Sitemap Submission**: Blocked by Google Search Console account authentication.
- [ ] **Production Host Deployment / Cache Invalidation**: Blocked by access to production deployment pipeline (Vercel, Firebase App Hosting, or AWS).

---

## 3. Recommended Manual Actions for Domain Owner

1. **Verify DNS / Google Search Console**:
   - Navigate to `https://search.google.com/search-console`
   - Add property: `https://magnovaa.com`
   - Add verification TXT record to your DNS host.
2. **Submit Sitemap**:
   - Under Search Console > Sitemaps, submit `sitemap.xml`.
3. **Deploy Repository**:
   - Merge these changes and deploy to your production hosting server.
4. **Monitor Core Web Vitals**:
   - Review 28-day Chrome User Experience Report (CrUX) data inside Search Console once production deployment is live.
