import "./stylesheets/App.css";
import Header from "./Header";
import { Link } from "react-router-dom";


function App() {
  const user = localStorage.getItem("user");

  if (!user) {
    return (
      <>
        <Header></Header>
        <div>Log in to see the best messaging app on the planet</div>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <div>Welcome back {user}</div>
      <Link to={'/messages'}>New Message</Link>
    </>
  );
}

export default App;
