import { useEffect, useRef } from "react";




  const VideoPlayer = ({ stream }: { stream: MediaStream }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    }, [stream]);

    return (
      <video
        ref={ref}
        autoPlay
        playsInline
        className="w-full h-fit max-h-50  object-cover rounded-xl "
      />
    );
  };

export default VideoPlayer;