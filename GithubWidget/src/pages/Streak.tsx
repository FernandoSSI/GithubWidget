import { useState, useEffect } from 'react';
import { GoGear } from 'react-icons/go';
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

    fetchEvents(); 
    const intervalId = setInterval(fetchEvents, 600000); 

    return () => clearInterval(intervalId); 
  }, [user, theme, lastEventId]);

  return (
    <>
      <div id='titleBar'>
        <span id='blank'></span>
        <span id='gear' onClick={openConfig}><GoGear /></span>
      </div>

      <div id='streakContainer'>
        <img src={imageUrl} alt="GitHub streak stats" id='streakImg' />
      </div>
    </>
  );
};

export default Streak;