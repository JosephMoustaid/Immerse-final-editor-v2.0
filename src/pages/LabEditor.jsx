import { GrResources } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa";
import { IoHelp } from "react-icons/io5";
import { TbArrowsMove } from "react-icons/tb";
import { CiVideoOn } from "react-icons/ci";
import Window from '../assets/3D_Models/window.glb';
import { useEffect, useRef, useState } from 'react';
import { selectObject, modifyObjectWithKeys } from '../components/ObjectManipulation'; // Import functions
import PdfViewer from "../components/PDFViewer";
import VideoViewer from "../components/VideoViewer";
import Video from '../assets/videos/video.mp4';
import PDF from '../assets/pdf/Rapport.pdf';
import { IoCloseSharp } from "react-icons/io5";
import wallTexture from "../assets/textures/blueWall2.jpg";
import lights from "../assets/3D_Components/ceiling_lamp_-_11mb.glb";
import floorTexture from "../assets/textures/floor6.jpg";
import ceilingTexture from "../assets/textures/ceilingLamps.jpg"
import teacherDesk from "../assets/3D_Components/teacher_desk.glb";
import ProjectorScreen from "../assets/3D_Components/projector_screen.glb"; 
import Projector from "../assets/3D_Components/projector.glb"; 
import WindowBlind from "../assets/3D_Components/not_see_through_window.glb";
import DeskEntity from '../components/DeskEntity.jsx';


