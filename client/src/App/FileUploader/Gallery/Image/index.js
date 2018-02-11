import React from 'react';

import "./index.css";

function Image(props) {
    let { imgUrl, errMsg } = props;
    let style = { backgroundImage: `url(${props.imgUrl})` }
    return (
        errMsg ?
            <div>{errMsg}</div>
            :
            <div className="image-wrapper" style={style}>
            </div>
    )
}

export default Image;
