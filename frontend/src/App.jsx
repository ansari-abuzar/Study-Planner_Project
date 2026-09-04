import { useState } from "react";
import Register from "../../frontend/src/components/Register.jsx";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
  }
  return (
    <>
      <Register />
    </>
  );
}
export default App;
