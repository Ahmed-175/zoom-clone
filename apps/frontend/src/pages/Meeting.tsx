import { useParams } from "react-router-dom";
import MeetingController from "../components/meeting/MeetingController";
import { useLocalMedia } from "../hooks/useLocalMedia";
import usePeerRTC from "../hooks/usePeerRTC";
import VideoPlayer from "../components/meeting/VideoPlayer";

const Meeting = () => {
  const { id } = useParams();
  if (!id) return
  const { streamRef, streamElementRef, toggleAudio, toggleCamera, onAudio, onCamera } = useLocalMedia();
  const stream = streamRef.current!
  const { remoteStreams } = usePeerRTC(stream, id);
  return (
    <div className="w-full  flex flex-wrap  h-screen relative">
      <div className=" w-[70%] p-5 h-[80vh]  overflow-hidden  ">
        <video ref={streamElementRef} autoPlay muted playsInline className="w-full h-full object-cover rounded-xl " />
      </div>

      <div className="w-[30%] space-y-7 p-5 overflow-y-auto h-screen">

        {Object.entries(remoteStreams).map(([userId, stream]) => (
          <VideoPlayer key={userId} stream={stream.stream as any} />
        ))}

      </div>


      <MeetingController
        toggleAudio={toggleAudio}
        toggleCamera={toggleCamera}
        onAudio={onAudio}
        onCamera={onCamera} />
    </div>
  )
}

export default Meeting;