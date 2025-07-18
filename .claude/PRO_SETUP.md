# PrismUI Pro Setup Guide

## Overview
This document outlines the setup process for PrismUI Pro - a premium version of the PrismUI component library with additional features, components, and documentation behind a paywall.

## Architecture Decisions

### 1. Project Structure
- All pro-related code is stored under `/src/*/pro/` directories
- This ensures complete separation from the open-source codebase
- The `.gitignore` file excludes all pro directories from the public repository

### 2. Technology Stack
- **Authentication**: Better Auth (already added to package.json)
- **Database**: Prisma ORM (already added to package.json)
- **Payments**: Stripe (to be configured)
- **Hosting**: Separate domain at pro.prismui.tech (not wildcard)

### 3. Domain Setup (Option 1 - Separate Domain)
We're using a separate domain approach instead of wildcard domains:
- Add `pro.prismui.tech` as a regular domain in Vercel
- No complex middleware routing needed
- Easier to manage separate deployments
- Pro routes will be accessed directly at pro.prismui.tech/docs, pro.prismui.tech/components, etc.

### 4. Directory Structure
```
/src
  /app
    /pro                    # Pro version app routes
      /(docs)              # Pro documentation (copied from regular docs)
      /(auth)              # Authentication pages (login, signup, etc.)
      /api                 # Pro-specific API routes
  /lib
    /pro                   # All pro library code
      /auth               # Authentication logic
      /payments           # Payment processing (Stripe)
      /db                 # Database models and utilities
  /components
    /pro                  # Pro-only components
  /registry
    /pro                  # Pro component registry
```

## Phase 1: Project Structure & Isolation ✅

### Completed:
1. **Updated .gitignore** to consolidate pro exclusions:
   - Removed redundant entries for `/src/lib/payments/` and `/src/lib/auth/premium/`
   - Consolidated all pro code under `/src/lib/pro/`
   - Removed separate config file exclusions (now under pro directories)

2. **Copied documentation structure**:
   - Copied `/src/app/(docs)` → `/src/app/pro/(docs)`
   - Updated layout component name to `ProDocsLayout`

3. **Created pro directory structure**:
   - `/src/app/pro/` - Main pro app directory
   - `/src/lib/pro/` - Pro library code
   - `/src/lib/pro/auth/` - Authentication logic
   - `/src/lib/pro/payments/` - Payment processing
   - `/src/lib/pro/db/` - Database related code
   - `/src/components/pro/` - Pro-only components
   - `/src/registry/pro/` - Pro component registry

## Next Phases

### Phase 2: Authentication Setup (Better Auth)
- Configure Better Auth with email/password and OAuth providers
- Create authentication pages (login, signup, forgot password)
- Implement auth middleware for route protection

### Phase 3: Database Setup (Prisma)
- Define database schema for users, subscriptions, and payments
- Set up database connections
- Create database utilities

### Phase 4: Payment Integration
- Configure Stripe for subscription management
- Implement webhook handlers
- Create paywall components

### Phase 5: Pro Content Migration
- Enhance pro documentation with exclusive content
- Create pro-only components
- Set up pro component registry

### Phase 6: Environment Configuration
- Set up environment variables for pro version
- Configure pro.prismui.tech domain in Vercel
- Update build and deployment scripts

## Vercel Deployment Setup
1. In Vercel project settings, go to "Domains" tab
2. Add `pro.prismui.tech` as a domain
3. Configure DNS records to point to Vercel
4. The pro routes at `/src/app/pro/*` will be accessible at `pro.prismui.tech/*`

## Environment Variables Required
- `DATABASE_URL` - Prisma database connection
- `BETTER_AUTH_SECRET` - Authentication secret
- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `NEXT_PUBLIC_APP_URL` - Pro app URL (pro.prismui.tech)
- `NEXT_PUBLIC_IS_PRO` - Flag to identify pro version

## Development Workflow
1. All pro development happens in `/src/*/pro/` directories
2. Pro code is automatically excluded from git
3. Use `.env.pro.local` for pro-specific environment variables
4. Access pro routes locally at `localhost:3000/pro/*`
5. In production, these will be at `pro.prismui.tech/*`