import wheresWaldo from "./assets/1_7v_75ZGg1CTmWAw1rEgMHQ.webp";
import useMousePosition from "./hooks/useMousePosition";
import CharacterSelect from "./CharacterSelect";
import { useState, useEffect, useRef } from "react";

const Image = ({ magnified, characterRef, setComplete }) => {
    const mousePosition = useMousePosition();
    const [imageClicked, setImageClicked] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({ left: null, right: null, top: null, bottom: null });
    const [selectedLocation, setLocation] = useState({ x: null, y: null });
    const locatorsRef = useRef(null);
    const imageRef = useRef(null)
    const handleCharacterSelect = () => {
        setImageClicked(!imageClicked);
        setImageDimensions(imageRef.current.getBoundingClientRect())
        const newImage = imageRef.current.getBoundingClientRect();
        if (
            (mousePosition.x >= newImage.left && mousePosition.x <= newImage.right) &&
            (mousePosition.y >= newImage.top && mousePosition.y <= newImage.bottom)
        ) {
            setLocation({ x: mousePosition.x - newImage.left, y: mousePosition.y - newImage.top })
        }
    }
    const addLocator = (x = mousePosition.x, y = mousePosition.y) => {
        const parent = locatorsRef.current
        const newDiv = document.createElement("div");
        newDiv.classList.add("locator");
        const locatorSize = 20
        newDiv.style.top = `${y - (locatorSize / 2)}px`;
        newDiv.style.left = `${x - (locatorSize / 2)}px`;
        newDiv.style.width = `${locatorSize}px`
        newDiv.style.height = `${locatorSize}px`
        parent.appendChild(newDiv)
    }

    const makeSelection = () => {
        if (!imageClicked) {
            addLocator();
        }
        handleCharacterSelect();
    }
    useEffect(() => {
        const image = imageRef.current
        setImageDimensions(image.getBoundingClientRect())
    }, [magnified])

    useEffect(() => {
        const handleResize = () => {
            const image = imageRef.current.getBoundingClientRect();
            setImageDimensions(image)
        };
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize) }
    }, [])

    let transform = `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`;;
    //original image dimensions : 2828 * 1828
    // find a calculated value for the -33 on x and y for varying image sizes
    let xAdjust = (imageDimensions.width / 2828) + 30
    let yAdjust = (imageDimensions.height / 1828) + 30
    let magnifyX = -(mousePosition.x - imageDimensions.left - xAdjust) * (2828 / imageDimensions.width);
    let magnifyY = -(mousePosition.y - imageDimensions.top - yAdjust) * (1828 / imageDimensions.height);
    let backgroundPosition = `${magnifyX}px ${magnifyY}px`;

    return (
        <>
            {imageClicked ?
                <CharacterSelect
                    selectedLocation={selectedLocation} setImageClicked={setImageClicked} setComplete={setComplete}
                    locatorsRef={locatorsRef} imageDimensions={imageDimensions} characterRef={characterRef}
                />
                : null
            }
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
            <div ref={locatorsRef} onClick={makeSelection}>
                <div id="locators"></div>
                <img src={wheresWaldo} alt="waldo" className="image" id="image" ref={imageRef} />
            </div>
        </>
    )
}

export default Image;