# Mushroom Finder App

A web application for mushroom hunting in Washington state.

## Project Goals

- Provide a full-stack app (frontend + backend) in this repository.
- Allow users to sign up and log in with username and password.
- Let users add comments for mushroom hunting spots.
- Help users find popular edible mushrooms with filters:
  - season
  - forest type
  - national parks or public areas
- Provide a morel (Morchella) feature using historical wildfire data.
- Recommend hunting spots with safety-first guidance.

## Scope Decisions (Agreed)

- Launch region: Washington only
- Location precision: approximate pins/zones (not exact hotspots)
- Language: English
- Delivery strategy: phased launch from core functionality to advanced capabilities
- Legal recommendation:
  - P0: no legal recommendation engine
  - P1: add legal status and source-backed guidance

## Recommended Stack

- Frontend + Backend: Next.js (single codebase)
- Database + Auth: Supabase
- Hosting: Vercel
- Maps: Leaflet + OpenStreetMap tiles
- Payments: Stripe Payment Link for donation support in P0

## Data Strategy

Primary backend storage: Supabase Postgres

Planned data domains:
- users and profiles
- spots and comments
- mushroom catalog (top 5-10 edible in Washington)
- wildfire-derived morel candidate areas
- source metadata and last-updated timestamps

## P0 Plan (Launch-Critical)

1. Initialize project foundation
   - Next.js app setup
   - Supabase project setup
   - environment variables and deployment configuration
2. Implement authentication
   - signup/login/logout
   - username + password account flow
3. Create core database schema
   - users/profiles
   - spots
   - comments
   - mushrooms
4. Build spot and comment features
   - authenticated users can create/view comments
5. Add mushroom discovery data
   - include top 5-10 edible mushrooms in Washington
6. Implement filters
   - season
   - forest type
   - public area type
7. Build map-based discovery
   - display approximate pins/zones
8. Add morel wildfire feature
   - ingest wildfire history data
   - surface likely morel areas
9. Add safety and transparency
   - disclaimers
   - source links
   - last-updated indicators
10. Add donations
   - Stripe Payment Link button
11. Run end-to-end smoke testing
   - auth, comments, filters, map, donation flow

## P1 Plan (Post-Launch)

1. Legal recommendation layer
   - classify area status (allowed/restricted/unknown)
   - include source links and confidence notes
2. Monthly automatic morel data refresh
   - scheduled wildfire refresh (once per month)
   - validation checks
   - retry once on failure
   - failure alerts
   - keep a manual refresh fallback
3. Moderation tools
   - report comments/spots
   - admin review workflow
4. Recommendation quality improvements
   - ranking based on seasonality, wildfire recency, habitat, popularity
5. Performance and reliability upgrades
   - query indexing
   - API response caching
   - add Redis only if needed by traffic
6. Mobile-readiness path
   - keep backend APIs stable and reusable
   - prepare future React Native client

## Platform and Operations Notes

- Infrastructure can start on standard managed tiers and scale with usage.
- For expected early growth (~1000 users), monitor map/data traffic and database usage as primary scaling drivers.
- A custom domain is optional during internal testing and recommended for production deployment.

## Safety Notes

- Mushroom identification can be dangerous.
- The app should always display safety disclaimers.
- Users should verify local regulations and mushroom identification before harvesting or consuming.

## Current Status

Planning and scope definition complete.
Implementation starts next.
