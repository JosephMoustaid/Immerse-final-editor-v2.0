import React, { useState, useEffect } from 'react';
import pdfToImages from './PDFToImages';


function PDFViewer({ pdf, scale = 1, position, rotation }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPdfImages = async () => {
      try {
        const pdfImages = await pdfToImages(pdf);
        setImages(pdfImages);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdfImages();
  }, [pdf]);


  // Provide default values for position and rotation if not passed
  const entityPosition = position || "0 0 0";
  const entityRotation = rotation || "0 0 0";

  return (
    <a-entity scale={`${scale} ${scale} ${scale}`} class="selectable" position={entityPosition} rotation={entityRotation}>
      {images.length > 0 ? (
        <>
          <a-plane
            src={images[currentPage - 1]}
            position="0 1.6 -1.5"
            rotation="0 0 0"
            width={2 * scale} // Adjust width based on scale
            height={2.7 * scale} // Adjust height based on scale
            material="shader: flat;"
            class="selectable"
          />

          

        </>
      ) : (
        <a-text
          value="Loading images..."
          align="center"
          position="0 1.6 -3"
        />
      )}
    </a-entity>
  );
}

export default PDFViewer;

