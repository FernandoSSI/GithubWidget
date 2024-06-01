import { useState } from 'react'
import './UserSelection.css'
import axios from 'axios';
import { GoCheck, GoX } from "react-icons/go";

function UserSelection() {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setProfilePic('');

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfilePic(response.data.avatar_url);
    } catch (error) {
      setError('Usuário não encontrado');
    }
  };

  const cancel = () => {
    setProfilePic('');
  }


  return (
    <>
      {/*<img src="https://github-readme-streak-stats.herokuapp.com/?user=FernandoSSI&theme=tokyonight" alt="" />*/}
      <div id='UserSelectionContainer'>

        <h2>Hi, welcome to your github widget!</h2>
        <p>Add your github username to get started!</p>
        <input type="text" placeholder='Username' id='usernameIpt' onChange={e => setUsername(e.target.value)} />
        <button id='confirmNickBtn' onClick={handleSubmit}><GoCheck /></button>

        {
          profilePic != '' && <>
            <div id='imgContent'>
              <img src={profilePic} alt="" id='userImg' />
              <p>is this you?</p>
              <div>
                <button id='confirmUser'><GoCheck /></button> <button id='denyUser' onClick={() => setProfilePic('')}><GoX /></button>
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