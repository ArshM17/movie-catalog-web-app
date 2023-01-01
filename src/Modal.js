import React from 'react'

const overlay = {
  position:'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zindex:1000
}

const modalstyle = {
  position:'fixed',
  width: '50%',
  top:'50%',
  left:'50%',
  transform: "translate(-50%,-50%)",
  backgroundColor: 'white',
  padding:"10px",
  zindex:1000
}

export default function Modal({open,onClose}) {
  if(!open) return null;
  return (
    <>
      <div style={overlay}/>
      <div style={modalstyle}>
        Modal
        <button onClick={onClose}>X</button>
      </div>
    </>
  )
}
