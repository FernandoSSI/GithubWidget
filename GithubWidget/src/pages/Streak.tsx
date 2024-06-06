import { GoGear, GoX } from 'react-icons/go'
import './Streak.css'

interface props{
  user: string,
  theme: string,
  openConfig: any
}

const Streak = ({user, theme, openConfig}: props) => {

  const url = "https://streak-stats.demolab.com/?user=" + user + "&hide_border=true&theme=" + theme 


  return (
    <>
      <div id='titleBar'>
        <span id='blank'></span>
        <span id='gear' onClick={openConfig}><GoGear /></span>
        <span id='close' onClick={close}> <GoX /></span>
      </div>

      <div id='streakContainer'>
        <img src= {url} alt="" id='streakImg' />
      </div>

    </>

  )
}

export default Streak