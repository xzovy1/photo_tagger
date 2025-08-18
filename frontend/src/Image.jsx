import wheresWaldo from "./assets/1_7v_75ZGg1CTmWAw1rEgMHQ.webp";
import useMousePosition from "./hooks/useMousePosition";
import { useState, useEffect } from "react";

const Image = ({imageClicked, setImageClicked, setLocation, magnified}) => {
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
    const addLocator = (x, y) => {
        console.log(x,y)
        const parent = document.getElementById("locators")
        const newDiv = document.createElement("div");
        newDiv.classList.add("locator");
        newDiv.style.position = "absolute";
        const size = 30
        newDiv.style.top = `${y - (size/2)}px`;
        newDiv.style.left = `${x - (size /2)}px`;
        newDiv.style.width = `${size }px`
        newDiv.style.height = `${size }px`
        parent.appendChild(newDiv)
    }
    useEffect(()=>{
        const image = document.getElementById("image")
        setImagePosition(image.getBoundingClientRect())
    },[])

    const mousePosition = useMousePosition();
    let transform = `translateX(${mousePosition.x }px) translateY(${mousePosition.y }px)`;;
    //original image dimensions : 2828 * 1828
    // find a calculated value for the -27 on x and y for varying image sizes
    let magnifyX = -(mousePosition.x - imagePosition.left - 27 ) * (2828 / imagePosition.width);
    let magnifyY = -(mousePosition.y - imagePosition.top - 27) *  (1828 / imagePosition.height)
    let backgroundPosition = `${magnifyX}px ${magnifyY}px`
    return (
        <>
        {
            magnified ? 
            <div id="magnifier" style={{
                transform, 
                backgroundImage: `url(${wheresWaldo})`, 
                backgroundPosition,
                backgroundRepeat: "no-repeat",
                top: 0,
                left: 0
            }}></div>  
            : null   
        }
        <div id="locators"></div>
        <div onClick={()=>{
            handleCharacterSelect();
            addLocator(mousePosition.x, mousePosition.y);
        }}>
        <img src={wheresWaldo} alt="waldo" className="image" id="image" /> 
        </div>
        </>
    )
}

export default Image;