import React, {useEffect, useState} from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Loading from './global/Loading';

const ImageGridViewRenderer = (props) => {
  const {getAll} = props

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableNext, setDisableNext] = useState(false)
  const [disablePrev, setDisablePrev] = useState(false)

  const download = (url, name) => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        var element = document.createElement("a");
        var file = new Blob([data], { type: "image/*" });
        element.href = URL.createObjectURL(file);
        element.download = `${name}.jpg`;
        element.click();
      })
      .catch((error) => {
        alert('Error in downloading image', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const getPageImages = (offset) => getAll(page * 3 + offset);

      
      const pageImages = await Promise.all([
        getPageImages(-2),
        getPageImages(-1),
        getPageImages(0),
      ]);

      const imagesArr = pageImages.flat()
      setDisableNext(imagesArr.length !== 9 ? true : false)
      setDisablePrev(page === 1 ? true : false)
      setImages(imagesArr);
      setLoading(false)
    };

    fetchData();
  }, [page]);

  return (
    <Box sx={{display:'block', justifyContent:'center'}}>
      {loading ? (
        <Loading />
      ) :(
        <ImageList sx={{ width: '75%', height: '100%', margin:'auto', marginTop:5}} cols={3}>
          {images && images.map((item) => (
            <ImageListItem key={item.url} >
              <img
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.url}?w=248&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
                style={{borderRadius:'16px'}}
              />
              <ImageListItemBar
                title={item.name}
                sx={{borderBottomRightRadius:'16px', borderBottomLeftRadius:'16px'}}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.name}`}
                    onClick={() => download(item.url, item.name)}
                  >
                    <DownloadForOfflineIcon/>
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Stack direction="row" spacing={2} sx={{justifyContent:'center', margin:'5px'}}>
        <Button startIcon={<ArrowBackIosIcon/>} size="large"  onClick={() => setPage(page - 1)} disabled={disablePrev}>
          Previous
        </Button>
        <Button endIcon={<ArrowForwardIosIcon/>} size="large" onClick={() => setPage(page + 1)} disabled={disableNext}>
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default ImageGridViewRenderer;
