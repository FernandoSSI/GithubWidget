import { useState } from 'react';
import './App.css'
import UserSelection from './pages/UserSelection';
import Streak from './pages/Streak';

function App() {
  const [currentPage, setCurrentPage] = useState<'first' | 'streak'>('first');
  const [username, setUsername] = useState('')
  const [theme, setTheme] = useState('')

  const handlePage = () => {
    if(currentPage == 'first'){
      setCurrentPage('streak');
      window.resizeTo(400, 183)
    } else {
      setCurrentPage('first');
      window.resizeTo(350, 525)
    }

   
  };

  return (
    <>
      <div id='mainContainer'>
        {currentPage == 'first' && <UserSelection openStreak={handlePage} setUser={setUsername} setTheme={setTheme} user={username}/>}
        {currentPage == 'streak' && <Streak user={username} theme={theme} openConfig = {handlePage} />}
      </div>
    </>
  )
}

export default App
