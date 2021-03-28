import React from 'react';
import useCarousel from '../../hooks/useCarousel';
import CarouselContainer from '../../styled/Carousel/CarouselContainer';
// import CarouselContent from '../../styled/Carousel/CarouselContent';
import CarouselIndicators from '../../styled/Carousel/CarouselIndicators';
import CarouselIndicator from '../../styled/Carousel/CarouselIndicator';
import SocialSearchItem from '../SocialRoutes/SocialMisc/SocialSearchItem';

function Carousel({ slides, interval = 0 }) {
  const length = slides.length
  const [active, setActive, handlers, style] = useCarousel(length, interval);

  return length > 0 && (
    <CarouselContainer style={{ pointerEvents: 'all' }}>
      <CarouselIndicators>
        {slides.map((_, index) => (
          <CarouselIndicator
            onClick={() => setActive(index)}
            key={index}
            className={`${active === index ? "active" : ""}`}
          />
        ))}
      </CarouselIndicators>
      <article {...handlers} style={style}>
        {slides.length > 1 && <SocialSearchItem fs={slides[slides.length - 1]} key={slides[slides.length - 1]._id} src={`https://robohash.org/${slides[slides.length - 1]._id}?set=set4&size=150x150`} />}
        {slides.map((slide, index) => (
          <SocialSearchItem fs={slide} key={slide._id} src={`https://robohash.org/${slide._id}?set=set4&size=150x150`} />
        ))}
        {slides.length > 2 && <SocialSearchItem fs={slides[0]} key={slides[0]._id} src={`https://robohash.org/${slides[0]._id}?set=set4&size=150x150`} />}
      </article>
    </CarouselContainer>
  )
}

export default Carousel;
