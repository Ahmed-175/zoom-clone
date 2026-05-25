import React from 'react';
import { BiVideoRecording, BiUserPlus, BiGroup, BiHistory, BiVideo } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { createMeeting } from '../../services/meeting.service';
import useToast from '../../hooks/useToast';

const features = [
    {
        to: '/join-meeting',
        icon: BiUserPlus,
        label: 'Join Meeting',
        gradient: 'from-teal-500 to-teal-700',
    },
    {
        to: '/active-users',
        icon: BiGroup,
        label: 'Active Users',
        gradient: 'from-pink-500 to-pink-700',
    },
    {
        to: '/recordings',
        icon: BiHistory,
        label: 'User Recordings',
        gradient: 'from-amber-500 to-amber-700',
    },
    {
        to: '/active-meeting',
        icon: BiVideo,
        label: 'Active Meeting',
        gradient: 'from-cyan-500 to-cyan-700',
    },
];

const HomeComponent = () => {
    const navigator = useNavigate();
    const { showError } = useToast();

    const handleCreateMeeting = async () => {
        try {
            const meetingId = await createMeeting();
            navigator(`/meeting/${meetingId}`)
        } catch (error: any) {
            console.log(error);
            showError(error?.response?.data?.message || "Something went wrong")

        }
    }

    return (
        <div className="flex flex-wrap w-full mt-8 gap-4 justify-center">
            <div
                onClick={handleCreateMeeting}
                className={` bg-indigo-500 text-white cursor-pointer  text-center p-8 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-md`}
            >
                <BiVideoRecording className="text-4xl mx-auto" />
                <div className="text-center mt-1 text-sm font-medium">Create Meeting</div>
            </div>


            {features.map((feature) => (
                <Link
                    key={feature.to}
                    to={feature.to}
                    className={`bg-gradient-to-br text-white ${feature.gradient} text-center p-8 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-md`}
                >
                    <feature.icon className="text-4xl mx-auto" />
                    <div className="text-center mt-1 text-sm font-medium">{feature.label}</div>
                </Link>
            ))}
        </div>
    );
};

export default HomeComponent;