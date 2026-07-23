import { BlogImageBlok } from '@/lib/types'
import Image from 'next/image'

interface BlogImageProps {
    blok: BlogImageBlok
}

export default function BlogImage({ blok }: BlogImageProps) {
    const widthClass = {
        full: 'w-full',
        large: 'max-w-4xl mx-auto',
        medium: 'max-w-2xl mx-auto',
        small: 'max-w-xl mx-auto',
    }[blok.width || 'large']

    const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[blok.alignment || 'center']

    return (
        <figure className={`py-8 ${alignmentClass}`}>
            <div className={widthClass}>
                <Image
                    src={blok.image.filename}
                    alt={blok.image.alt || 'Blog image'}
                    title={blok.image.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-lg shadow-lg"
                    priority={false}
                />
            </div>
            {blok.caption && (
                <figcaption className="mt-4 text-gray-600 text-sm italic">
                    {blok.caption}
                </figcaption>
            )}
        </figure>
    )
}
