import React, { useRef, useEffect, useState } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ src, onEnded }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener('ended', onEnded);
    return () => {
      audioElement.removeEventListener('ended', onEnded);
    };
  }, [onEnded]);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener('timeupdate', () => {
      setCurrentTime(audioElement.currentTime);
    });
    return () => {
      audioElement.removeEventListener('timeupdate', () => {
        setCurrentTime(audioElement.currentTime);
      });
    };
    
  }, []);

  const handleSeek = (event) => {
    const audioElement = audioRef.current;
    audioElement.currentTime = event.target.value;
  };

  return (
    <div className='seek'>
      <audio controls ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;