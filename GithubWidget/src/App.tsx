import { useState } from 'react';
import './App.css'
import UserSelection from './pages/UserSelection';
import Streak from './pages/Streak';

function App() {
  const [currentPage, setCurrentPage] = useState<'first' | 'streak'>('first');

  const openStreakPage = () => {
    setCurrentPage('streak');
    window.resizeTo(400, 158)
    
    new Window()
  };

  return (
    <>
      <div id='mainContainer'>
        {currentPage == 'first' && <UserSelection openStreak={openStreakPage} />}
        {currentPage == 'streak' && <Streak />}
      </div>
    </>
  )
}

export default App
