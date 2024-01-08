import React, { useState, useEffect } from 'react';

interface TimerProps {
    onStop: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ onStop }) => {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    };

    const padZero = (value: number): string => {
        return String(value).padStart(2, '0');
    };

    const handleStopClick = () => {
        onStop(time);
    };

    return (
        <div>
            <span>{formatTime(time)}</span>
            <button onClick={handleStopClick}>Stop Timer</button>
        </div>
    );
};

export default Timer;
