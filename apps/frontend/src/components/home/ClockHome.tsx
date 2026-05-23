import Clock from '../Clock'
import Picture from '../Picture'
import useAuth from '../../hooks/useAuth';
import DateComponent from '../Date';

import { FaUsers } from 'react-icons/fa';
import useSocket from '../../hooks/useSocket';

const ClockHome = () => {
    const { user, loading } = useAuth();
    const { activeUsers } = useSocket();

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <div className='w-full h-60 rounded-2xl overflow-hidden relative'>

            <img
                src="./bg-2.jpg"
                alt="bg"
                className='w-full h-full object-cover absolute inset-0'
            />

            <div className='absolute inset-0 bg-linear-to-t opacity-80 from-black to-transparent z-10'></div>
            <div className='absolute inset-0 bg-linear-to-r opacity-80 from-black to-transparent z-10'></div>

            <div className='absolute font-[Michroma] text-3xl space-y-2 left-5 bottom-5 z-20 text-white'>
                <Clock />
                <DateComponent />
            </div>

            {
                user && (
                    <div className='absolute top-3 left-5 z-20 text-white'>
                        <div className="flex justify-center items-center gap-3">

                            <Picture user={user} size="xl" />
                            <div>
                                <div className=" font-bold text-sm">{user.username}</div>
                                <div className="text-xs text-gray-600">{user.email}</div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className=' absolute z-20 flex justify-center 
            items-center right-5 text-sm gap-4  bottom-5'>
                <div>
                    Active Users {activeUsers.length}
                </div>
                <FaUsers className='text-3xl' />
            </div>

        </div>
    )
}

export default ClockHome