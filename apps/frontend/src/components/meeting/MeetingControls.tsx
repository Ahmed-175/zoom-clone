import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { FiCameraOff } from "react-icons/fi";
import { LuCamera } from "react-icons/lu";
import { MdConnectedTv, MdOutlineTvOff } from "react-icons/md";

interface Props {
    isCameraOn: boolean;
    isMicOn: boolean;
    isShareScreen: boolean
    toggleScreen: () => void;
    toggleCamera: () => void;
    toggleMic: () => void;
}

const MeetingControls = ({
    isCameraOn,
    isMicOn,
    isShareScreen,
    toggleCamera,
    toggleMic,
    toggleScreen,
}: Props) => {
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6   px-6 py-3 rounded-2xl ">

            {/* Camera */}
            <button
                onClick={toggleCamera}
                className="flex flex-col items-center text-white hover:scale-105 transition-all duration-200"
            >
                <div className={`text-2xl p-3 rounded-full transition-all duration-200
            ${isCameraOn ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
        `}>
                    {isCameraOn ? <LuCamera /> : <FiCameraOff />}
                </div>
                <span className="text-xs mt-1">Camera</span>
            </button>

            {/* Mic */}
            <button
                onClick={toggleMic}
                className="flex flex-col items-center text-white hover:scale-105 transition-all duration-200"
            >
                <div className={`text-2xl p-3 rounded-full transition-all duration-200
            ${isMicOn ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
        `}>
                    {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </div>
                <span className="text-xs mt-1">Mic</span>
            </button>


            <button
                onClick={toggleScreen}
                className="flex flex-col items-center text-white hover:scale-105 transition-all duration-200"
            >
                <div className={`text-2xl p-3 rounded-full transition-all duration-200
            ${isShareScreen ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-300"}
        `}>
                    {isShareScreen ? <MdConnectedTv /> : <MdOutlineTvOff />}
                </div>
                <span className="text-xs mt-1">Screen</span>
            </button>

        </div>
    );
};

export default MeetingControls;