import React, { useState, useCallback } from "react";
// import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos";

function ShowImages({ imagesGallery }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  console.log(imagesGallery);

  return (
    <div>
      {imagesGallery.length === 1 ? (
        <img
          src={imagesGallery[0]}
          alt="images of blog"
          width="300px"
          height="400px"
        />
      ) : (
        <>
          <Gallery
            photos={imagesGallery.map((imageUrl) => ({
              src: imageUrl,
              width: 1,
              height: 1,
            }))}
            onClick={openLightbox}
          />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={imagesGallery.map((imageUrl) => ({
                    srcset: imageUrl,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </>
      )}
    </div>
  );
}

export default ShowImages;
