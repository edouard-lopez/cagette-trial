import React from "react";

function Moyenne({stat}) {
  return (
    <p>
    <b>Moyenne&thinsp;:</b>
    <span>&nbsp;{stat.numeric}&thinsp;🥕</span>
  </p>
  );
}

export default Moyenne