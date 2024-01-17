import React from 'react';
import ImageDataGetter from '../api/ImageDataGetter';
import ImageGridViewRenderer from '../components/ImageGridViewRenderer';

const Architecture = () => {

  return (
    <section>
      <h1 className="text-center text-5xl font-bold mt-2">
      "Elevating Horizons, Building Tomorrow: Architecture that Inspires and Transcends."
      </h1>
      <ImageGridViewRenderer 
          getAll={ImageDataGetter.getArchitectureImagesFromPage}
        />
    </section>
  )
}

export default Architecture
