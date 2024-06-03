import { GoGear, GoX } from 'react-icons/go'
import './Streak.css'

const Streak = () => {

  return (
    <div id='streakContainer'>
        
        <div id='titleBar'>
          <span id='gear' ><GoGear/></span>
          <span id='close' onClick={close}><GoX/></span>
        </div>
        <img src="https://streak-stats.demolab.com/?user=FernandoSSI&hide_border=true&theme=tokyonight&locale=pt_BR" alt="" id='streakImg'/>
    </div>
  )
}

export default Streak