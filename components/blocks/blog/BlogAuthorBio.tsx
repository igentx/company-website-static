import Image from 'next/image'
import type { BlogImage } from '@/lib/types'

interface BlogAuthorBioProps {
  authorName: string
  authorRole?: string
  authorBio?: string
  authorAvatar?: BlogImage
}

export default function BlogAuthorBio({
  authorName,
  authorRole,
  authorBio,
  authorAvatar,
}: BlogAuthorBioProps) {
  if (!authorBio) return null

  return (
    <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-start gap-4">
        {authorAvatar?.filename ? (
          <Image
            src={authorAvatar.filename}
            alt={authorAvatar.alt || authorName}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <span className="font-bold text-blue-600 text-lg">
              {authorName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{authorName}</p>
          {authorRole && <p className="text-sm text-blue-600 mb-2">{authorRole}</p>}
          <p className="text-sm text-gray-600 leading-relaxed">{authorBio}</p>
        </div>
      </div>
    </div>
  )
}
