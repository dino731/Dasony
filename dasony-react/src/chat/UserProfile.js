import Modal from "react-modal";
import React from "react";
import './UserProfile.css';
// import { useState } from "react";

const profile = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '220px',
      outline : 'none'
    }
};

const UserProfile = ({isOpen, closeModal, username}) => {

    return(
        <Modal
            isOpen = {isOpen}
            onRequestClose={closeModal}
            style={profile}
        >
        <div id="profile">
                <img id="profileimg" src="/resources/common-img/dasony-logo.png"/>
            <b id="username">{username}</b>
        </div>
        <button id="modalCloseBtn" onClick={closeModal}>✖</button>
        </Modal>
    )

}
export default UserProfile;