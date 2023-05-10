import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { TextField, Button, Link } from "@mui/material";
import { makeStyles } from "@mui/styles"; 
import Chip from "@mui/material/Chip";
import emailjs from "emailjs-com";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState();
  const [error,setError] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
        setShow(false);
    setName("");
    setEmail("");
     setTimeout(() => setShow(false), 5000);
      sendEmail(name, email);
  };

    const sendEmail = (name, email) => {

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          { from_name: name, reply_to: email },
          import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then(
          (result) => {
            console.log(result.text);
            setError(error.text);
            setShow(true);
          },
          (error) => {
            console.log(error.text);
            setError(error.text);
            setShow(true);
          }
        );
    };

    const handleHelp = (value) => {
      if(value === "eg"){

        window.open(
          "https://docs.google.com/spreadsheets/d/1jHPsu3xad7G2HYSJ37SXUYmZFliq7WVq/edit?usp=sharing&ouid=111750445049011782199&rtpof=true&sd=true",
          "_blank"
        );
      }
      else{
        window.open("https://youtu.be/ef8UqXU6ofE", "_blank");

      }
    };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const checkEmailFormat = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const checkEmailLength = () => {
    return email.length > 0;
  };

  const checkEmailContent = () => {
    const contentRegex = /[a-zA-Z0-9_\-+.]+/;
    return contentRegex.test(email);
  };

  const checkNameLength = () => {
    return name.length > 0;
  };

  const finalCheck = () => {
    return (
      checkEmailFormat() &&
      checkEmailLength() &&
      checkEmailContent() &&
      checkNameLength()
    );
  };

  return (
    <div className="app">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ padding: 0, margin: 0, color: "#b5dbfb" }}>
          Relay Routing
        </h1>
        <p>A capacitated vehicle routing system</p>
      </div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <div className="rules">
        <ul>
          <li className={"passed"}>Paid Service</li>
          <li className={checkEmailFormat() ? "passed" : "missing"}>
            Fit Email Form, Bro!
          </li>
          <li
            className={
              checkEmailLength() && checkNameLength() ? "passed" : "missing"
            }
          >
            Double the fields.
          </li>
          <li className={checkEmailContent() ? "passed" : "missing"}>
            No Symbols Left Behind
          </li>
        </ul>
      </div>
      <button onClick={handleSubmit} disabled={finalCheck() ? false : true}>
        {" "}
        Submit{" "}
      </button>
      <p style={{ opacity: show ? 1 : 0, color: "pink", transition: "1s" }}>
        {error
          ? "Something went wrong"
          : "You will shortly recieve an email from us"}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          onClick={() => handleHelp("tutorial")}
          variant="outlined"
          label="Video Tutorial"
          style={{
            marginInline: 10,
            borderColor: "pink",
            padding: 10,

            color: "pink",
          }}
        />
        <Chip
          onClick={() => handleHelp("eg")}
          variant="outlined"
          label="Example"
          style={{
            marginInline: 10,
            borderColor: "pink",
            padding: 10,

            color: "pink",
          }}
        />
        <Chip
          onClick={() =>
            window.open(
              "https://www.ijnrd.org/papers/IJNRD2304236.pdf",
              "_blank"
            )
          }
          variant="outlined"
          label="Research Paper"
          style={{
            marginInline: 10,
            borderColor: "pink",
            padding: 10,

            color: "pink",
          }}
        />
      </div>
      <footer>
        <a
          href="https://joshipiyush9969.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          Piyush Joshi
        </a>
      </footer>
    </div>
  );
}

export default App;
