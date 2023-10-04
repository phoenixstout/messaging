import "./stylesheets/App.css";
import Header from "./Header";
import Chatbox from "./Chatbox";


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
      <Chatbox />
    </>
  );
}

export default App;
