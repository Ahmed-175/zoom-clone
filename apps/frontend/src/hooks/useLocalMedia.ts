import { useEffect, useRef, useState } from "react";

export const useLocalMedia = () => {
  const streamRef = useRef<MediaStream | null>(null);
  const screenRef = useRef<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isShareScreen, setIsShareScreen] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    initMedia();

    return () => {
      stopAllTracks();
    };
  }, []);

  const initMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = mediaStream;

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      screenRef.current = screenStream;

      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = screenStream;
      }
    } catch (err) {
      console.error(err);
      setError("Could not access media devices");
    }
  };

  const toggleCamera = () => {
    const stream = streamRef.current;
    if (!stream) return;

    const track = stream.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsCameraOn(track.enabled);
  };

  const toggleMic = () => {
    const stream = streamRef.current;
    if (!stream) return;

    const track = stream.getAudioTracks()[0];
    if (!track) return;

    track.enabled = !track.enabled;
    setIsMicOn(track.enabled);
  };

  const toggleScreen = async () => {
    if (screenRef.current) {
      screenRef.current.getTracks().forEach((t) => t.stop());
      screenRef.current = null;
      setIsShareScreen(false);
      return;
    }

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      screenRef.current = screenStream;

      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = screenStream;
      }

      setIsShareScreen(true);
    } catch (err) {
      console.error(err);
      setError("Screen share failed");
    }
  };

  const stopAllTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    screenRef.current?.getTracks().forEach((t) => t.stop());
  };

  return {
    isCameraOn,
    isMicOn,
    isShareScreen,
    error,

    videoRef,
    screenVideoRef,

    toggleCamera,
    toggleMic,
    toggleScreen,
  };
};
