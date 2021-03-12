import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export function useQueryUrl(key: string) {
  const [value, setValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const found = params.get(key) || '';
    setValue(found);
  }, [value, setValue, key, location]);

  return value;
}
