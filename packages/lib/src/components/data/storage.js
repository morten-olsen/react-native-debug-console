import { useState, useEffect } from 'react';

const useStorage = (provider) => {
  const [data, setData] = useState({});

  const update = async () => {
    const keys = await provider.getAllKeys();
    const values = await Promise.all(keys.map(key => provider.getItem(key)));
    const data = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = values[i];
      data[key] = value;
    }
    setData(data);
  };

  const removeItem = async (name) => {
    await provider.removeItem(name);
    await update();
  }

  const clear = async () => {
    await provider.clear();
    await update();
  }

  useEffect(() => {
    update().catch(err => console.error(err));
  }, []);

  return {
    data,
    update,
    removeItem,
    clear,
  }
}

export default useStorage;
