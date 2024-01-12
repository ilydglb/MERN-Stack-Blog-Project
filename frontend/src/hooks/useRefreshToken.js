import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();


  const refresh = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/refresh', {
        withCredentials: true
      });

      const newAccessToken = response.data.accessToken;

      // Update auth context with the new access token
      setAuth((prev) => {
        console.log("PREV: ", JSON.stringify(prev));
        console.log("NEW: ", response.data);

        return { ...prev, accessToken: newAccessToken };
      });

      console.log("New Access Token:", newAccessToken);

     
      return newAccessToken;
    } catch (error) {
      console.error('Refresh error:', error);
      throw error; // Re-throw the error for the calling code to handle
    }
  };

  return refresh;
};

export default useRefreshToken;
