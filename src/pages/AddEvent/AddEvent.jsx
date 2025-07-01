import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddEvent = () => {
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = {
      title: formData.title,
      name: user?.name,
      email: user?.email,
      location: formData.location,
      description: formData.description,
      dateTime: new Date(`${formData.date}T${formData.time}`),
      attendeeCount: [],
    };

    axiosPublic.post("/events", event).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Event added succesfully !",
          icon: "success",
          draggable: true,
        });
        navigate('/events')
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add Event</h2>
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
              rows={5} // or more for taller input
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
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
