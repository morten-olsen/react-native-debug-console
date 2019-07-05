import { useEffect, useState } from 'react';

const useLog = (provider) => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const update = (newLogs) => {
      setLogs([...newLogs]);
    }
    provider.listen(update);

    return () => {
      provider.unlisten(update);
    }
  }, []);
  return logs;
};

export default useLog;
