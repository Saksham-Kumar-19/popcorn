import { useEffect } from "react";

// Define the props interface
interface UseKeyDownListenerProps {
  action: () => void;
  keys: string[];
}

function useKeyDownListener({ action, keys }: UseKeyDownListenerProps): void {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const wasAnyKeyPressed: boolean = keys.some((key) => event.key.toLowerCase() === key.toLowerCase());

      if (wasAnyKeyPressed) {
        event.preventDefault();

        action();
      }
    }

    document.addEventListener<"keydown">("keydown", onKeyDown);

    // Cleanup function
    return () => document.removeEventListener<"keydown">("keydown", onKeyDown);
  }, [action, keys]);
}

export default useKeyDownListener;
