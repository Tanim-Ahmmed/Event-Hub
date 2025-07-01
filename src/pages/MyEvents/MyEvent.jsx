import useAuth from "../../hooks/useAuth";
import { SlCalender } from "react-icons/sl";
import { IoMdTimer } from "react-icons/io";
import { MdPersonPinCircle } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Assuming you're using this
import { Link } from "react-router-dom";
import useEvents from "../../hooks/useEvents";

const MyEvent = () => {
  const { user } = useAuth();
  const [events,isLoading, refetch] = useEvents();
  const axiosPublic = useAxiosPublic();

  const myEvents = events?.filter(event => event?.email === user?.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/events/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your event has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="mt-10"> 
    <div className="container mx-auto px-6">
      {myEvents.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event) => {
            const date = new Date(event.dateTime);
            const formattedDate = date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div key={event._id}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-4 text-blue-100">
                      <div className="flex items-center space-x-2">
                        <SlCalender />
                        <span className="text-sm font-medium">{formattedDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IoMdTimer />
                        <span className="text-sm font-medium">{formattedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <MdPersonPinCircle />
                      <div>
                        <p className="text-sm text-gray-500">Organized by</p>
                        <p className="font-semibold text-gray-800">{event.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">
                        <CiLocationOn />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-800 font-medium">{event.location}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-700 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600 font-medium">
                        Attendees: {event?.attendeeCount?.length || 0}
                      </div>
                       <div className="flex gap-3">
                       <Link
                        to={`/update-event/${event._id}`}
                        className="px-4 py-2 rounded-lg bg-blue-400 text-white font-semibold transition-all duration-200 hover:bg-red-600"
                      >
                       Update 
                      </Link>

                      <button
                        onClick={() => handleDelete(event._id)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold transition-all duration-200 hover:bg-red-600"
                      >
                        Delete
                      </button>
                       </div>
                

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
};

export default MyEvent;
