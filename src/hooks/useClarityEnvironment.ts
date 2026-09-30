import { useCallback, useEffect, useState } from 'react';
import {
  applyClarityEnvironment,
  CLARITY_ENV,
  type ClarityEnvironment,
  setClarityEnvironment,
} from '../lib/clarity';

/** Keeps the Clarity label and the /dev status in sync on the client only. */
export function useClarityEnvironment() {
  // Production is the stable initial render; localStorage is read only after mount.
  const [environment, setEnvironment] = useState<ClarityEnvironment>(CLARITY_ENV.PRODUCTION);

  useEffect(() => {
    setEnvironment(applyClarityEnvironment());
  }, []);

  const updateEnvironment = useCallback((nextEnvironment: ClarityEnvironment) => {
    setClarityEnvironment(nextEnvironment);
    setEnvironment(nextEnvironment);
  }, []);

  return { environment, setEnvironment: updateEnvironment };
}
