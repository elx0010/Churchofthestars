import { useEffect } from 'react';

export default function EventbriteWidget() {
  useEffect(() => {
    // Load the SociableKIT Eventbrite widget script
    const script = document.createElement('script');
    script.src = 'https://widgets.sociablekit.com/eventbrite-events/widget.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      className="sk-eventbrite-event w-full"
      data-embed-id="25729438"
    ></div>
  );
}
