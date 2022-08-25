import React from "react";

const LibrarySong = ({
  song,
  isPlaying,
  setIsPlaying,
  songs,
  audioRef,
  setCurrentSong,
  setSongs,
}) => {
  const songSelectHandler = () => {
    setCurrentSong([song]);
    const newSongs = songs.map((state) => {
      if (state.id === song.id) {
        return {
          ...state,
          active: true,
        };
      } else {
        return {
          ...state,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
      setIsPlaying(true);
    }
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song${song.active ? " selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
