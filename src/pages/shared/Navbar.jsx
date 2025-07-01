import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MdLogout } from "react-icons/md";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    {
     user?.email &&  
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
    }
     {
     user?.email &&  
      <li>
        <NavLink to="/add-event">Add Event</NavLink>
      </li>
    }
     {
     user?.email &&  
      <li>
        <NavLink to={`/my-event/${user?.email}`}>My Event </NavLink>
      </li>
    }
    </>
  );

  return (
    <div className="bg-base-100 fixed top-0 left-0 right-0 z-50 shadow-lg from-blue-500 to-purple-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost  text-xl font-bold hidden sm:flex"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            ServeTogether
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-4">
          {/* dropdown */}
         {
          user &&  user?.email ? 
                    <div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photo} alt="profile" />
                </div>
              </div>
              <ul
                tabIndex="0"
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                    <span className="text-lg font-medium cursor-default">{user?.name}</span>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="px-6 py-2 text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
                  >
                   LogOut <MdLogout />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          :  
           <Link
            to="/login"
            className="block px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center rounded-md font-medium transition-colors"
          >
             Sign In
          </Link>
         }

        
        </div>
      </div>
    </div>
  );
};

export default Navbar;
