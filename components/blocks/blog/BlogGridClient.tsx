'use client'

import { BlogCardBlok } from '@/lib/types'
import BlogCard from './BlogCard'
import { getBlogGridColumnClass, normalizeBlogCategories } from '@/lib/blog-utils'
import { useMemo, useState } from 'react'

interface BlogGridClientProps {
  blogs: BlogCardBlok[]
  columns?: number | string
  showFilters?: boolean
  filterCategories?: string | string[]
}

export default function BlogGridClient({
  blogs,
  columns,
  showFilters = false,
  filterCategories,
}: BlogGridClientProps) {
  const categories = normalizeBlogCategories(filterCategories)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredBlogs = useMemo(() => {
    if (!showFilters || activeCategory === 'All') return blogs
    return blogs.filter((blog) => blog.category === activeCategory)
  }, [activeCategory, blogs, showFilters])

  const columnClass = getBlogGridColumnClass(columns)

  return (
    <>
      {showFilters && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filteredBlogs.length > 0 ? (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${columnClass} gap-8`}>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._uid} blok={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No articles in this category yet.</p>
        </div>
      )}
    </>
  )
}
