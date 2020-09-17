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

  return (
    <div>
      {imagesGallery.length === 1 ? (
        <img
          style={{ marginLeft: "20%" }}
          src={imagesGallery[0]}
          alt="images content"
          sizes="(min-width: 600px) 600px, 100vw"
          width="600"
        />
      ) : (
        <>
          <Gallery
            photos={imagesGallery.map((imageUrl) => ({
              src: imageUrl,
              width: 3,
              height: 4,
            }))}
            onClick={openLightbox}
          />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={imagesGallery.map((imageUrl) => ({
                    src: imageUrl,
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
