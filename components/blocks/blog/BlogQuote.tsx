import { BlogQuoteBlok } from '@/lib/types'

interface BlogQuoteProps {
    blok: BlogQuoteBlok
}

export default function BlogQuote({ blok }: BlogQuoteProps) {
    const bgColorClass = blok.background_color || 'bg-blue-50'

    return (
        <blockquote
            className={`py-8 px-6 md:px-10 ${bgColorClass} border-l-4 border-blue-600 rounded-r-lg my-8`}

        >
            <p className="text-lg md:text-xl text-gray-800 italic mb-4 leading-relaxed">
                "{blok.text}"
            </p>
            {blok.author && (
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">{blok.author}</span>
                    {blok.author_role && (
                        <span className="text-sm text-gray-600">{blok.author_role}</span>
                    )}
                </div>
            )}
        </blockquote>
    )
}
