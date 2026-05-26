import { useEffect, useRef } from 'react';

export default function TubesCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  useEffect(() => {
    let canvas: HTMLCanvasElement | null = null;

    const initTimer = setTimeout(() => {
      // @ts-ignore
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
        .then(module => {
          const TubesCursor = module.default;
          
          if (containerRef.current) {
            // Create canvas dynamically so React does not manage its lifecycle
            canvas = document.createElement('canvas');
            canvas.className = "absolute inset-0 w-full h-full object-cover";
            containerRef.current.appendChild(canvas);

            const app = TubesCursor(canvas, {
              tubes: {
                colors: ["#092070", "#3b085c", "#638df6"],
                lights: {
                  intensity: 200,
                  colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"]
                }
              }
            });
            appRef.current = app;
          }
        })
        .catch(err => console.error("Failed to load TubesCursor module:", err));
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        try {
          appRef.current.dispose();
        } catch (e) {
          console.warn("Error disposing TubesCursor:", e);
        }
      }
      // Safely clean up container content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  const handleClick = () => {
    if (appRef.current) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      appRef.current.tubes.setColors(newTubeColors);
      appRef.current.tubes.setLightsColors(newLightColors);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0"
    />
  );
}
