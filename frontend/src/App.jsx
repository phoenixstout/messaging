import "./stylesheets/App.css";
import Chatbox from "./Chatbox";


function App() {
  const user = localStorage.getItem("user");

  if (!user) {
    return (
      <>
        <div>Log in to see the best messaging app on the planet</div>
      </>
    );
  }

  return (
    <>
      <div>Welcome back {user}</div>
      <Chatbox />
    </>
  );
}

export default App;
