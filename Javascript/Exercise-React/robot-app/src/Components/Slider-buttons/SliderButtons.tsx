import React, { FunctionComponent } from 'react';
import '../../CSS/media-queries.css';
import '../../CSS/playtech-section1.css';

const SliderButtons: FunctionComponent<any> = () => {
    return (
        <div className="slider-buttons">
            <div>
                <button id="previous">&lt; Previous</button>
                <button id="next">Next &gt;</button>
            </div>
        </div>
    )
};

export default SliderButtons;


