import useAuth from "../hooks/useAuth";
import { useLocalMedia } from "../hooks/useLocalMedia";

import MeetingPreview from "../components/meeting/MeetingPreview";
import MeetingControls from "../components/meeting/MeetingControls";

const CreateMeeting = () => {
    const { user } = useAuth();

    const {
        isCameraOn,
        isMicOn,
        isShareScreen,

        toggleCamera,
        toggleMic,
        toggleScreen,

        videoRef,
        screenVideoRef
    } = useLocalMedia();

    return (
        <div className="w-full relative h-screen flex p-6 gap-6">

            <MeetingPreview
                videoRef={videoRef as any}
                screenRef={screenVideoRef as any}
                isShareScreen={isShareScreen}
                isCameraOn={isCameraOn}
                user={user}
            />
            <MeetingControls
                isShareScreen={isShareScreen}
                toggleScreen={toggleScreen}
                isCameraOn={isCameraOn}
                isMicOn={isMicOn}
                toggleCamera={toggleCamera}
                toggleMic={toggleMic}
            />

        </div>
    );
};

export default CreateMeeting;