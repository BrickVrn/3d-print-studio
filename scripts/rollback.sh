#!/bin/bash

set -e

TIMESTAMP=$1
COMMIT_HASH=$2

echo "🔄 Rolling back to safe state..."
echo "📍 Git commit: $COMMIT_HASH"
echo "📅 Timestamp: $TIMESTAMP"

DB_BACKUP="/home/brick/Рабочий стол/3d-print/backups/db_backup_$TIMESTAMP.sql"

echo "🔄 Restoring database from backup..."
docker exec -i 3d-print-postgres psql -U postgres -d 3d_print_studio < "$DB_BACKUP" 2>/dev/null

if [ $? -eq 0 ]; then
  echo "✅ Database restored successfully"
else
  echo "❌ Database restore failed"
  exit 1
fi

CODE_BACKUP="/home/brick/Рабочий стол/3d-print/backups/code_backup_$TIMESTAMP.tar.gz"

echo "🔄 Restoring code from backup..."
cd "/home/brick/Рабочий стол/3d-print"
tar -xzf "$CODE_BACKUP" 2>/dev/null

if [ $? -eq 0 ]; then
  echo "✅ Code restored successfully"
else
  echo "❌ Code restore failed"
  exit 1
fi

echo "🔒 Rolling back Git to previous safe commit..."
git reset --hard "$COMMIT_HASH"

if [ $? -eq 0 ]; then
  echo "✅ Rollback completed - system is now in safe state"
else
  echo "❌ Git rollback failed"
  exit 1
fi

echo ""
echo "✅ Rollback summary:"
echo "   - Database restored to state from $TIMESTAMP"
echo "   - Code restored to state from $TIMESTAMP"
echo "   - Git reset to commit $COMMIT_HASH"
echo ""
echo "📋 Post-rollback checklist:"
echo "   1. Verify database connection"
echo "   2. Test backend endpoints (curl http://localhost:5000/api/health)"
echo "   3. Test frontend (open http://localhost:3000)"
echo "   4. Check logs: docker compose logs backend frontend"
echo "   5. If all OK - proceed with next steps"
echo "   6. If issues - use: ./scripts/backup.sh to create new backup"
