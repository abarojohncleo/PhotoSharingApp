import { getFromCache, saveToCache } from "../helpers/cacheResponse";

const ImageDataGetter = {
  getImages: async (category) => {
    let images = [];
    const url = `http://localhost:8888/images?category=${category}`;

    const cachedData = await getFromCache(url);
    if(cachedData) {
      return cachedData;
    }
    
    return fetch(url)
      .then((response) => response.json())
      .then(async (result) => {
        images = result;
        await saveToCache(url, images)
        return images;
      });
  },

  getImagesFromPage: async (category, page) => {
    let images = [];
    const url = `http://localhost:8888/images?category=${category}&page=${page}`;

    const cachedData = await getFromCache(url)
    if (cachedData) {
      return cachedData;
    }

    return fetch(url)
      .then((response) => response.json())
      .then(async (result) => {
        images = result;
        await saveToCache(url, images)
        return images;
      });
  },

  getNatureImages: () => ImageDataGetter.getImages('nature'),

  getArchitectureImages: () => ImageDataGetter.getImages('architecture'),

  getFashionImages: () => ImageDataGetter.getImages('fashion'),

  getNatureImagesFromPage: (page) => ImageDataGetter.getImagesFromPage('nature', page),

  getArchitectureImagesFromPage: (page) => ImageDataGetter.getImagesFromPage('architecture', page),

  getFashionImagesFromPage: (page) => ImageDataGetter.getImagesFromPage('fashion', page),
};

export default ImageDataGetter;
