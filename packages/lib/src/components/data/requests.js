import { useState, useEffect } from 'react';

const useRequests = (provider) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const update = (newRequests) => {
      setRequests(newRequests);
    };

    provider.listen(update);
    return () => {
      provider.unlisten(update);
    };
  }, []);
  return requests;
};

export default useRequests;
