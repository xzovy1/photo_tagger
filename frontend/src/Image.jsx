import wheresWaldo from "./assets/1_7v_75ZGg1CTmWAw1rEgMHQ.webp";
import useMousePosition from "./hooks/useMousePosition";
import { useState, useEffect } from "react";

const Image = ({imageClicked, setImageClicked, setLocation}) => {
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
    //         (Math.floor(mousePosition.x - imagePosition.left), Math.floor(mousePosition.y - imagePosition.top))
    //         console.log(mousePosition.x)
    //     }
    // })
    const mousePosition = useMousePosition();
    let transform = `translateX(${mousePosition.x }px) translateY(${mousePosition.y }px)`;;
    //original image dimensions : 2828 * 1828
    //
    let backgroundPosition = `${-(mousePosition.x - imagePosition.left - 27 ) * (2828 / imagePosition.width)}px ${-(mousePosition.y - imagePosition.top - 27) *  (1828 / imagePosition.height)}px`
    console.log(mousePosition.x, imagePosition, window.innerWidth)
    
    return (
        <>
        <div id="magnifier" style={{
            transform, 
            backgroundImage: `url(${wheresWaldo})`, 
            backgroundPosition, 
            backgroundRepeat: "no-repeat",
            top: 0,
            left: 0
        }}></div>     
        <div onClick={handleCharacterSelect}>
        <img src={wheresWaldo} alt="waldo" className="image" id="image" /> 
        </div>
        </>
    )
}

export default Image;