import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 })
  ])


  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    //   const playOrStop =  autoplay.play
    // playOrStop()
  }, [emblaApi])

  return (
    <div className="embla h-full border border-black flex flex-col">
      <div className="embla__viewport flex-1" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((index) => (
            <div className="embla__slide border border-black" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
