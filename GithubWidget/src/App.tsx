import { useState } from 'react';
import './App.css'
import UserSelection from './pages/UserSelection';
import Streak from './pages/Streak';

function App() {
  const [currentPage, setCurrentPage] = useState<'first' | 'streak'>('first');
  const [username, setUsername] = useState('')
  const [theme, setTheme] = useState('')

  const openStreakPage = () => {
    setCurrentPage('streak');
    window.resizeTo(400, 183)
  };

  return (
    <>
      <div id='mainContainer'>
        {currentPage == 'first' && <UserSelection openStreak={openStreakPage} setUser={setUsername} />}
        {currentPage == 'streak' && <Streak user={username} theme={theme} />}
      </div>
    </>
  )
}

export default App
