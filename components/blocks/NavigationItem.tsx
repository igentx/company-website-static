
/**
 * Navigation Item component - Individual navigation link
 */
interface NavigationItemProps {
  blok: {
    _uid: string
    component: 'navigation_items'
    label: string
    link: {
      url?: string
      linktype?: string
      cached_url?: string
    }
    children?: NavigationItemProps['blok'][]
    [key: string]: unknown
  }
}

export default function NavigationItem({ blok }: NavigationItemProps) {
  const url = blok.link?.url || blok.link?.cached_url || '#'
  return (
    <a
      href={url}
      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"

    >
      {blok.label}
    </a>
  )
}
