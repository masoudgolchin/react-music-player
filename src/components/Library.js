import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  audioRef,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library${libraryStatus ? " active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              setCurrentSong={setCurrentSong}
              key={song.id}
              song={song}
              songs={songs}
              audioRef={audioRef}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
