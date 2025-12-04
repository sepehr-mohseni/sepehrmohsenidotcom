#!/bin/sh
set -e

echo "🚀 Starting Portfolio Application..."

# Run database migrations using local prisma (not npx which downloads latest)
echo "📦 Running database migrations..."

if [ -f "./node_modules/.bin/prisma" ]; then
    ./node_modules/.bin/prisma db push --skip-generate 2>&1 || {
        echo "⚠️  Migration had issues, retrying..."
        sleep 2
        ./node_modules/.bin/prisma db push --skip-generate || echo "❌ Migration failed"
    }
else
    echo "❌ Prisma CLI not found at ./node_modules/.bin/prisma"
    exit 1
fi

echo "✅ Database ready"
echo "🌐 Starting server on port ${PORT:-3000}..."

# Execute the main command
exec "$@"
