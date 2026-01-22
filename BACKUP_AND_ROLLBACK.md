# 🛡️ Safety & Backup Procedures

## ⚠️ Context Alert: System at 68% Usage

**Current Situation:**
- Database: Approaching connection limits
- Docker containers: 4 services running (postgres, redis, backend, frontend)
- Code changes: Multiple new features being implemented
- Risk: High - changes could break production

## 📋 Pre-Change Safety Checklist

### Before ANY code change:

- [ ] Run backup script: `./scripts/backup.sh`
- [ ] Verify backup created: Check `backups/` directory
- [ ] Note the timestamp for potential rollback
- [ ] Test backup integrity: Try restoring to verify

### Before major features (like Next.js upgrade):
- [ ] Create feature branch: `git checkout -b feature/name`
- [ ] Run full backup before starting
- [ ] Commit backup state: `git tag -a v-safe-point "description"`
- [ ] Work in feature branch only
- [ ] Test thoroughly before merging
- [ ] Only merge to main after full verification

### Before database changes:
- [ ] Backup database: `docker exec 3d-print-postgres pg_dump ...`
- [ ] Verify SQL dump file created
- [ ] Create migration rollback plan
- [ ] Test migration in development first

## 🔄 Rollback Procedures

### Quick Rollback (for recent changes):

```bash
./scripts/rollback.sh <timestamp>
```

This will:
1. Restore database from SQL backup
2. Extract code from tar.gz backup
3. Git reset to commit hash
4. Restart services
5. Verify all systems operational

### Manual Database Rollback:

```bash
# Restore specific backup
docker exec -i 3d-print-postgres psql -U postgres -d 3d_print_studio < backup.sql

# Or rollback migration
knex migrate:rollback
```

### Code Rollback:

```bash
# Rollback to previous commit
git log --oneline -10  # Find previous commit
git reset --hard <commit-hash>

# Or rollback to tag
git checkout v0.13.0
```

### Git Reset Options:

```bash
# Soft reset (keep changes)
git reset --soft HEAD~1

# Mixed reset (keep staged changes)
git reset --mixed HEAD~1

# Hard reset (discard all changes)
git reset --hard HEAD~1
```

## 🚨 Emergency Procedures

### If database corrupted:

```bash
# Stop all containers
docker compose down

# Remove volumes (CAUTION: deletes data)
docker volume rm 3d-print_postgres_data 3d-print_redis_data

# Start fresh
docker compose up -d

# Restore from last good backup
./scripts/rollback.sh <timestamp>
```

### If application broken:

```bash
# Full system rollback
git reset --hard v0.12.0  # Last known good state

# Rebuild containers
docker compose down
docker compose build --no-cache
docker compose up -d

# Verify all services
curl http://localhost:5000/api/health
curl http://localhost:3000
docker compose ps
```

## 📝 Backup Locations

All backups stored in: `/home/brick/Рабочий стол/3d-print/backups/`

Naming convention:
- `db_backup_YYYYMMDD_HHMMSS.sql`
- `code_backup_YYYYMMDD_HHMMSS.tar.gz`

### 🔍 Verification Steps After Rollback:

1. **Database Check:**
   ```bash
   docker exec 3d-print-postgres psql -U postgres -d 3d_print_studio -c "\dt"
   docker exec 3d-print-postgres psql -U postgres -d 3d_print_studio -c "SELECT COUNT(*) FROM plastics;"
   ```

2. **Backend Health:**
   ```bash
   curl http://localhost:5000/api/health
   curl http://localhost:5000/api/plastics
   ```

3. **Frontend Check:**
   - Open http://localhost:3000
   - Check console for errors
   - Test critical pages: /plastics, /admin, /contact

4. **Redis Cache Check:**
   ```bash
   docker exec 3d-print-redis redis-cli GET "plastics:all"
   docker exec 3d-print-redis KEYS "plastics:*"
   ```

5. **Logs Review:**
   ```bash
   docker compose logs backend | tail -100
   docker compose logs frontend | tail -50
   docker compose logs postgres | tail -50
   docker compose logs redis | tail -50
   ```

## ⚙️ Performance Monitoring

### Check resource usage:
```bash
docker stats 3d-print-postgres
docker stats 3d-print-redis
docker stats 3d-print-backend
docker stats 3d-print-frontend
```

### If CPU/Memory high:
1. Check Redis connection count
2. Review cache TTL settings
3. Check for memory leaks in backend
4. Consider increasing cache invalidation intervals

## 📞 Getting Help

If rollback fails or system is broken:

1. Check this document first
2. Review error messages carefully
3. Check backup files exist
4. Try manual rollback steps above
5. Restart from scratch if needed:
   ```bash
   docker compose down
   docker volume rm $(docker volume ls -q)
   rm -rf backups/*
   docker compose up -d
   ```

## ✅ Safe Development Workflow

### Recommended workflow for major changes:

```bash
# 1. Create safety checkpoint
./scripts/backup.sh
git tag -a v-safe-$(date +%Y%m%d_%H%M%S) "Checkpoint before <feature>"

# 2. Create feature branch
git checkout -b feature/<name>

# 3. Work and commit frequently
git add .
git commit -m "progress: <message>"

# 4. Test in development
npm run dev  # or run local tests
curl http://localhost:5000/api/health

# 5. Merge only when verified
# Create PR for review
# After merge: delete feature branch
git checkout main
git pull origin main
```

## 🔒 Security Best Practices

### Database:
- Never drop tables in production without migration
- Always test migrations locally first
- Use transactions for multi-step operations
- Implement proper indexing strategy
- Set appropriate connection pool limits

### Redis:
- Set reasonable TTL values (not too short/long)
- Monitor memory usage
- Implement cache invalidation strategy
- Don't cache sensitive data

### Application:
- Validate all inputs
- Use environment variables for secrets
- Never commit sensitive data
- Implement rate limiting on auth endpoints
- Keep backups fresh and tested

## 📞 Contact & Support

If emergency and automated systems fail:

1. Manual rollback procedures are documented above
2. Backup files are preserved until next successful state
3. Git history contains all commits for rollback reference
4. All services can be independently restarted

---

**Remember: Always create a backup before making changes!**
