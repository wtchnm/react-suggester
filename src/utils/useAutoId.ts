// Modified version of https://yarn.pm/@reach/auto-id.

import { useState, useEffect } from "react";

let isServerHandoffComplete = false;
let counter = 0;
function generateAutoId(prefix: string) {
  counter += 1;
  return prefix + counter.toString();
}

function useAutoId(prefix: string): string | undefined {
  const [autoId, setAutoId] = useState(
    isServerHandoffComplete ? generateAutoId(prefix) : undefined
  );

  useEffect(() => {
    if (isServerHandoffComplete === false) {
      isServerHandoffComplete = true;

      setAutoId(generateAutoId(prefix));
    }
  }, [prefix]);

  return autoId;
}

export default useAutoId;
