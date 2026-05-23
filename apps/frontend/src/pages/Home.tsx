import ClockHome from '../components/home/ClockHome';
import HomeComponent from '../components/home/HomeComponent';

const Home = () => {

  return (
    <div className='flex justify-center mt-20 w-full h-screen'>
      <div className='w-250'>
        <ClockHome />
        <HomeComponent />
      </div>
    </div>
  )
}

export default Home;