import React from "react";
import SigninButton from "./singin";

const Appbar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b shadow">
      <SigninButton />
    </header>
  );
};

export default Appbar;
