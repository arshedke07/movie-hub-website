import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Modal = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #474e5d;
  padding-top: 50px;
`;

const ModalContent = styled.form`
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 80%;
  padding: 16px;
`;

const Container = styled.div`
  padding: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;

  &:focus {
    background-color: #ddd;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.cancel ? "#f44336" : "#04AA6D")};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`;


const Clearfix = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

const HR = styled.hr`
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
`;

const SignupForm = () => {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleButtonClick(e) {
    e.preventDefault()
    const url = "http://localhost:3001/adduser"

    try {
      const response = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ firstname, lastname, email, password, mobile, gender }),
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Cannot Sign In")
      }

      navigate("/dashboard")
      console.log("email: ", email)
    } catch (err) {
      setError(err.message)
      alert(error)
    }

    // var form = document.getElementById("form")
    // if (form.checkValidity()) {
    //   form.submit()
    //   navigate("/dashboard")
    // }

  }

  return (
    <div>
      <Modal id="modal" show='true'>
        <ModalContent id="form" onSubmit={handleButtonClick}>
          <Container>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <HR />

            <label htmlFor="firstname"><b>First Name</b></label>
            <Input type="text" value={firstname} placeholder="Enter First Name" name="firstname" onChange={(e) => setFirstName(e.target.value)} required />

            <label htmlFor="lastname"><b>Last Name</b></label>
            <Input type="text" value={lastname} placeholder="Enter Last Name" name="lastname" onChange={(e) => setLastName(e.target.value)} required />

            <label htmlFor="email"><b>Email</b></label>
            <Input type="email" value={email} placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password"><b>Password</b></label>
            <Input type="password" value={password} placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} required />

            {/* <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <Input
                            type="password"
                            placeholder="Repeat Password"
                            name="psw-repeat"
                            required
                        /> */}

            <label htmlFor="mobile"><b>Mobile Number</b></label>
            <Input type="text" value={mobile} placeholder="Enter Mobile Number" name="mobile" onChange={(e) => setMobile(e.target.value)} required />

            <label htmlFor="gender"><b>Gender</b></label>
            <Input type="text" value={gender} placeholder="Enter Gender" name="gender" onChange={(e) => setGender(e.target.value)} required />

            <p>
              By creating an account you agree to our <a href="/">Terms & Privacy</a>.
            </p>

            <Clearfix>
              <Button type="submit">
                Sign Up
              </Button>
            </Clearfix>
          </Container>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignupForm;
