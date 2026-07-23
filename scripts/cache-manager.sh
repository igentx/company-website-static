#!/bin/bash

# Cache Management Utility for Next.js Storyblok App
# Usage: ./scripts/cache-manager.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to clear build cache
clear_build_cache() {
    print_status "Clearing Next.js build cache..."
    if [ -d ".next" ]; then
        rm -rf .next
        print_success "Build cache cleared"
    else
        print_warning "No .next directory found"
    fi
}

# Function to clear all caches
clear_all_caches() {
    print_status "Clearing all caches..."
    clear_build_cache
    
    if [ -d "node_modules" ]; then
        print_status "Clearing node_modules..."
        rm -rf node_modules
        print_success "node_modules cleared"
    fi
    
    if [ -f "package-lock.json" ]; then
        print_status "Clearing package-lock.json..."
        rm -f package-lock.json
        print_success "package-lock.json cleared"
    fi
    
    print_status "Reinstalling dependencies..."
    npm install
    print_success "Dependencies reinstalled"
}

# Function to revalidate cache via API
revalidate_cache() {
    local endpoint=${1:-"all"}
    local port=${2:-"3000"}
    
    print_status "Revalidating cache via API..."
    
    case $endpoint in
        "header")
            curl -s -X GET "http://localhost:$port/api/revalidate?global=header" || print_error "Failed to revalidate header"
            ;;
        "footer")
            curl -s -X GET "http://localhost:$port/api/revalidate?global=footer" || print_error "Failed to revalidate footer"
            ;;
        "all")
            curl -s -X GET "http://localhost:$port/api/revalidate?global=header" || print_error "Failed to revalidate header"
            curl -s -X GET "http://localhost:$port/api/revalidate?global=footer" || print_error "Failed to revalidate footer"
            ;;
        *)
            print_error "Unknown revalidation endpoint: $endpoint"
            exit 1
            ;;
    esac
    
    print_success "Cache revalidated for: $endpoint"
}

# Function to show cache status
show_cache_status() {
    print_status "Cache Status:"
    echo ""
    
    if [ -d ".next" ]; then
        echo -e "  ${GREEN}✓${NC} Build cache (.next) exists"
        echo "    Size: $(du -sh .next 2>/dev/null | cut -f1 || echo 'Unknown')"
    else
        echo -e "  ${RED}✗${NC} Build cache (.next) not found"
    fi
    
    if [ -d "node_modules" ]; then
        echo -e "  ${GREEN}✓${NC} Dependencies (node_modules) exist"
        echo "    Size: $(du -sh node_modules 2>/dev/null | cut -f1 || echo 'Unknown')"
    else
        echo -e "  ${RED}✗${NC} Dependencies (node_modules) not found"
    fi
    
    echo ""
    print_status "Available cache management commands:"
    echo "  clear-build    - Clear only .next folder"
    echo "  clear-all      - Clear all caches and reinstall"
    echo "  revalidate     - Revalidate via API (header|footer|all)"
    echo "  status         - Show current cache status"
}

# Main script logic
case "${1:-status}" in
    "clear-build")
        clear_build_cache
        ;;
    "clear-all")
        clear_all_caches
        ;;
    "revalidate")
        revalidate_cache "${2:-all}" "${3:-3000}"
        ;;
    "status")
        show_cache_status
        ;;
    "help"|"-h"|"--help")
        echo "Cache Management Utility for Next.js Storyblok App"
        echo ""
        echo "Usage: $0 [command] [options]"
        echo ""
        echo "Commands:"
        echo "  clear-build              Clear only .next folder"
        echo "  clear-all                Clear all caches and reinstall dependencies"
        echo "  revalidate [type] [port] Revalidate cache via API"
        echo "                          Types: header, footer, all (default: all)"
        echo "                          Port: server port (default: 3000)"
        echo "  status                   Show current cache status (default)"
        echo "  help                     Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 clear-build"
        echo "  $0 revalidate header"
        echo "  $0 revalidate all 3001"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
