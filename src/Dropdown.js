import React from 'react'
import './Dropdown.css'

export default function Dropdown(props) {
  const { options } = props;
  return (
      <select>
        {options.map(option => {
          return <option key={option} value={option}>{option}</option>
        })}
      </select>
  )
}
