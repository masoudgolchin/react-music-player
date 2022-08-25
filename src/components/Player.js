import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { HandleButtonsVisibility } from "../util";

const Player = ({
  setSongInfo,
  songInfo,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  timeUpdateHandler,
  songs,
  setCurrentSong,
  setSongs,
  backRef,
  playRef,
  forwardRef,
}) => {
  useEffect(() => {
    const newSongs = songs.map((state) => {
      if (state.id === currentSong.id) {
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

    // Disable back and forward buttons
    HandleButtonsVisibility(songs, currentSong, forwardRef, backRef);
  }, [currentSong]);

  // Event Handlers
  const playSongHandler = (e) => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex = direction === "back" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < songs.length) {
      await setCurrentSong([songs[newIndex]]);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // Add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "00:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          ref={backRef}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          ref={playRef}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          ref={forwardRef}
        />
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
};

export default Player;
