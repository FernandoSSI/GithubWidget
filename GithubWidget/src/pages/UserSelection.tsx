import { useState } from 'react'
import './UserSelection.css'
import axios from 'axios';
import { GoCheck, GoX } from "react-icons/go";

interface props {
  openStreak: any;
  setUser: any
  setTheme: any
}

function UserSelection({ openStreak, setUser, setTheme }: props) {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setProfilePic('');

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfilePic(response.data.avatar_url);
      setUser(username)
    } catch (error) {
      setError('Usuário não encontrado');
    }
  }

  const openStreakPage = () => {
    openStreak()
  };

  return (
    <>

      <div id='titleBar'>
        <span id='blank'></span>
        <span id='close' onClick={close}> <GoX /></span>
      </div>
      <div id='UserSelectionContainer'>

        <h2>Github widget</h2>
        <input type="text" placeholder='Username' id='usernameIpt' onChange={e => setUsername(e.target.value)} />
        <button id='confirmNickBtn' onClick={handleSubmit}><GoCheck /></button>

        {
          profilePic != '' && <>
            <div id='imgContent'>
              <img src={profilePic} alt="" id='userImg' />

              <div>
                <select name="" id="selectTheme" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)}>
                  <option value="default">default</option>
                  <option value="tokyoNight">tokyo night</option>
                </select>

              </div>
              <div id='confirmDiv'>
                <button id='confirmUser' onClick={openStreakPage}><GoCheck /></button> <button id='denyUser' onClick={() => setProfilePic('')}><GoX /></button>
              </div>
            </div>

          </>
        }

        {
          error != '' && <p>{error} !</p>
        }
      </div>
    </>
  )
}

export default UserSelection