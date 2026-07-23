import { AboutBlok } from '@/lib/types'
import Image from 'next/image'

/**
 * About component - About section with content and team
 * Displays title, content, optional image, and team members
 */
interface AboutProps {
  blok: AboutBlok
}

export default function About({ blok }: AboutProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-primary text-gray-900 mb-6">
              {blok.title || 'About Us'}
            </h2>

            {blok.content && (
              <div className="text-lg text-gray-600 font-secondary prose max-w-none">
                {/* Convert newlines to paragraphs */}
                {blok.content.split('\n').map(
                  (paragraph, index) =>
                    paragraph.trim() && (
                      <p key={index} className="mb-4">
                        {paragraph.trim()}
                      </p>
                    )
                )}
              </div>
            )}
          </div>

          {blok.image?.filename && (
            <div className="relative aspect-video lg:aspect-square">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ''}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Team Members */}
        {blok.team_members && blok.team_members.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-bold font-primary text-gray-900 text-center mb-12">
              Our Team
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blok.team_members.map((member, index) => (
                <div
                  key={index}
                  className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  {member.photo?.filename && (
                    <div className="mb-4 flex justify-center">
                      <Image
                        src={member.photo.filename}
                        alt={member.photo.alt || member.name}
                        width={150}
                        height={150}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}

                  <h4 className="text-xl font-semibold font-primary text-gray-900 mb-2">{member.name}</h4>

                  <p className="text-blue-600 font-medium font-primary mb-3">{member.position}</p>

                  {member.bio && <p className="text-gray-600 text-sm font-secondary">{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
