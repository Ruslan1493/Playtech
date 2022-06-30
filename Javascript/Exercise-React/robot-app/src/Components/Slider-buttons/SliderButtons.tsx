import React, { FunctionComponent } from 'react';
import { SliderButtonsProps } from '../../interfaces/types';
import '../../CSS/media-queries.css';
import '../../CSS/playtech-section1.css';

const SliderButtons: FunctionComponent<SliderButtonsProps> = ({prevRobot, nextRobot}) => {
    return (
        <div className="slider-buttons" style={{display: 'block'}}>
            <div>
                <button id="previous" onClick={prevRobot}>&lt; Previous</button>
                <button id="next" onClick={nextRobot}>Next &gt;</button>
            </div>
        </div>
    )
};

export default SliderButtons;


