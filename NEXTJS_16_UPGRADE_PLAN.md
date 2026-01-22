# Next.js 16 Upgrade Plan — Safety First!

## 🎯 Objective
Upgrade Next.js 14.2.18 → 16 with React 18 → 19
Install dependencies and test thoroughly in feature branch before merging to main

## 📋 Phase 1: Preparation

### 1.1 Create Safety Checkpoint
```bash
git tag -a v0.14.0-pre "Checkpoint before Next.js 16 upgrade"
git push origin v0.14.0-pre
```

### 1.2 Create Feature Branch
```bash
git checkout -b feature/nextjs-16-upgrade
```

### 1.3 Full Backup
```bash
./scripts/backup.sh
```
- Verify backup created in `backups/`

## 📋 Phase 2: Dependency Updates

### 2.1 Frontend Dependencies
```bash
cd frontend
npm install next@latest react@latest react-dom@latest
npm install @types/react@latest @types/react-dom@latest
```

### 2.2 Backend Dependencies
```bash
cd backend
npm install express@latest
```

### 2.3 Update package.json
Frontend will be updated automatically
Backend: update "express": "^5.0.0"

## 📋 Phase 3: Breaking Changes Migration

### 3.1 async params migration
Files to check and update:

1. **frontend/src/app/plastics/[id]/page.tsx**
   - Change: `const { id } = await params;`
   - To: `const { id } = await params;`
   
2. **frontend/src/app/quiz/page.tsx**
   - Check if uses params
   - Update if needed

3. **frontend/src/app/admin/page.tsx**
   - Check if uses params

4. **frontend/src/app/admin/orders/page.tsx**
   - Check if uses params

5. **frontend/src/app/admin/plastics/page.tsx**
   - Check if uses params

### 3.2 Next.js configuration updates
Update `frontend/next.config.ts`:
```ts
const nextConfig = {
  reactStrictMode: true,
}
```

### 3.3 Next.js Image config
Update `frontend/next.config.ts` for Next.js 16:
```ts
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}
```

## 📋 Phase 4: Testing

### 4.1 Health Check
```bash
# Test frontend
cd frontend
npm run dev
# Open http://localhost:3000
# Check console for errors

# Test backend
cd backend
npm run dev
# Test health endpoint
curl http://localhost:5000/api/health

# Test critical pages
curl http://localhost:3000/plastics
curl http://localhost:3000/admin
```

### 4.2 Cache Verification
```bash
# Check Redis is connected
docker exec 3d-print-redis redis-cli ping

# Test cache is working
curl -H "X-Cache-Debug: test" http://localhost:5000/api/plastics
curl http://localhost:5000/api/plastics
# Second request should be cache HIT
```

### 4.3 Performance Testing
```bash
# Check response times
curl -w "@/time_namelookup,%{time_total}\n" -o /dev/stderr http://localhost:5000/api/plastics

# Before: ~500ms
# After upgrade: Should be <50ms (from cache)
```

## 📋 Phase 5: Rollback Planning

### If upgrade fails:
```bash
# Quick rollback
git checkout main
git checkout v0.14.0-pre

# Or rollback to backup
./scripts/rollback.sh v0.14.0-pre
```

## 📋 Phase 6: Merge

### 6.1 Merge to Main
```bash
# Only after full verification
git checkout main
git merge feature/nextjs-16-upgrade --no-ff

# Create post-upgrade tag
git tag -a v0.16.0 -m "Next.js 16 upgrade complete - React 19, Turbopack enabled"
git push origin v0.16.0
```

## 📋 Phase 7: Post-Merge Actions

### 7.1 Cleanup
```bash
# Remove pre-upgrade tag (optional)
git tag -d v0.14.0-pre
git push origin --delete v0.14.0-pre

# Delete feature branch
git branch -d feature/nextjs-16-upgrade
git push origin --delete feature/nextjs-16-upgrade
```

### 7.2 Deployment
```bash
# Test production build
cd frontend
npm run build
npm run start

# Or update deployment (Vercel/Railway)
```

## 🚨 Known Issues & Solutions

### Issue 1: Turbopack build times
**Symptom**: Initial builds may be slow
**Solution**: Enable `turbopack` in `next.config.ts`:
```ts
module.exports = {
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src',
      },
    },
  },
}
```

### Issue 2: React 19 Server Components
**Symptom**: Server Components changes may break existing code
**Solution**: Use `'use client'` directive where needed

### Issue 3: Cache compatibility
**Symptom**: Redis cache may not work with React 19 Server Components
**Solution**: Test thoroughly in dev mode, adjust cache TTL if needed

## ✅ Success Criteria

Upgrade is successful when:
- [ ] All pages load without errors
- [ ] Console shows no red errors
- [ ] `/api/health` returns `{"status":"ok"}`
- [ ] `/api/plastics` returns cached data (fast)
- [ ] Redis shows HIT in response headers
- [ ] All admin pages accessible
- [ ] Backend logs show "Redis connected"
- [ ] Frontend build completes successfully
- [ ] Response time <100ms for cached requests

## 📊 Performance Goals

- Target: <50ms response time for cached endpoints
- Current: ~500ms (before caching, no upgrade)
- After upgrade + caching: <100ms (5x improvement)

## 🎯 Final Notes

1. Next.js 16 brings Turbopack (5-10x faster builds)
2. React 19 includes Server Components and new hooks
3. Migration requires updating async params
4. Test everything in feature branch before merging
5. Use safety checkpoints for quick rollback
6. Monitor Redis memory usage (target: <100MB per service)
7. Verify database indexes are optimal

**Estimated Time: 4-6 hours for complete upgrade and testing**

---

**Remember: Safety First! Always backup before major changes.**
