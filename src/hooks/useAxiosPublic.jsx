import axios from "axios";



const axiosPublic = axios.create({
    baseURL: 'https://event-hub-server-self.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;