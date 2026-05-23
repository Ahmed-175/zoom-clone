import React from 'react';
import { BiVideoRecording, BiUserPlus, BiGroup, BiHistory, BiVideo } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
    const features = [
        {
            to: '/create-meeting',
            icon: BiVideoRecording,
            label: 'Create Meeting',
            gradient: 'from-indigo-500 to-indigo-700',
        },
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

    return (
        <div className="flex flex-wrap w-full mt-8 gap-4 justify-center">
            {features.map((feature) => (
                <Link
                    key={feature.to}
                    to={feature.to}
                    className={`bg-gradient-to-br ${feature.gradient} text-center p-8 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-md`}
                >
                    <feature.icon className="text-4xl mx-auto" />
                    <div className="text-center mt-1 text-sm font-medium">{feature.label}</div>
                </Link>
            ))}
        </div>
    );
};

export default HomeComponent;