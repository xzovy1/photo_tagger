import wheresWaldo from "./assets/1_7v_75ZGg1CTmWAw1rEgMHQ.webp";
import useMousePosition from "./hooks/useMousePosition";
import { useState, useEffect } from "react";
const CastleImage = () => {
    const [imagePosition, setImagePosition] = useState({left: null, right: null, top: null, bottom: null});

    useEffect(()=>{
        const image = document.getElementById("image")
        setImagePosition(image.getBoundingClientRect())
    },[])

    useEffect(()=>{
        if(
            (mousePosition.x >= imagePosition.left && mousePosition.x <= imagePosition.right) &&
            (mousePosition.y >= imagePosition.top && mousePosition.y <= imagePosition.bottom)
        ){
            console.log(Math.floor(mousePosition.x - imagePosition.left), Math.floor(mousePosition.y - imagePosition.top))
        }
    })
    const mousePosition = useMousePosition();
    return (
        <img src={wheresWaldo} alt="waldo" className="image" id="image"/>      
    )
}

export default CastleImage;