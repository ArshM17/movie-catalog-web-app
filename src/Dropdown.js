import React from 'react'

export default function Dropdown(props) {
  const { options } = props;
  return (
      <select>
        Hi
        {/* {options.map(option => {
          <option key={option} value={option}>{option}</option>
        })} */}
      </select>
  )
}
