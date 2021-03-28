import React from 'react';
import useCarousel from '../../hooks/useCarousel';
import CarouselContainer from '../../styled/Carousel/CarouselContainer';
// import CarouselContent from '../../styled/Carousel/CarouselContent';
import CarouselIndicators from '../../styled/Carousel/CarouselIndicators';
import CarouselIndicator from '../../styled/Carousel/CarouselIndicator';
import GroupItem from '../dashboard/utilcomps/GroupItem';

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
        {slides.length > 1 && <GroupItem group={slides[slides.length - 1]} key={slides[slides.length - 1]._id} />}
        {slides.map((slide, index) => (
          <GroupItem group={slide} key={slide._id} />
        ))}
        {slides.length > 2 && <GroupItem group={slides[0]} key={slides[0]._id} />}
      </article>
    </CarouselContainer>
  )
}

export default Carousel;
