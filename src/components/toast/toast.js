import React from 'react';
import './toast.css';


export function toast({value , color}) {
  return (
    <>
     <div className='alert' style={{backgroundColor: color}}>{value} <span className='close-btn'>X</span></div>
    </>
  )
}
