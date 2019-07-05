import { useState, useEffect } from 'react';
import network from '../../network';

const useRequests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const update = (newRequests) => {
      setRequests(newRequests);
    };

    network.listen(update);
    return () => {
      network.unlisten(update);
    };
  }, []);
  return requests;
};

export default useRequests;
