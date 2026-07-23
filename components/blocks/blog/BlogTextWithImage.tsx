import { RichText } from '@/lib/blocks'
import { BlogTextWithImageBlok } from '@/lib/types'
import Image from 'next/image'

interface BlogTextWithImageProps {
    blok: BlogTextWithImageBlok
}

export default function BlogTextWithImage({ blok }: BlogTextWithImageProps) {
    // Sanitize and validate background color class
    const bgColorClass = blok.background_color 
        ? String(blok.background_color).trim() 
        : 'bg-gray-50'
    const imagePosition = blok.image_position || 'right'
    const isImageLeft = imagePosition === 'left'

    const layout = isImageLeft
        ? 'flex flex-col lg:flex-row'
        : 'flex flex-col lg:flex-row-reverse'

    return (
        <section
            className={`py-12 px-4 md:px-6 lg:px-8 ${bgColorClass} rounded-lg`}

        >
            <div className={`${layout} gap-8 lg:gap-12 max-w-6xl mx-auto items-center`}>
                {/* Text Content */}
                <div className="flex-1 prose prose-lg max-w-none prose-p:my-0 prose-headings:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0">
                    {blok.text ? (
                        typeof blok.text === 'object' && blok.text.type === 'doc' ? (
                            <div className="text-gray-700 leading-relaxed m-0">
                                <RichText doc={blok.text} />
                            </div>
                        ) : (
                            <div
                                className="text-gray-700 leading-relaxed m-0"
                                dangerouslySetInnerHTML={{ __html: blok.text as string }}
                            />
                        )
                    ) : null}
                </div>

                {/* Image */}
                <div className="flex-1">
                    <Image
                        src={blok.image.filename}
                        alt={blok.image.alt || 'Blog image'}
                        title={blok.image.title}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg shadow-lg"
                        priority={false}
                    />
                </div>
            </div>
        </section>
    )
}
