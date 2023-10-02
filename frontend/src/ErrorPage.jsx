import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <h1>Oops! Nothing to see here</h1>
      <Link to='/' >Click here to go back</Link>
    </>
  );
}