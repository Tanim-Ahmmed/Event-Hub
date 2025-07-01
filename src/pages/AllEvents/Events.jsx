import { useState, useMemo } from 'react'
import useEvents from '../../hooks/useEvents'
import EventCard from '../shared/EventCard'
import useAuth from '../../hooks/useAuth'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import Loading from '../shared/Loading'
import Swal from 'sweetalert2';
import {
  isToday,
  isThisWeek,
  isThisMonth,
  subWeeks,
  subMonths,
  isWithinInterval
} from 'date-fns'


const Events = () => {

  const { user } = useAuth()
  const axiosPublic = useAxiosPublic();
  const [joiningId, setJoiningId] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOption, setFilterOption] = useState('all')

  const [events, loading, refetch] = useEvents(searchTerm)

const handleJoin = (id) => { 
  setJoiningId(id);
  axiosPublic.post(`/events/${id}/join`, { email: user?.email }, { withCredentials: true })  // send email here
    .then((res) => {
      if (res.data.message === "Successfully joined the event") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully joined the event!",
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
      }
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Failed to join event"
      });
    })
    .finally(() => {
      setJoiningId(null);
    });
};



  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.dateTime)
      const now = new Date()

      let matchesFilter = true

      switch (filterOption) {
        case 'today':
          matchesFilter = isToday(eventDate)
          break
        case 'current-week':
          matchesFilter = isThisWeek(eventDate, { weekStartsOn: 0 })
          break
        case 'last-week':
          matchesFilter = isWithinInterval(eventDate, {
            start: subWeeks(new Date(), 2),
            end: subWeeks(new Date(), 1)
          })
          break
        case 'current-month':
          matchesFilter = isThisMonth(eventDate)
          break
        case 'last-month':
          matchesFilter = isWithinInterval(eventDate, {
            start: subMonths(new Date(), 2),
            end: subMonths(new Date(), 1)
          })
          break
        default:
          matchesFilter = true
      }

      return matchesFilter
    })
  }, [events, filterOption])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Events</h1>
          <p className="text-gray-500 text-lg">Browse & Join Events Happening Now</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
          />
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="all">All Events</option>
            <option value="today">Today</option>
            <option value="current-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="current-month">This Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>

        {loading ? (
          <div>
           <Loading></Loading>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">No events found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                user={user}
                joiningId={joiningId}
                onJoin={handleJoin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Events
