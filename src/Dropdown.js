import React from 'react'
import './Dropdown.css'

export default function Dropdown(props) {
  const { options,selectedOption,onChangeOption } = props;
  return (
      <select value={selectedOption} onChange={onChangeOption}>
        {options.map(option => {
          return <option key={option.id} value={option.name}>{option.name}</option>
        })}
      </select>
  )
}
