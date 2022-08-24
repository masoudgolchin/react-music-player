import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(() => {
    return songs.filter((song) => song.active === true);
  });

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong[0]} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong[0]}
      />
    </div>
  );
}

export default App;
