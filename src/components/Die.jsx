import React from "react";
export default function Die({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die" style={styles} onClick={holdDice}>
      {value}
    </div>
  );
}
