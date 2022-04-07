import React from 'react';
import './trash.css';
import PinImg from '../../Images/pin.svg';

export default function Trash() {
  return (
    <>
    <div className="notes-container">
    <input className='search-bar' type="search" name="search" id="search" placeholder='Search...' />
        <h3>Trash</h3>
        <div className="pinned-notes">

          <div className="note">
              <div className="pinned-icon"><img className='pin-icon' src={PinImg} alt="pin-tag" /></div>
              <div className="title">Title of the note</div>
              <div className="desc">Body of the Note</div>
              <div className="note-date">Created on 26/12/2021</div>
              <div className="note-icons">
                  <div className="note-icon"><i className="note-icon-paint lni lni-paint-roller"></i></div>
                  <div className="note-icon"><i className="note-icon-archive lni lni-archive"></i></div>
                  <div className="note-icon"><i className="note-icon-label lni lni-tag"></i></div>
                  <div className="note-icon"><i className="note-icon-trash lni lni-trash-can"></i></div>
              </div>
          </div>

        </div>
    </div>
    </>
  )
}
