import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Home = () => {

    const {user} = useAuth();
    return (
         <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">EventHub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover, create, and manage amazing events. Connect with your community and make every gathering memorable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Link
                  to="/events"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Browse Events
                </Link>
                <Link
                  to="/add-event"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Create Event
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

 
      </div>
    </div>
    );
};

export default Home;