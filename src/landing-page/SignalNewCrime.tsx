import React from "react";
import PlusIcon from '../icons/plus.svg';
import './SignalNewCrime.css';

const Button = (props: any) => {
  return (<div className="signal-crime-button">
    Signal a new crime
    <div className="signal-crime-icon">
      <img src={PlusIcon} alt="" />
    </div>
  </div>)
};

export default Button;