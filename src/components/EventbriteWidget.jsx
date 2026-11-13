import { useEffect } from 'react';
import { EVENTBRITE_WIDGET_ID } from '../config/eventbrite';

export default function EventbriteWidget() {
  useEffect(() => {
    // Load the Eventbrite widget script
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the widget after script loads
    script.onload = () => {
      if (window.EBWidgets) {
        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: EVENTBRITE_WIDGET_ID,
          modal: true,
          modalTriggerElementId: 'eventbrite-widget',
    
          onOrderComplete: () => {
            console.log('Order completed');
          },
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!EVENTBRITE_WIDGET_ID || EVENTBRITE_WIDGET_ID === 'your-widget-id') {
    return (
      <div className="bg-brand-cream/20 border-2 border-brand-cream/40 rounded-lg p-8 text-center">
        <p className="text-brand-cream text-lg">
          Eventbrite widget not configured. Add your widget ID to the config to display live events.
        </p>
      </div>
    );
  }

  return (
    <div 
      id="eventbrite-widget"
      className="eventbrite-widget-container"
      data-eventid={EVENTBRITE_WIDGET_ID}
    ></div>
  );
}
