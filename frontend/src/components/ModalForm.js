import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 37px;
  border-radius: 8px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

// const CloseButton = styled.button`
//   background: #ff4757;
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-top: 10px;

//   &:hover {
//     background: #e84118;
//   }
// `;

const CloseIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Modal = ({ show, onClose }) => {
  if (!show) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);

    const url = "http://localhost:3001/api/addmovie";

    const fetchOptions = {
      method: 'post',
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formdata
    }

    try {
      let response = await fetch(url, fetchOptions)
      if (response.ok) {
        onClose()
        alert("movie upload was successful");
      } else {
        alert("cannot upload movie");
      }
    }
    catch (error) {
      console.error("error occurred while uploading movie: ", error);
      alert("error occurred while uploading movie")
    }
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseIcon onClick={onClose}>&times;</CloseIcon>
        <h2>Upload Movie</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Movie Name</label>
            <input type="text" id="name" name="name" className="form-control" placeholder="Enter Movie name" />
          </div>
          <div className="mb-3">
            <label htmlFor="mediacontent" className="form-label">Media Content (movie or tv show)</label>
            <input type="text" id="mediacontent" name="mediacontent" className="form-control" placeholder="Enter Movie name" />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input type="text" id="duration" name="duration" className="form-control" placeholder="Enter Movie name" />
          </div>
          <div className="mb-3">
            <label htmlFor="genres" className="form-label">Genres</label>
            <input type="text" id="genre" name="genre" className="form-control" placeholder="Enter Movie name" />
          </div>
          <div className="mb-3">
            <label htmlFor="agerating" className="form-label">Age Rating</label>
            <input type="text" id="agerating" name="agerating" className="form-control" placeholder="Enter Movie name" />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Movie Description:</label>
            <textarea id="description" name="description" rows="4" cols="50" placeholder="About Movie..."></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="myfile" className="form-label">Input Movie File</label>
            <br></br>
            <input type="file" id="myfile" name="myfile" accept="video/mp4,video/x-m4v,video/*" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {/* <CloseButton onClick={onClose}>Close</CloseButton> */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
