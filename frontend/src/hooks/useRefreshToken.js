import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
let response
        try{
         response = await axios.get('http://localhost:5000/api/users/refresh', {
            withCredentials: true
        });}catch (error) {
            console.error('Refresh error:', error);
        }
        setAuth(prev => {
            console.log("PREV",JSON.stringify(prev));
            console.log("NEW",response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;