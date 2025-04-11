// src/components/Buttons/Button4/Button4.tsx

import React from "react";

interface Button4Props {
  text: string;
  onClick: () => void;
}

const Button4: React.FC<Button4Props> = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button4;
