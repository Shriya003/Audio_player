import React from 'react';

const Playlist = ({ tracks, onTrackSelect }) => {
  return (
    <div>
      <h1>Playlist</h1>
      <ul>
        {tracks.map((track, index) => (
          <li style={{cursor:'pointer',listStyle:'Number'}} key={index} onClick={() => onTrackSelect(index)}>
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;