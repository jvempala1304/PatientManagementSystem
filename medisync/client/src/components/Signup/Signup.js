import React, { useState, useRef } from "react";
import email_image from "../../assets/email.png";
import passwordUnlock from "../../assets/passwordUnlock.png";
import phone from "../../assets/phone.png";
import password_image from "../../assets/password.png";
import doctor from "../../assets/doctor.png";
import doctorLogo from "../../assets/doctorLogo.webp";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const phoneNumber = useRef();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [validationError, setValidationError] = useState("");

  const validateInputs = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const confirmPasswordValue = confirmPassword.current.value;
    const phoneValue = phoneNumber.current.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return "Please enter a valid email address.";
    }

    if (!/^\d{10}$/.test(phoneValue)) {
      return "Please enter a 10-digit phone number.";
    }

    if (passwordValue !== confirmPasswordValue) {
      return "Passwords do not match.";
    }

    return "";
  };

  const signupWithEmail = async (e) => {
    e.preventDefault();
    const error = validateInputs();
    if (error) {
      setValidationError(error);
      return;
    }

    setIsRegistering(true);
    doCreateUserWithEmailAndPassword(
      email.current.value,
      password.current.value
    ).catch((err) => {
      setIsRegistering(false);
    });
  };

  const loginWithGoogle = async (e) => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  const handleInputChange = () => setValidationError("");

  return (
    <main style={styles.main}>
      <div style={styles.mainLeft}>
        <div>
          <img style={styles.leftImg} src={doctorLogo} alt="doctorLogo" />
        </div>
        <div>
          <img style={styles.leftImg2} src={doctor} alt="doctor" />
        </div>
      </div>
      <div style={styles.mainRight}>
        <p style={styles.text}>Sign Up</p>
        <form action="#">
          <div style={styles.one}>
            <div>
              <img style={styles.icon} src={email_image} alt="Email Icon" />
            </div>
            <input
              style={styles.inputs}
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              ref={email}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.one}>
            <div>
              <img
                style={styles.icon}
                src={password_image}
                alt="Password Icon"
              />
            </div>
            <input
              style={styles.inputs}
              type="password"
              placeholder="password"
              name="password"
              id="password"
              ref={password}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.one}>
            <div>
              <img
                style={styles.icon}
                src={passwordUnlock}
                alt="Confirm Password Icon"
              />
            </div>
            <input
              style={styles.inputs}
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              id="confirm-password"
              ref={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.one}>
            <div>
              <img style={styles.icon} src={phone} alt="Phone Icon" />
            </div>
            <input
              style={styles.inputs}
              type="text"
              placeholder="phone number"
              name="phoneNumber"
              id="phone-number"
              ref={phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <a href="/login" style={styles.three}>
            Already have an account? Log in
          </a>
        </div>
        <div style={styles.btns}>
          <button style={styles.btn} onClick={signupWithEmail}>
            Sign Up
          </button>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.btns}>
          <button style={styles.btn} onClick={loginWithGoogle}>
            Sign up with Google
          </button>
        </div>
        {validationError && <div style={styles.error}>{validationError}</div>}
      </div>
    </main>
  );
};

const styles = {
  main: {
    boxSizing: "border-box",
    height: "calc(100vh - 120px)",
    width: "100%",
    padding: "3% 8%",
    background: "rgb(234, 244, 254)",
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    color: "rgb(112, 112, 112)",
    textAlign: "center",
    fontSize: "23px",
    fontWeight: 600,
    padding: "0 8px",
  },
  mainLeft: {
    width: "50%",
    position: "relative",
  },
  leftImg: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
  },
  leftImg2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    left: "300px",
    top: "100px",
  },
  mainRight: {
    width: "450px",
    height: "95%",
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  one: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "15px 0",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "18px",
    height: "18px",
    left: "25px",
  },
  btns: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  inputs: {
    border: "none",
    width: "85%",
    height: "48px",
    borderRadius: "5px",
    paddingLeft: "40px",
  },
  btn: {
    width: "80%",
    height: "50px",
    color: "rgb(56, 147, 227)",
    backgroundColor: "#e4f0fe",
    marginTop: "10px",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  divider: {
    height: "1px",
    backgroundColor: "#ccc",
    width: "100%",
    margin: "20px 0",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Signup;
