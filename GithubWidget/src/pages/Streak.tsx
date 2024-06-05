import { GoGear, GoX } from 'react-icons/go'
import './Streak.css'
import { useState } from 'react'

interface props{
  user: string,
  theme: string
}

const Streak = ({user, theme}: props) => {

  const url = "https://streak-stats.demolab.com/?user=" + user + "&hide_border=true&theme=" + theme 


  return (
    <>
      <div id='titleBar'>
        <span id='blank'></span>
        <span id='gear' ><GoGear /></span>
        <span id='close' onClick={close}> <GoX /></span>
      </div>

      <div id='streakContainer'>
        <img src= {url} alt="" id='streakImg' />
      </div>

    </>

  )
}

export default Streak