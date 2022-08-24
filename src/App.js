import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

import data from "./data";

function App() {
  const [Songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(() => {
    return Songs.filter((song) => song.active === true);
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
      <Library songs={Songs} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
