import React, { useState, useEffect } from 'react';
import { GoGear, GoX } from 'react-icons/go';
import './Streak.css';

interface Props {
  user: string;
  theme: string;
  openConfig: any;
}

const Streak = ({ user, theme, openConfig }: Props) => {
  const [lastEventId, setLastEventId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    `https://streak-stats.demolab.com/?user=${user}&hide_border=true&theme=${theme}`
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user}/events`);
        const events = await response.json();

        if (events.length > 0) {
          const latestEvent = events[0];
          if (latestEvent.id !== lastEventId) {
            setLastEventId(latestEvent.id);
            setImageUrl(`https://streak-stats.demolab.com/?user=${user}&hide_border=true&theme=${theme}&timestamp=${new Date().getTime()}`);
          }
        }
      } catch (error) {
        console.error('Failed to fetch GitHub events:', error);
      }
    };

    fetchEvents(); // Initial fetch
    const intervalId = setInterval(fetchEvents, 300000); // Check every 10 minutes

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [user, theme, lastEventId]);

  return (
    <>
      <div id='titleBar'>
        <span id='blank'></span>
        <span id='gear' onClick={openConfig}><GoGear /></span>
        <span id='close' onClick={() => window.close()}> <GoX /></span>
      </div>

      <div id='streakContainer'>
        <img src={imageUrl} alt="GitHub streak stats" id='streakImg' />
      </div>
    </>
  );
};

export default Streak;