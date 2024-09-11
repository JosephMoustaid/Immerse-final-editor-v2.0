import { useState, useEffect } from "react";

const useAnnotationMaker = (sceneRef) => {
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const cursorEl = document.querySelector("a-cursor");
    const cameraEl = document.querySelector("a-camera");

    const handleAnnotationPlacement = () => {
      if (!isAddingAnnotation) return;

      const intersectedEl = cursorEl.components.raycaster.intersectedEls[0]; // Find the first intersected element
      if (intersectedEl === sceneRef.current) {
        const intersectedPoint = cursorEl.components.raycaster.intersections[0].point; // Get intersection point

        const annotationName = prompt("Enter annotation name:");
        const annotationDescription = prompt("Enter annotation description:");
        if (annotationName && annotationDescription) {
          const { x, y, z } = intersectedPoint;

          const newAnnotation = {
            id: annotations.length + 1,
            name: annotationName,
            description: annotationDescription,
            position: { x, y, z },
            rotation: calculateRotation({ x, y, z }, cameraEl.object3D.position),
          };

          console.log("New annotation added at:", { x, y, z });

          setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
        }
        setIsAddingAnnotation(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'n' || event.key === 'N') {
        if (!isAddingAnnotation) {
          setIsAddingAnnotation(true);
        } else {
          handleAnnotationPlacement(); // Place annotation when "N" is pressed again
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAddingAnnotation, annotations, sceneRef]);

  const calculateRotation = (annotationPosition, cameraPosition) => {
    const dx = cameraPosition.x - annotationPosition.x;
    const dz = cameraPosition.z - annotationPosition.z;
    const rotationY = Math.atan2(dx, dz) * (180 / Math.PI);
    return `0 ${rotationY} 0`;
  };

  return { annotations, isAddingAnnotation };
};

export default useAnnotationMaker;
