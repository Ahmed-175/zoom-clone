import Picture from "../Picture";

interface Props {
    videoRef: React.RefObject<HTMLVideoElement>;
    isCameraOn: boolean;
    isShareScreen: boolean;
    screenRef: React.RefObject<HTMLVideoElement>;
    user: any;
}

const MeetingPreview = ({
    videoRef,
    isCameraOn,
    isShareScreen,
    screenRef,
    user,
}: Props) => {

    const noneActive = !isCameraOn && !isShareScreen;

    return (
        <div className="w-260 h-140  mx-auto bg-black rounded-2xl overflow-hidden relative">

            <video
                ref={screenRef}
                autoPlay
                playsInline
                muted
                className={`
                    absolute inset-0 w-260 h-full  
                    ${isShareScreen ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}
                `}
            />

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`
                    object-cover transition-all duration-300
                    ${isCameraOn
                        ? isShareScreen
                            ? "w-64 h-40 absolute bottom-5 right-15 z-20 rounded-xl border border-white/20 shadow-lg"
                            : "absolute inset-0 w-full h-full z-10"
                        : "opacity-0 pointer-events-none"
                    }
                `}
            />

            {noneActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-30">
                    <Picture user={user} size="2xl" />
                </div>
            )}

        </div>
    );
};

export default MeetingPreview;