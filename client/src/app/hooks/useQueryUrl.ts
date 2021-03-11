import { useEffect, useState } from 'react';

export function useQueryUrl(key: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = params.get(key) || '';
    setValue(found);
  }, [value, setValue]);

  return value;
}
