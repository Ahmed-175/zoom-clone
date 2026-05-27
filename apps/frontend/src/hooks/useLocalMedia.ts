import { useEffect, useRef, useState } from "react";

export const useLocalMedia = () => {
  const [onCamera, setOnCamera] = useState(false);
  const [onAudio, setOnAudio] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const streamElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (streamElementRef.current) {
        streamElementRef.current.srcObject = stream;
      }

      setOnCamera(true);
      setOnAudio(true);
    };

    init();

    return () => {
      const stream = streamRef.current;

      stream?.getTracks().forEach((t) => {
        t.stop;
      });

      streamRef.current = null;
    };
  }, []);

  const toggleCamera = () => {
    const stream = streamRef.current;
    const videoTrack = stream?.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    setOnCamera(videoTrack.enabled);
  };

  const toggleAudio = () => {
    const stream = streamRef.current;
    const audioTrack = stream?.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setOnAudio(audioTrack.enabled);
  };

  console.log(streamRef.current?.getTracks());
  return {
    streamElementRef,
    streamRef,
    onAudio,
    onCamera,
    toggleCamera,
    toggleAudio,
  };
};
