import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useEvents = (searchTerm) => {
  const axiosPublic = useAxiosPublic();

  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ['events', searchTerm],
    queryFn: async () => {
      const res = await axiosPublic.get('/events', {
        params: {  search: searchTerm  }
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  return [events, isLoading, refetch];
};

export default useEvents;