function LabEditor(){
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
   


  const [assets, setAssets] = useState([
    { id: 'Window', name: 'Window', src: Window, visible: false },
  ]);
  
  // Separate PDF state for managing its visibility
  const [pdf, setPdf] = useState({ id: 'PDF', name: 'Course PDF', visible: false });
  const [video, setVideo] = useState({ id: 'Video', name: 'Course Video', visible: false });

  const toggleVideoVisibility = () => {
    setVideo((prevVideo) => ({ ...prevVideo, visible: !prevVideo.visible }));
  };
    const [selectedObject, setSelectedObject] = useState(null);
    useEffect(() => {
        const sceneEl = sceneRef.current;
        
        const handleSelectObject = (evt) => selectObject(evt, setSelectedObject, cameraRef);
        const handleModifyObjectWithKeys = (event) => modifyObjectWithKeys(event, selectedObject, setSelectedObject, cameraRef);
        
        if(sceneEl) {
        sceneEl.addEventListener('click', handleSelectObject);
        window.addEventListener('keydown', handleModifyObjectWithKeys);
        }
        return () => {
            if(sceneEl) {
          sceneEl.removeEventListener('click', handleSelectObject);
          window.removeEventListener('keydown', handleModifyObjectWithKeys);
            }
        };
      }, [selectedObject]);
      // Function to toggle the visibility of an asset
  const toggleVisibility = (index) => {
    setAssets((prevAssets) => {
      const newAssets = [...prevAssets];
      newAssets[index] = { ...newAssets[index], visible: !newAssets[index].visible };
      return newAssets;
    });
  };

  // Function to toggle PDF visibility
  const togglePdfVisibility = () => {
    setPdf((prevPdf) => ({ ...prevPdf, visible: !prevPdf.visible }));
  };

    useEffect(() => {
        const menuUI = document.getElementById('openEditor');
        const closeUI = document.getElementById('closebtn');
        const model = document.querySelector("#model");
        const openModel = document.querySelector("#help");

        if (menuUI && closeUI && model ) {
        menuUI.addEventListener('mousedown', openNav);
        closeUI.addEventListener('mousedown', closeNav);
        model.addEventListener("click", () => {
            model.classList.add("hide");
        });
        openModel.addEventListener("click", () => {
            model.classList.remove("hide");
        });
        }

        return () => {
        if (menuUI && closeUI) {
            menuUI.removeEventListener('mousedown', openNav);
            closeUI.removeEventListener('mousedown', closeNav);
        }
        };
    }, []);
      const openNav = () => {
        document.getElementById("mySidenav").style.width = "400px";
      };
    
      const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
      };

    return(
        <div className='App'>
            <a-scene ref={sceneRef}  >
                <a-assets>
                    {assets.map((asset) => (
                        <a-asset-item key={asset.id} id={asset.id} src={asset.src}></a-asset-item>
                    ))}
                    <img id="wallTexture" src={wallTexture} />
                    <img id="floorTexture" src={floorTexture} />
                    <img id="ceilingTexture" src={ceilingTexture} />
                    <a-asset-item id="video" src={Video}></a-asset-item>
                    <a-asset-item id="pdf" src={PDF}></a-asset-item>
                </a-assets>


                
                {assets.map((asset, index) => (
                  asset.visible && (
                    <a-gltf-model
                      key={asset.id}
                      class="selectable collidable"
                      src={asset.src}
                      position="0 0 -3"
                      scale="1 1 1"
                      rotation="0 0 0"
                      material="color: #00FF00"
                    ></a-gltf-model>
                  )
                ))}
                <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>

                    
                {/* Floor */}
                <a-plane 
                    rotation="-90 0 0" 
                    width="160" // Doubled the width
                    height="160" // Doubled the height
                    src="#floorTexture" 
                />
                {/* Teacher Desk */}
                <a-gltf-model 
                    src={teacherDesk} 
                    position="-65 1.9 0" 
                    scale=".09 .09 .09"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>
                {/* Walls */}
                <a-box 
                    class="collidable"
                    position="0 20 -80" // Adjusted position for a larger room
                    rotation="0 0 0" 
                    width="160" // Doubled the width
                    height="40" // Doubled the height
                    depth="0.1" 
                    src="#wallTexture"
                />

                <a-box 
                    class="collidable"
                    position="80 20 0" // Adjusted position
                    rotation="0 -90 0" 
                    width="160" 
                    height="40" 
                    depth="0.1" 
                    src="#wallTexture"
                />

                <a-box 
                    class="collidable"
                    position="-80 20 0" // Adjusted position
                    rotation="0 90 0" 
                    width="160" 
                    height="40" 
                    depth="0.1" 
                    src="#wallTexture"
                />

                <a-box 
                    class="collidable"
                    position="0 20 80" // Adjusted position
                    rotation="0 180 0" 
                    width="160" 
                    height="40" 
                    depth="0.1" 
                    src="#wallTexture" 
                />

                {/* Ceiling */}
                <a-plane 
                    
                    position="0 40 0" // Adjusted position for a higher ceiling
                    rotation="90 0 0" 
                    width="160" 
                    height="160" 
                    src="#ceilingTexture"
                />

                {/* Projector screen */}
                <a-gltf-model 
                    src={ProjectorScreen} 
                    position="79 30 -17" 
                    scale="4 10 6"
                    rotation="0 0 0"
                ></a-gltf-model>
                {/*The video is projected in the projetor screen */}


                {/* Projector  */}
                <a-gltf-model 
                    src={Projector} 
                    position="50 33 -17" 
                    scale="10 10 10"
                    rotation="0 90 0"
                ></a-gltf-model>

                     {/*Window blinds  */}
                <a-gltf-model 
                    src={WindowBlind} 
                    position="-18 8 79" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="0 8 79" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="18 8 79" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>

                <a-gltf-model 
                    src={WindowBlind} 
                    position="-18 8 -79" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="0 8 -79" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="18 8 -79" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>


                {/* Desks with chairs with lights and pcs */}
                <DeskEntity position="-24 0 -36" rotation="0 0 0"/>
                <DeskEntity position="-12 0 -36" rotation="0 0 0"/>
                <DeskEntity position="0 0 -36"rotation="0 0 0" />
                <DeskEntity position="12 0 -36" rotation="0 0 0"/>
                <DeskEntity position="24 0 -36" rotation="0 0 0"/>


                <DeskEntity position="-24 0 36" rotation="0 180 0"/>
                <DeskEntity position="-12 0 36" rotation="0 180 0"/>
                <DeskEntity position="0 0 36" rotation="0 180 0"/>
                <DeskEntity position="12 0 36" rotation="0 180 0"/>
                <DeskEntity position="24 0 36" rotation="0 180 0"/>

                

                <a-entity
                    id="camera"
                    camera
                    look-controls
                    my-custom-look-controls
                    camera-collider="speed: 1; radius: 0.5"
                    ref={cameraRef}
                    rotation="0 0 0"
                    position="0 8 0"
                    >
                    <a-cursor></a-cursor>
                </a-entity>
                {video.visible && (
                    <VideoViewer 
                    position="78.5 18 -17" 
                    rotation="0 -90 0" 
                    scale="10 15 5" 
                    />
                )}
                {pdf.visible && (
                    <PdfViewer pdf={PDF} scale={3} rotation="0 -90 0" class="selectable" position="75 8 30" />
                )}




                <div id="model">
                    <div id="info">
                        <span id="close"><IoCloseSharp/></span>
                        <h2 className="fw-bolder">Welcome to Immerse Editor!</h2>
                        <h3 className="text-start fw-lighter ps-4" ><u>Instructions:</u></h3>
                        <ul>
                        <li className="text-start">Use the keys  WQSD for movement</li>
                        <li className="text-start">Scroll Up and Down for vertical movement</li>
                        <li className="text-start">To select a model , move the cursor to the element and left click with ur mouse</li>
                        <li className="text-start">Use the keyboard arrows <TbArrowsMove/> to control the  model  horizontal position and "Y" , "C" to control vertical position</li>
                        <li className="text-start">Use "+" and "-" to control the model scale</li>
                        <li className="text-start">Use "A" and "E" to control the model rotation</li>
                        <li className="text-start">You can control the position , scale and rotation for all assets(video , PDF and models)</li>
                        </ul>
                    </div>
                </div>
            </a-scene>
            <div id="mySidenav" className="sidenav d-flex flex-column">
        <div className="p-1 flex-grow-1">
          
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className="fs-4 m-0 fw-bolder">Editor Menu</h2>
            <div className="d-flex align-items-center">
              <span id="help" className="m-0 fs-2 text-decoration-none text-dark  p-0"><IoHelp /></span>
              <span id="closebtn" className='fs-2 m-0 p-0 text-dark'><IoCloseSharp/></span>
            </div>
          </div>
          <hr />
          <h4 className='fs-5 fw-light text-start fw-bold'><GrResources/> Uploaded Assets</h4>
          <ul className="list-group">
            {assets.map((asset, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {asset.name}
                <button 
                  className={`btn ${asset.visible ? 'btn-danger' : 'btn-dark'}`} 
                  onClick={() => toggleVisibility(index)}>
                  {asset.visible ? 'Hide' : 'Show'}
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <h4 className='fs-5 fw-light text-start mt-4 fw-bold'> <FaRegFilePdf /> PDF</h4>
          <button 
            className={`btn ${pdf.visible ? 'btn-danger' : 'btn-dark'} w-100`} 
            onClick={togglePdfVisibility}>
            {pdf.visible ? 'Hide PDF' : 'Show PDF'}
          </button>
          <hr />
          <h4 className='fs-5 fw-light text-start mt-4 fw-bold'> <CiVideoOn/> Video</h4>
          <button 
            className={`btn ${video.visible ? 'btn-danger' : 'btn-dark'} w-100`} 
            onClick={toggleVideoVisibility}>
            {video.visible ? 'Hide video' : 'Show video'}
          </button>
            </div>

            <div className="p-3">
            <button id="downloadBtn" className="btn btn-primary w-100 fw-bold text-white">Save the course</button>
            </div>
        </div>

            <div className='fs-4 cursor-pointer p-3 fw-bolder text-white' id="openEditor">&#9776; Open Editor Menu</div>
        </div>

    );
}
export default LabEditor;