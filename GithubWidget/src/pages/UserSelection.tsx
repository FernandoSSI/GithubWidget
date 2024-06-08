import { useState, useEffect } from 'react';
import './UserSelection.css';
import axios from 'axios';
import { GoCheck } from "react-icons/go";

interface props {
  openStreak: any;
  setUser: any;
  setThemeProp: any;
  themeProp: string;
  user?: string;
}

function UserSelection({ openStreak, setUser, setThemeProp, themeProp, user }: props) {
  const [username, setUsername] = useState(user);
  const [name, setName] = useState()
  const [profilePic, setProfilePic] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(themeProp);
  const [nick, setNick] = useState(username)

  const fetchProfilePic = async (username: string) => {
    setError('');
    setProfilePic('');

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfilePic(response.data.avatar_url);
      setUser(username)
      setName(response.data.name)
      setNick(username)
    } catch (error) {
      setError('Usuário não encontrado');
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfilePic(user);
    }

  }, [user]);

  useEffect(() => {
    setThemeProp(theme)
  }, [theme])

  const handleSubmit = async () => {
    if (username) {
      fetchProfilePic(username);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const openStreakPage = () => {
    openStreak();
  };

  return (
    <>
      <div id='titleBar'>
        <span id='blank'></span>
      </div>

      <div id='containerMainView'>
        <div id='imgContent'>
          {profilePic && <div>
            <img src={profilePic} alt="" id='userImg' />
            <h2 id='nameH2'>{name}</h2>
            <p id='usernameP'>@{nick}</p>
            <div id='confirmDiv'>
              <button id='confirmUser' onClick={openStreakPage}>It's me!</button>
            </div>
          </div>}

          {profilePic == '' && <div>
            <img src="src\assets\icons8-github-512.png" alt="" id='userImg' />
            
          </div>}


        </div>

        <hr />

        <div id='UserSelectionContainer'>
          <h2>Github widget</h2>
          <div id='inputContainer'>
            <input
              type="text"
              placeholder='Username'
              id='usernameIpt'
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              value={username}
            />

            <button id='confirmNickBtn' onClick={handleSubmit}>
              <GoCheck />
            </button>
          </div>
          <div>

            <select
              name=""
              id="selectTheme"
              onChange={e => setTheme(e.target.value)}
              value={theme}
            >
              <option value="default">default</option>
              <option value="dark">dark</option>
              <option value="tokyoNight">tokyo night</option>
              <option value="radical">radical</option>
              <option value="onedark">onedark</option>
              <option value="cobalt">cobalt</option>
              <option value="gotham">gotham</option>
              <option value="graywhite">graywhite</option>


            </select>
          </div>
          {error && <p>{error}!</p>}
        </div>
      </div >
    </>
  );
}

export default UserSelection;
