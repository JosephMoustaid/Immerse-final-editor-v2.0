import officeSharedDesk from "../assets/3D_Components/shared_office_desk.glb";
import deskShelf from "../assets/3D_Components/ikea_fjallbo_wall_shelf.glb";


import Osciloscope from "../assets/3D_Components/oscilloscope.glb";
import PowerSuply from "../assets/3D_Components/power_suply_dc.glb";
import MultiMeter from "../assets/3D_Components/digital_multi-meter.glb";
import BreadBoard from "../assets/3D_Components/arduino_breadboard_low_poly.glb";
import IronStation from "../assets/3D_Components/soldering_iron_station.glb";

import officeChair from "../assets/3D_Components/office_chair.glb";
function SharedDesk({ position = "0 0 0", rotation = "0 0 0" }) {
    return (
       <>
       <a-entity position={position} rotation={rotation} className="collidable">
            <a-gltf-model 
                src={officeSharedDesk} 
                position="0 6 9.1" 
                scale=".03 .07 .04"
                rotation="0 90 0"
                class="collidable"
            ></a-gltf-model>
            {/* Desk Shelf */}
            <a-gltf-model 
                src={deskShelf} 
                position="1 8 5" 
                scale="10 7 8"
                rotation="0 0 0"
                class="collidable"
            ></a-gltf-model>
            <a-gltf-model 
                src={deskShelf} 
                position="1 8 13" 
                scale="10 7 8"
                rotation="0 0 0"
                class="collidable"
            ></a-gltf-model>
            <a-gltf-model 
                src={deskShelf} 
                position="-1 8 5" 
                scale="10 7 8"
                rotation="0 180 0"
                class="collidable"
            ></a-gltf-model>
            <a-gltf-model 
                src={deskShelf} 
                position="-1 8 13" 
                scale="10 7 8"
                rotation="0 180 0"
                class="collidable"
            ></a-gltf-model> 

            <a-entity>
                {/* Equipiments : Osciloscope and power supplies ...etc */}
                <a-gltf-model 
                    src={Osciloscope} 
                    position="-1.5 6 2" 
                    scale="6 6 4"
                    rotation="0 270 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 10" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 12.1" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={MultiMeter} 
                    position="-3.4 6.3 14" 
                    scale=".015 .015 .015"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={BreadBoard} 
                    position="-3.4 6.3 12" 
                    scale=".0008 .0008 .0008"
                    rotation="0 45 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={IronStation} 
                    position="-1.6 8.8 15" 
                    scale="8 8 8"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model>
                <a-gltf-model 
                    src={officeChair} 
                    position="-5 3.5 15" 
                    scale="6.5 6.5 6.5"
                    rotation="0 90 0"
                    class="collidable"
                ></a-gltf-model> 


                <a-gltf-model 
                    src={Osciloscope} 
                    position="-1.5 6 10" 
                    scale="6 6 4"
                    rotation="0 270 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 2" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 4.1" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={MultiMeter} 
                    position="-3.4 6.3 6" 
                    scale=".015 .015 .015"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={BreadBoard} 
                    position="-3.4 6.3 4.5" 
                    scale=".0008 .0008 .0008"
                    rotation="0 -19 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={IronStation} 
                    position="-1 8.8 7" 
                    scale="8 8 8"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={officeChair} 
                    position="-5 3.5 4" 
                    scale="6.5 6.5 6.5"
                    rotation="0 90 0"
                    class="collidable"
                ></a-gltf-model>  

                <a-gltf-model 
                    src={officeChair} 
                    position="-5 3.5 9.5" 
                    scale="6.5 6.5 6.5"
                    rotation="0 90 0"
                    class="collidable"
                ></a-gltf-model> 
            </a-entity> 

            <a-entity rotation="0 180 0" position="0 0 19">
                {/* Equipiments : Osciloscope and power supplies ...etc */}
                <a-gltf-model 
                    src={Osciloscope} 
                    position="-1.5 6 2" 
                    scale="6 6 4"
                    rotation="0 270 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 10" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 12.1" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={MultiMeter} 
                    position="-3.4 6.3 14" 
                    scale=".015 .015 .015"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={BreadBoard} 
                    position="-3.4 6.3 12" 
                    scale=".0008 .0008 .0008"
                    rotation="0 45 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={IronStation} 
                    position="-1.6 8.8 15" 
                    scale="8 8 8"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model>
                <a-gltf-model 
                    src={officeChair} 
                    position="-5 3.5 15" 
                    scale="6.5 6.5 6.5"
                    rotation="0 90 0"
                    class="collidable"
                ></a-gltf-model> 


                <a-gltf-model 
                    src={Osciloscope} 
                    position="-1.5 6 10" 
                    scale="6 6 4"
                    rotation="0 270 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 2" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={PowerSuply} 
                    position="-1.6 8.7 4.1" 
                    scale=".6 .6 .6"
                    rotation="0 180 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={MultiMeter} 
                    position="-3.4 6.3 6" 
                    scale=".015 .015 .015"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model>  
                <a-gltf-model 
                    src={BreadBoard} 
                    position="-3.4 6.3 4.5" 
                    scale=".0008 .0008 .0008"
                    rotation="0 -19 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={IronStation} 
                    position="-1 8.8 7" 
                    scale="8 8 8"
                    rotation="0 0 0"
                    class="collidable"
                ></a-gltf-model> 
                <a-gltf-model 
                    src={officeChair} 
                    position="-5 3.5 4" 
                    scale="6.5 6.5 6.5"
                    rotation="0 90 0"
                    class="collidable"
                ></a-gltf-model>  

                <a-gltf-model 
                    src={officeChair} 
                    position="-5 3.5 9.5" 
                    scale="6.5 6.5 6.5"
                    rotation="0 90 0"
                    class="collidable"
                ></a-gltf-model> 
            </a-entity>
        </a-entity>
       </> 
        
    );
}

export default SharedDesk;
