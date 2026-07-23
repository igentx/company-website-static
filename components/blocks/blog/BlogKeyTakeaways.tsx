import { BlogKeyTakeawaysBlok } from '@/lib/types'

interface BlogKeyTakeawaysProps {
  blok: BlogKeyTakeawaysBlok
}

function normalizeItems(items: string[] | string | undefined): string[] {
  if (Array.isArray(items)) return items.filter(Boolean)
  if (typeof items === 'string') {
    return items
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

export default function BlogKeyTakeaways({ blok }: BlogKeyTakeawaysProps) {
  const items = normalizeItems(blok.items)
  if (!items.length) return null

  return (
    <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {blok.title || 'Key takeaways'}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
