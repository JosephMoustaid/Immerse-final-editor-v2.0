import { useRef, useState, useEffect } from 'react';
import floorTexture from '../assets/textures/floor6.jpg';
import ceilingTexture2 from '../assets/images/ceilingTxt.webp';
import wallTexture from '../assets/textures/blueWall2.jpg';
import asset from '../assets/3D_Models/window.glb';

function AddAnnotations() {
  const sceneRef = useRef(null);
  const assetRef = useRef(null);
  const [annotations, setAnnotations] = useState([]);
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);

  useEffect(() => {
    if (!assetRef.current) return; // Ensure the model is available

    const cursorEl = document.querySelector("a-cursor");
    const cameraEl = document.querySelector("a-camera");

    // Handle placement of annotation on the asset
    const handleAnnotationPlacement = (evt) => {
      if (!isAddingAnnotation) return; // Only proceed if we are in "add mode"

      const intersectedEl = evt.detail.intersectedEl;
      if (intersectedEl === assetRef.current) { // Ensure we are clicking on the correct asset
        const intersectedPoint = evt.detail.intersection.point;

        const annotationName = prompt("Enter annotation name:");
        const annotationDescription = prompt("Enter annotation description:");
        if (annotationName && annotationDescription) {
          const { x, y, z } = intersectedPoint;

          const newAnnotation = {
            id: annotations.length + 1,
            name: annotationName,
            description: annotationDescription,
            position: { x, y, z },
            rotation: calculateRotation({ x, y, z }, cameraEl?.object3D?.position || { x: 0, y: 0, z: 0 }), // Default rotation if cameraEl is null
          };

          console.log("New annotation added at:", { x, y, z });

          setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
        }
        setIsAddingAnnotation(false); // Disable annotation mode after one placement
      }
    };

    // Calculate rotation of annotation to face the camera
    const calculateRotation = (annotationPosition, cameraPosition) => {
      if (!cameraPosition) return "0 0 0"; // Return default rotation if cameraPosition is not available

      const dx = cameraPosition.x - annotationPosition.x;
      const dz = cameraPosition.z - annotationPosition.z;
      const rotationY = Math.atan2(dx, dz) * (180 / Math.PI);
      return `0 ${rotationY} 0`;
    };

    // Add click event listener to place annotations
    cursorEl.addEventListener("click", handleAnnotationPlacement);

    return () => {
      cursorEl.removeEventListener("click", handleAnnotationPlacement);
    };
  }, [isAddingAnnotation, annotations]);

  // Listen for 'n' key to enter annotation adding mode
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'n' || event.key === 'N') {
        setIsAddingAnnotation(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <a-scene ref={sceneRef}>
        <a-assets>
          <img id="wallTexture" src={wallTexture} />
          <img id="floorTexture" src={floorTexture} />
          <img id="ceilingTexture" src={ceilingTexture2} />
        </a-assets>

        {/* Camera with cursor */}
        <a-entity
          camera
          look-controls
          position="0 14 0"
        >
          <a-cursor></a-cursor>
        </a-entity>

        {/* Lighting */}
        <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
        <a-light type="directional" position="0 10 0" intensity="0.7" target="#floor"></a-light>
        <a-light type="point" color="#fff" intensity="0.3" position="0 35 0"></a-light>
        <a-light type="point" color="#fff" intensity="0.3" position="30 20 -30"></a-light>
        <a-light type="point" color="#fff" intensity="0.3" position="-30 20 30"></a-light>

        {/* Floor */}
        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="140"
          height="140"
          material={`src: url(${floorTexture}); repeat: 7 9`}
        ></a-plane>

        {/* Ceiling */}
        <a-plane
          position="0 40 0"
          rotation="90 0 0"
          width="140"
          height="140"
          material={`src: url(${ceilingTexture2}); repeat: 2 3`}
        ></a-plane>

        {/* Walls */}
        <a-plane
          position="0 20 -70"
          rotation="0 0 0"
          width="140"
          height="40"
          material={`src: url(${wallTexture}); repeat: 4 2`}
        ></a-plane>
        <a-plane
          position="0 20 70"
          rotation="0 180 0"
          width="140"
          height="40"
          material={`src: url(${wallTexture}); repeat: 4 2`}
        ></a-plane>
        <a-plane
          position="-70 20 0"
          rotation="0 90 0"
          width="140"
          height="40"
          material={`src: url(${wallTexture}); repeat: 4 2`}
        ></a-plane>
        <a-plane
          position="70 20 0"
          rotation="0 -90 0"
          width="140"
          height="40"
          material={`src: url(${wallTexture}); repeat: 4 2`}
        ></a-plane>

        {/* 3D Asset */}
        <a-entity
          ref={assetRef}
          gltf-model={`url(${asset})`}
          position="0 5 0"
        ></a-entity>

        {annotations.map((annotation) => {
          const modelCenter = { x: 0, y: 0, z: 0 };

          const directionVector = {
            x: annotation.position.x - modelCenter.x,
            y: annotation.position.y - modelCenter.y,
            z: annotation.position.z - modelCenter.z,
          };

          const magnitude = Math.sqrt(
            directionVector.x ** 2 + directionVector.y ** 2 + directionVector.z ** 2
          );
          const unitVector = {
            x: directionVector.x / magnitude,
            y: directionVector.y / magnitude,
            z: directionVector.z / magnitude,
          };

          const lineEnd = {
            x: annotation.position.x + unitVector.x * 0.4,
            y: annotation.position.y + unitVector.y * 0.4,
            z: annotation.position.z + unitVector.z * 0.4,
          };

          return (
            <a-entity key={annotation.id}>
              <a-entity
                line={`start: ${annotation.position.x} ${annotation.position.y} ${annotation.position.z}; 
                      end: ${lineEnd.x} ${lineEnd.y} ${lineEnd.z}; color: grey; opacity: 0.7`}
                material="color: grey; opacity: 0.7"
                lineWidth="5"
              ></a-entity>

              <a-entity
                geometry="primitive: plane; width: 0.6; height: 0.3"
                material="color: grey; transparent: true; opacity: 0.8"
                position={`${lineEnd.x} ${lineEnd.y} ${lineEnd.z}`}
                rotation={annotation.rotation}
                class="annotation"
                events={{ click: () => alert(`Annotation ${annotation.id} clicked!`) }}
              >
                <a-text
                  value={`${annotation.name} :`}
                  color="white"
                  align="center"
                  width="1.1"
                  position="-0.2 0.1 0"
                  anchor="center"
                ></a-text>

                <a-text
                  value={annotation.description}
                  color="white"
                  align="center"
                  width="0.6"
                  position="-0.2 0.05 0"
                  anchor="center"
                ></a-text>
              </a-entity>
            </a-entity>
          );
        })}
      </a-scene>
    </div>
  );
}

export default AddAnnotations;
