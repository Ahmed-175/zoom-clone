import React from 'react';
import type { IUser } from '../types/user.type';

interface PictureProps {
  user: IUser;
  size: 'lg' | 'xl' | '2xl';
}

const sizeClasses = {
  lg: 'w-10 h-10 text-lg',
  xl: 'w-12 h-12 text-xl',
  '2xl': 'w-16 h-16 text-2xl',
};

const Picture: React.FC<PictureProps> = ({ user, size }) => {
  const pictureUrl = user.picture
    ? `${import.meta.env.VITE_URL}/${user.picture}`
    : null;

  const firstLetter = user.username?.charAt(0).toUpperCase() || '?';

  if (pictureUrl) {
    return (
      <img
        src={pictureUrl}
        alt={user.username}
        className={`rounded-lg object-cover ${sizeClasses[size]}`}
      />
    );
  }

  return (
    <div
      className={`rounded-lg bg-blue-600 text-white 
        flex items-center justify-center font-extrabold  ${sizeClasses[size]}`}
    >
      {firstLetter}
    </div>
  );
};

export default Picture;