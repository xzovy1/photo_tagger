import wheresWaldo from "./assets/1_7v_75ZGg1CTmWAw1rEgMHQ.webp";
import useMousePosition from "./hooks/useMousePosition";
import { useState, useEffect } from "react";

const CastleImage = ({imageClicked, setImageClicked, setLocation}) => {
    const [imagePosition, setImagePosition] = useState({left: null, right: null, top: null, bottom: null});
    
    const handleCharacterSelect = () => {
        setImageClicked(!imageClicked);
        if(
            (mousePosition.x >= imagePosition.left && mousePosition.x <= imagePosition.right) &&
            (mousePosition.y >= imagePosition.top && mousePosition.y <= imagePosition.bottom)
        ){
            setLocation({x: Math.floor(mousePosition.x - imagePosition.left),  y: Math.floor(mousePosition.y - imagePosition.top)})
        }
    }
    useEffect(()=>{
        const image = document.getElementById("image")
        setImagePosition(image.getBoundingClientRect())
    },[])
    // useEffect(()=>{
    //     if(
    //         (mousePosition.x >= imagePosition.left && mousePosition.x <= imagePosition.right) &&
    //         (mousePosition.y >= imagePosition.top && mousePosition.y <= imagePosition.bottom)
    //     ){
    //         console.log(Math.floor(mousePosition.x - imagePosition.left), Math.floor(mousePosition.y - imagePosition.top))
    //     }
    //     console.log(characterLocationSelect)
    // })
    const mousePosition = useMousePosition();
    return (
        <img src={wheresWaldo} alt="waldo" className="image" id="image" onClick={handleCharacterSelect}/>      
    )
}

export default CastleImage;