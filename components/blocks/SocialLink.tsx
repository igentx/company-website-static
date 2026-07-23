
/**
 * Social Link component - Individual social media link
 */
interface SocialLinkProps {
  blok: {
    _uid: string
    component: 'social_links'
    flatform: ('github' | 'twitter' | 'linkedin' | 'facebook' | 'instagram')[] // Note: this is 'flatform' not 'platform' in Storyblok
    url: string
    [key: string]: unknown
  }
}

export default function SocialLink({ blok }: SocialLinkProps) {
  const platform = Array.isArray(blok.flatform) ? blok.flatform[0] : blok.flatform || 'github'

  return (
    <a
      href={blok.url}
      className="text-gray-300 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"

    >
      <span className="sr-only">{platform}</span>
      {/* Icon will be handled by parent component */}
    </a>
  )
}
