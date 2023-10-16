import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import "./Snackbar.css";

const Snackbar = forwardRef((props, ref) => {
    
        // const [showSnackbar, setShowSnackbar] = useState(false);

        

        // useImperativeHandle(ref, () => ({
        //   show() {
        //     alert("snackbarshow")
        //   },
        // }))

        const [isClosed, setIsClosed] = useState(false);

        

  return (
    <div
      onClick={() => setIsClosed(true)}
      className="snackbar"
      style={{
        backgroundColor: props.type === "success" ? "#00F593" : "#FF0033",
        display: isClosed ? "none" : "flex"
      }}
    >
      <div className="symbol">
        {props.type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className="message">{props.message}</div>
      <div>X</div>
    </div>
  );
});

export default Snackbar;
