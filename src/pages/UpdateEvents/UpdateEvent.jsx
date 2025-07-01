import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useEvents from "../../hooks/useEvents";


const UpdateEvent = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [events] = useEvents();

  // Find event by id
  const eventToUpdate = events.find((event) => event._id === id);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (eventToUpdate) {
      setFormData({
        title: eventToUpdate.title || "",
        location: eventToUpdate.location || "",
        description: eventToUpdate.description || "",
        // split datetime into date and time parts
        date: eventToUpdate.dateTime
          ? new Date(eventToUpdate.dateTime).toISOString().split("T")[0]
          : "",
        time: eventToUpdate.dateTime
          ? new Date(eventToUpdate.dateTime).toISOString().split("T")[1].slice(0, 5)
          : "",
      });
    }
  }, [eventToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      title: formData.title,
      name: user?.name, 
      email: user?.email,
      location: formData.location,
      description: formData.description,
      dateTime: new Date(`${formData.date}T${formData.time}`),
      attendeeCount: eventToUpdate?.attendeeCount || []

    };

    try {
      const res = await axiosPublic.put(`/events/${id}`, updatedEvent);

      if (res.data.modifiedCount > 0 || res.status === 200) {
        Swal.fire({
          title: "Event updated successfully!",
          icon: "success",
          draggable: true,
        });
        navigate("/events");
      }
    } catch (error) {
      Swal.fire({
        title: "Update failed",
        text: error.message,
        icon: "error",
        draggable: true,
      });
    }
  };

  if (!eventToUpdate) {
    return  <p className="text-xl font-semibold text-red-500">Event not found!</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Update Event</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Enter event title"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Enter location"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-y"
              placeholder="Enter detailed event description"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
