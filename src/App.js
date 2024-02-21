import React, { useState, useEffect } from 'react';
import './App.css';
import AudioUploader from './AudioUploader';
import Playlist from './Playlist';
import AudioPlayer from './AudioPlayer';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  useEffect(() => {
    // Load playlist and last playing track from localStorage on initial render
    const savedTracks = JSON.parse(localStorage.getItem('tracks')) || [];
    if (savedTracks) {
      setTracks(savedTracks);
    }
    const lastTrackIndex = parseInt(localStorage.getItem('lastTrackIndex'), 10);
    setTracks(savedTracks);
    setCurrentTrackIndex(lastTrackIndex);
  }, []);

  const handleUpload = (file) => {
    const newTrack = { name: file.name, url: URL.createObjectURL(file) };
    setTracks([...tracks, newTrack]);
    localStorage.setItem('tracks', JSON.stringify([...tracks, newTrack]));
  };

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    localStorage.setItem('lastTrackIndex', index.toString());
  };

  const handleTrackEnd = () => {
    if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      localStorage.setItem('lastTrackIndex', (currentTrackIndex + 1).toString());
    }
  };

  return (

    <div className='main'>
      <h1 className='header'>Audio Player</h1>
      <AudioUploader onUpload={handleUpload} />
      <Playlist tracks={tracks} onTrackSelect={handleTrackSelect} />
      {currentTrackIndex !== null && (
        <AudioPlayer
          src={tracks[currentTrackIndex]?.url}
          onEnded={handleTrackEnd}
        />
      )}
    </div>
  );
};

export default App;