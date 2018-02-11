import React from 'react';
import Image from "./Image";

import "./index.css";

function Gallery(props) {
    let { images } = props;
    return (
        <div className="gallery-wrapper">
            {images.map((img, i) => <Image key={i}{...img}></Image>)}
        </div>
    )
}

export default Gallery;