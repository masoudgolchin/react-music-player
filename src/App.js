import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(() => {
    return songs.filter((song) => song.active === true);
  });

  return (
    <div className="App">
      <Song currentSong={currentSong[0]} />
      <Player />
    </div>
  );
}

export default App;
