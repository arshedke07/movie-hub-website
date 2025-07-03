import React, { use, useState } from "react";
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

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleButtonClick(event) {
    event.preventDefault()
    const url = "http://localhost:3001/api/login"
    const data = new URLSearchParams({
      email,
      password
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Invalid Credentials")
      }

      let responseData = await response.json()
      // console.log(responseData)
      if (responseData && responseData.usertype) {
        if (responseData.usertype === "creator") {
          navigate('/creatordashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error("Unexpected response format");
      }

    } catch (err) {
      setError(err.message)
      console.log(error)
    }
  }

  return (
    <div>
      <Modal id="modal" show='true'>
        <ModalContent id="form">
          <Container>
            <h1>Login</h1>
            <p>Enter your details to login.</p>
            <HR />

            <label htmlFor="email"><b>Email</b></label>
            <Input type="email" value={email} placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password"><b>Password</b></label>
            <Input type="password" value={password} placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} required />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
              Dont have an Account? <a href="/signup">Register Now</a>.
            </p>

            <Clearfix>
              <Button type="submit" onClick={handleButtonClick}>
                Login
              </Button>
            </Clearfix>
          </Container>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginForm;
