import { useEffect, useRef, useState } from 'react'
import gongImage from '../assets/gongImage.png'
import dollyPartonImage from '../assets/dollyPartonImage.png'
import footballYogaImage from '../assets/footballYogaImage.png'
import lionHeartImage from '../assets/lionHeartImageSimple.jpg'
import mrBeanImage from '../assets/mrBeanImage.png'

const offerings = [
  {
    title: 'Meditation Gong Sessions',
    image: gongImage,
    description:
      'Immersive gong bath meditations for deep healing and vibrational wellness. Experience the transformative power of sound as ancient gongs resonate through your being, promoting relaxation and spiritual awakening.',
  },
  {
    title: 'Dolly Parton Ice-Cream Pie Club',
    image: dollyPartonImage,
    description:
      "Gather for an evening of sweet treats, good company, and Dolly's greatest hits. Share a slice of ice-cream pie, sing along, and let the warmth of community and a little country magic lift your spirits.",
  },
  {
    title: 'Lion Heart Arcadia',
    image: lionHeartImage,
    frameClass: 'max-w-sm mx-auto',
    description:
      'An active community in the mountains where every day offers a chance to connect with others and with yourself. Join in shared meals, guided reflection, movement, and storytelling, and leave with a calm, confident sense of purpose.',
  },
  {
    title: "Mr Bean's Trip to Paradise",
    image: mrBeanImage,
    description:
      'Settle into the mountain air, share easy conversation and good company, and let nature set the pace. No agenda, no pressure, just rest, connection, and the quiet kind of paradise that comes from slowing down together.',
  },
  {
    title: 'Football yoga',
    image: footballYogaImage,
    description:
      'Stretch, balance, and breathe with a ball at your feet. Football yoga blends gentle flowing poses with playful passes and team spirit, building flexibility and strength while keeping the mood light. All skill levels welcome.',
  },
  
]

function Reveal({ children, className = '', from = 'left' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hidden = from === 'left' ? '-translate-x-8' : 'translate-x-8'

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-x-0' : `opacity-0 ${hidden}`
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function Offerings() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center mb-20 text-brand-cream">Our Offerings</h2>

        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-dCream/60 to-transparent"
          ></div>

          {offerings.map((offering, index) => {
            const imageFirst = index % 2 === 1
            return (
              <article key={offering.title} className="relative py-12 md:py-16">
                <span
                  aria-hidden="true"
                  className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center py-2 text-2xl leading-none text-brand-dCream [text-shadow:0_0_12px_rgba(224,198,130,0.9)]"
                >
                  ✦
                </span>
                <div className="grid md:grid-cols-2 gap-8 md:gap-x-20 items-center">
                  <Reveal
                    from={imageFirst ? 'right' : 'left'}
                    className={imageFirst ? 'md:order-2' : ''}
                  >
                    <h3 className="text-3xl font-bold text-brand-cream mb-4">{offering.title}</h3>
                    <p className="text-brand-cream/90 leading-relaxed">{offering.description}</p>
                  </Reveal>
                  <Reveal
                    from={imageFirst ? 'left' : 'right'}
                    className={imageFirst ? 'md:order-1' : ''}
                  >
                    <div className={`relative rounded-lg overflow-hidden shadow-lg transition-transform duration-500 ease-out hover:scale-108 hover:z-10 ${offering.frameClass ?? ''}`}>
                      <img
                        src={offering.image}
                        alt={offering.title}
                        className={offering.imageClass ?? 'w-full'}
                      />
                    </div>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
