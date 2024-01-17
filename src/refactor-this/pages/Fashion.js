import React from 'react';
import ImageGridViewRenderer from '../components/ImageGridViewRenderer';
import ImageDataGetter from  '../api/ImageDataGetter';

const Fashion = () => {
  return (
    <section>
      <h1 className="text-center text-5xl font-bold mt-2">
      "Elegance Redefined: Unleashing the Power of Style, One Image at a Time."
      </h1>
      <ImageGridViewRenderer 
        getAll={ImageDataGetter.getFashionImagesFromPage}
      />
    </section>
  )
}

export default Fashion;