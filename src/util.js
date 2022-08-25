export const playAudio = (isPlaying, audioRef, setIsPlaying) => {
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
