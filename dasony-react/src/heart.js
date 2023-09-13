import React, { useState } from 'react';
import './heart.css';

const HeartIcon = () => {
    const [isFilled, setIsFilled] = useState(false);
    
    const handleHeartClick = () => {
        setIsFilled(!isFilled);
    };

    return (
        <i className={isFilled ? 'bi bi-heart-fill' : 'bi bi-heart'} onClick={handleHeartClick}/>
    );
};

export default HeartIcon;