import React from 'react';
import ImageDataGetter from '../api/ImageDataGetter';
import ImageGridViewRenderer from '../components/ImageGridViewRenderer';

const Nature = () => {
  return (
    <section>
      <h1 className="text-center text-5xl font-bold mt-2">
      "Nature's Palette Unveiled: Capturing the Essence of Tranquility in Every Frame."
      </h1>
      <ImageGridViewRenderer 
        getAll={ImageDataGetter.getNatureImagesFromPage}
      />
    </section>
  )
}

export default Nature;