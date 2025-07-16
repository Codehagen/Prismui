# PrismUI Pro Setup Guide

This guide explains how to set up the pro version of PrismUI while keeping the sensitive components excluded from the open source repository.

## Directory Structure

The pro version uses the following directory structure (all excluded from git):

```
src/
├── app/
│   └── (pro)/              # Pro app routes
│       ├── layout.tsx      # Pro layout (placeholder)
│       └── pro/            # Pro pages
├── components/
│   └── pro/               # Pro components (placeholder)
├── lib/
│   ├── pro/               # Pro utilities (excluded)
│   ├── payments/          # Payment integration (excluded)
│   └── auth/
│       └── premium/       # Premium auth logic (excluded)
└── registry/
    └── pro/               # Pro component registry (excluded)
```

## Environment Configuration

### Public Environment Variables (.env.example)
- `PRO_ENABLED=false` - Toggle pro features
- Standard Next.js and database configs

### Pro Environment Variables (.env.pro - excluded from git)
- Stripe configuration
- Premium authentication secrets
- Pro-specific database connections

## Subdomain Routing

The middleware.ts handles routing for pro.prismui.tech:
- Rewrites pro.prismui.tech requests to `/pro/*` routes
- Main site (prismui.tech) remains unchanged
- Single codebase serves both versions

## Deployment Strategy

### Development
1. Set `PRO_ENABLED=true` in local environment
2. Create actual pro components in excluded directories
3. Test both subdomains locally

### Production
1. Use different environment configs for pro vs open source
2. Deploy same codebase with different environment variables
3. Pro features only activate when `PRO_ENABLED=true`

## Security Considerations

### Git Exclusions
All sensitive pro content is excluded via .gitignore:
- Pro components and pages
- Payment integration code
- Premium authentication logic
- Pro environment variables
- Pro build artifacts

### Access Control
- Pro routes check `PRO_ENABLED` environment variable
- Redirect to main site if pro features disabled
- Authentication middleware for premium features

## Getting Started

1. Copy .env.example to .env.pro
2. Set PRO_ENABLED=true in .env.pro
3. Add your pro-specific environment variables
4. Create actual components in the excluded directories
5. Replace placeholder components with real implementations

## Important Notes

- Never commit pro-specific code to the open source repository
- Use separate deployment configs for pro vs open source
- Test thoroughly with both PRO_ENABLED=true and false
- Consider using feature flags for gradual rollout