import { RichText } from '@/lib/blocks'
import { BlogBodyBlok } from '@/lib/types'

interface BlogBodyProps {
    blok: BlogBodyBlok
}

export default function BlogBody({ blok }: BlogBodyProps) {
    const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[blok.alignment || 'left']

    return (
        <div
            className={`py-6 prose prose-lg max-w-none ${alignmentClass}`}

        >
            {blok.content ? (
                typeof blok.content === 'object' && blok.content.type === 'doc' ? (
                    <div className="text-gray-700 leading-relaxed">
                        <RichText doc={blok.content} />
                    </div>
                ) : (
                    <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blok.content as string }}
                    />
                )
            ) : null}
        </div>
    )
}
