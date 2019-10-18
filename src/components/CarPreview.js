import React, {useState} from 'react';
import classNames from 'classnames';

import Point from './Point.js';
import './CarPreview.css';

function CarPreview({
    carName,
    carDescription,
    carPicture,
    carParts,
    pointsColor
}) {
    const [activePart, setActivePart] = useState();
    const [showInfo, setShowInfo] = useState();

    return (
        <div className="car-container">
            <img
                alt=""
                src={carPicture}
            />

            <div className="car-title">
                <h1>{carName}</h1>
                <p>{carDescription}</p>
            </div>

            <div className="car-parts">
                <div className="car-parts-points">
                    {carParts.map((carPart, index) => (
                        <Point
                            color={pointsColor}
                            key={index}
                            x={carPart.x}
                            y={carPart.y}
                            onMouseEnter={() => {
                                setActivePart(carPart);
                                setShowInfo(true);
                            }}
                            onMouseLeave={() => {
                                setShowInfo(false);
                            }}
                        />
                    ))}
                </div>

                <div className={classNames(
					'car-parts-info',
					{
						'in': activePart && showInfo,
						'out': activePart && !showInfo
					}
				)}>
                    {activePart && (
                        <React.Fragment>
                            <h2>{activePart.name}</h2>
                            <p>{activePart.description}</p>
                        </React.Fragment>
                    )}
                </div>

                <div className="car-parts-info-help">
					Move the mouse pointer over the dots to discover more
                </div>
            </div>
        </div>
    );
}

export default CarPreview;