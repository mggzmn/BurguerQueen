import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
const Toast = (props) => {
  const { position, visible } = props;
  const [isVisible, setVisibility] = useState(null);
  useEffect(() => {
    setVisibility(visible);
  }, [visible]);
  if (!isVisible) return null;

  setTimeout(() => {
    setVisibility(false);
  }, 4000);

  return (
    <Fade right cascade={true}>
      <div className={`notification-container   ${position} `}>
        <div className={`notification toast ${position}`}>
          <div>
            <p className="notification-message">Enviado Satisfactoriamente</p>
          </div>
        </div>
      </div>
    </Fade>
  );
};
export default Toast;
