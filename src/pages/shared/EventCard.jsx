import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoMdTimer } from "react-icons/io";
import { MdPersonPinCircle } from "react-icons/md";

const EventCard = ({ event, user, onJoin, joiningId }) => {
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(event.dateTime);
  eventDate.setHours(0, 0, 0, 0);

  const diffDays = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));

  const attendees = event.attendeeCount || [];
  const isJoined = attendees.includes(user?.email);
  

  const isPast = diffDays < 0;
  const isJoining = joiningId === event._id;
  const canJoin = !isJoined && !isPast && !isJoining;

  const status = (() => {
    if (isPast)
      return { text: "Past Event", color: "bg-gray-100 text-gray-600" };
    if (diffDays === 0)
      return { text: "Today", color: "bg-green-100 text-green-700" };
    if (diffDays === 1)
      return { text: "Tomorrow", color: "bg-blue-100 text-blue-700" };
    if (diffDays <= 7)
      return {
        text: `In ${diffDays} days`,
        color: "bg-orange-100 text-orange-700",
      };
    return {
      text: `In ${diffDays} days`,
      color: "bg-purple-100 text-purple-700",
    };
  })();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
          >
            {status.text}
          </span>
        </div>

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

        {/* Location */}
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">
            <CiLocationOn />
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-gray-800 font-medium">{event.location}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Attendees */}
          <div className="text-sm text-gray-600 font-medium">
              {attendees.length} {attendees.length === 1 ? "attendee" : "attendees"}
          </div>

          {/* Join Button */}
          <button
            onClick={() => onJoin(event._id)}
            disabled={!canJoin}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
              !canJoin
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {isPast
              ? "Event Passed"
              : isJoined
              ? "Joined"
              : isJoining
              ? "Joining..."
              : "Join Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
