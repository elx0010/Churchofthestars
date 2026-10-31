import FadeIn from './FadeIn'

// The ID is the part after "v=" in a YouTube link (youtube.com/watch?v=VIDEO_ID)
const YOUTUBE_VIDEO_ID = '5mMQxmTQ-OA'

export default function VideoSection() {
  return (
    <section className="py-24 px-4 border-t border-brand-cream/20">
      <FadeIn className="max-w-5xl mx-auto">
        <h2 className="section-title text-center mb-10 text-brand-cream">Experience the Retreat</h2>

        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Church of the Stars retreat video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </FadeIn>
    </section>
  )
}
