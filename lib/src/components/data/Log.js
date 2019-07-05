import { useEffect, useState } from 'react';
import log from '../../log';

const useLog = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const update = (newLogs) => {
      setLogs([...newLogs]);
    }
    log.listen(update);

    return () => {
      log.unlisten(update);
    }
  }, []);
  return logs;
};

export default useLog;
