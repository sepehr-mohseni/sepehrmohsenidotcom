#!/bin/sh
set -e

echo "🚀 Starting Portfolio Application..."

# Run database migrations
echo "📦 Running database migrations..."
npx prisma db push --skip-generate 2>/dev/null || echo "⚠️  Migration skipped (already up to date)"

echo "✅ Database ready"
echo "🌐 Starting server on port ${PORT:-3000}..."

# Execute the main command
exec "$@"
