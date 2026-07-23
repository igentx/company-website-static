# 🗂️ Cache Management Best Practices

> Comprehensive guide for managing Next.js caches in your Storyblok application

## 📋 Cache Types Overview

| Cache Type              | Location            | Contains                                       | Cleared When                                |
| ----------------------- | ------------------- | ---------------------------------------------- | ------------------------------------------- |
| **Build Cache**         | `.next/` directory  | Compiled pages, static assets, build artifacts | `npm run build` or manual deletion          |
| **Runtime Cache (ISR)** | Server memory + CDN | Rendered pages with `revalidate` settings      | Via `revalidatePath()` or `revalidateTag()` |
| **Data Cache**          | Server memory       | API responses, database queries                | Via cache tags or manual invalidation       |

## 🎯 Best Practices

### Development Environment

```bash
# Clear all caches and restart
rm -rf .next
npm run dev

# Or use Next.js clean command
npx next clean
```

### Production Environment

- ✅ **Automatic**: Use webhooks to trigger revalidation
- ✅ **Manual**: Use revalidation API endpoints
- ✅ **Emergency**: Clear CDN cache if using Vercel/Netlify

## 🔧 Cache Management Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "dev:clean": "rm -rf .next && npm run dev",
    "build:clean": "rm -rf .next && npm run build",
    "cache:clear": "rm -rf .next",
    "revalidate:all": "curl -X GET 'http://localhost:3000/api/revalidate?global=header'"
  }
}
```

### Manual Cache Clearing Commands

```bash
# Clear build cache only
rm -rf .next

# Clear node_modules cache (if needed)
rm -rf node_modules package-lock.json
npm install

# Nuclear option - clear everything
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## 🚨 When to Clear Cache

### Always Clear When:

| Scenario                                            | Priority | Action                           |
| --------------------------------------------------- | -------- | -------------------------------- |
| ✅ **Content changes not reflecting** after webhook | High     | Try webhook revalidation first   |
| ✅ **Build errors** or strange behavior             | High     | Clear `.next` folder             |
| ✅ **Deploying new code** to production             | High     | Full rebuild recommended         |
| ✅ **Changing environment variables**               | Medium   | Restart development server       |
| ✅ **Updating dependencies**                        | Medium   | Clear `node_modules` and rebuild |

### Cache Clearing Priority:

1. **First**: Try webhook revalidation
2. **Second**: Manual revalidation API
3. **Third**: Clear `.next` folder
4. **Last Resort**: Full rebuild

## 🔄 Revalidation Strategies

### Automatic (Recommended)

- ✅ Set up Storyblok webhooks
- ✅ Use `revalidatePath()` and `revalidateTag()`
- ✅ Configure proper cache tags

### Manual Testing Commands

```bash
# Revalidate specific page
curl -X GET 'http://localhost:3000/api/revalidate?path=/about'

# Revalidate global blocks
curl -X GET 'http://localhost:3000/api/revalidate?global=header'
curl -X GET 'http://localhost:3000/api/revalidate?global=footer'

# Revalidate all (if implemented)
curl -X GET 'http://localhost:3000/api/revalidate?all=true'
```

## 📊 Cache Monitoring

### Check Cache Status

```bash
# Check if .next exists
ls -la .next/

# Check build output
npm run build

# Monitor revalidation logs
tail -f logs/revalidation.log
```

### Debug Cache Issues

```bash
# Enable verbose logging
DEBUG=next:* npm run dev

# Check webhook delivery
# (Check Storyblok webhook logs)

# Test revalidation manually
curl -v -X POST 'http://localhost:3000/api/revalidate' \
  -H 'Content-Type: application/json' \
  -d '{"story": {"name": "header", "parent_id": 0}}'
```

## ⚡ Performance Considerations

### Cache Duration Guidelines

| Content Type        | Recommended Duration    | Reason                                         |
| ------------------- | ----------------------- | ---------------------------------------------- |
| **Static pages**    | 1 hour (3600s)          | Good balance between performance and freshness |
| **Dynamic content** | 5-15 minutes (300-900s) | More frequent updates needed                   |
| **Global blocks**   | 1 hour (3600s)          | Change less frequently                         |

### Cache Size Management

- **Development**: Clear `.next` regularly
- **Production**: Monitor cache size and performance
- **CDN**: Use appropriate TTL settings

## 🛠️ Troubleshooting

### Content Not Updating

| Step | Action                              | Expected Result                         |
| ---- | ----------------------------------- | --------------------------------------- |
| 1    | Check webhook delivery in Storyblok | Webhook should show successful delivery |
| 2    | Test manual revalidation            | Content should update immediately       |
| 3    | Clear `.next` folder                | Fresh build should resolve issues       |
| 4    | Check cache tags in code            | Verify tags are properly configured     |

### Build Issues

| Step | Action                      | Expected Result                  |
| ---- | --------------------------- | -------------------------------- |
| 1    | Clear `.next` folder        | Remove corrupted build artifacts |
| 2    | Clear `node_modules`        | Remove dependency conflicts      |
| 3    | Reinstall dependencies      | Fresh dependency installation    |
| 4    | Check for TypeScript errors | Resolve type issues              |

### Performance Issues

| Step | Action                          | Expected Result                  |
| ---- | ------------------------------- | -------------------------------- |
| 1    | Check cache hit rates           | Monitor cache effectiveness      |
| 2    | Optimize revalidation frequency | Balance freshness vs performance |
| 3    | Use appropriate cache durations | Match content update patterns    |
| 4    | Monitor memory usage            | Ensure efficient resource usage  |

## 📈 Monitoring & Analytics

### Key Metrics to Track

- **Cache Hit Rate**: Percentage of requests served from cache
- **Revalidation Frequency**: How often content is updated
- **Build Time**: Time taken for cache rebuilds
- **Memory Usage**: Server memory consumption

### Recommended Tools

- **Vercel Analytics**: Built-in performance monitoring
- **New Relic**: Advanced application monitoring
- **DataDog**: Infrastructure and application monitoring
- **Custom Logging**: Application-specific metrics

---

## 🎯 Quick Reference

### Emergency Cache Clear

```bash
# Nuclear option - clear everything
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Development Cache Reset

```bash
# Quick development reset
rm -rf .next
npm run dev
```

### Production Cache Management

```bash
# Manual revalidation
curl -X GET 'https://your-domain.com/api/revalidate?global=header'

# Check cache status
curl -I https://your-domain.com/
```

> **Pro Tip**: Always test cache clearing in development before applying to production!
