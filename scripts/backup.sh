#!/bin/bash

set -e

echo "🔒 Creating backup and preparing safe rollback..."

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/brick/Рабочий стол/3d-print/backups"

mkdir -p "$BACKUP_DIR"

DB_BACKUP="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
docker exec 3d-print-postgres pg_dump -U postgres -d 3d_print_studio > "$DB_BACKUP" 2>/dev/null

CODE_BACKUP="$BACKUP_DIR/code_backup_$TIMESTAMP.tar.gz"
tar -czf "$CODE_BACKUP" \
  frontend/src \
  backend/src \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='dist' \
  2>/dev/null

echo "✅ Backup completed:"
echo "  📄 Database: $DB_BACKUP"
echo "  💾 Code: $CODE_BACKUP"
echo "  📍 Location: $BACKUP_DIR"
echo ""
echo "🔄 To rollback: ./scripts/rollback.sh $TIMESTAMP"
