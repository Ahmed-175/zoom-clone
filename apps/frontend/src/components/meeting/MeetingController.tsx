import React from 'react'
import { FiCamera, FiCameraOff } from 'react-icons/fi'
import { LuMic, LuMicOff } from 'react-icons/lu'
import { MdTv, MdTvOff } from 'react-icons/md'



interface IMeetingControllerProp {
    onCamera: boolean
    onAudio: boolean

    toggleCamera: () => void
    toggleAudio: () => void
}

const MeetingController = ({ onAudio, onCamera, toggleAudio, toggleCamera }: IMeetingControllerProp) => {
    const actions = [
        {
            lebal: "Camera",
            onIcon: FiCamera,
            offIcon: FiCameraOff,
            on: onCamera,
            action: toggleCamera

        },
        {
            lebal: "Audio",
            onIcon: LuMic,
            offIcon: LuMicOff,
            on: onAudio,
            action: toggleAudio

        },
        {
            lebal: "Screen",
            onIcon: MdTv,
            offIcon: MdTvOff,
            on: false,
            action: () => { }

        }
    ]
    return (
        <div className=" absolute bottom-5 left-100 right-100 flex justify-center gap-10 ">
            {
                actions.map((a, i) => (
                    <div
                        onClick={a.action}
                        key={i}
                        className={`text-center cursor-pointer w-20 duration-300 p-2 text-white
                        rounded-lg   ${a.on ? "bg-black " : "bg-red-600  "} `}>
                        {a.on ? (
                            <a.onIcon className='text-2xl w-full' />
                        ) : (
                            <a.offIcon className='text-2xl w-full' />
                        )}

                        <div className='w-full '>{a.lebal}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default MeetingController