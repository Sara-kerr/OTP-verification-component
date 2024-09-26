import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [correctCode, setCorrectCode] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const digitCode = e.target.value;

    const newOtp = [...otp];
    newOtp[index] = digitCode;
    setOtp(newOtp);

    if (digitCode && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    console.log(inputRefs.current);

    console.log(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClick = () => {
    const enteredCode = otp.join("");
    enteredCode === "0000" ? setCorrectCode(true) : setCorrectCode(false);
  };
  return (
    <>
      <div className="container">
        <h3>Verify your email adress</h3>
        <p>
          A four-digit code has been sent to your email name@frontendpro.dev{" "}
        </p>
        <p>Please enter the code bellow to verify your email adress</p>

        <div className="otp-container">
          {otp.map((digit, index) => {
            return (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(input) => (inputRefs.current[index] = input)}
              />
            );
          })}
        </div>

        <button className="verify-btn" onClick={handleClick}>
          Verify OTP
        </button>

        {correctCode === true && <p>OTP Verified Successfully!</p>}
        {correctCode === false && <p>Wrong OTP, please try again</p>}
      </div>
    </>
  );
}

export default App;
