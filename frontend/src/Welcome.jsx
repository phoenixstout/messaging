import './stylesheets/Welcome.css'

export default function Welcome() {
    return (
        <>
        <div className="welcome-wrapper">
            <h2>Welcome to EZMessage</h2>
            <p>This is a Full-Stack project featuring REACT, NodeJS, Express, and MongoDB.</p>
            <p>The top features are:</p>
            <ol>
                <li>Secure user storage with hashing through BCryptJS</li>
                <li>Session management with JSON Web Tokens and PassportJS</li>
                <li>RESTful NodeJS api hosted on an AWS EC2 instance</li>
                <li>Optimized MongoDB interactions for autocomplete search</li>
                <li>User-friendly frontend made with REACT</li>
                <li>And much more!!!</li>
            </ol>
            <p>The best way to see is by clicking "Login" at the top and continuing as a demo user. Feel free to play around!</p>
            <p>You can also check out the source code at <a href='https://github.com/phoenixstout/messaging' target='_blank'>My GitHub Page</a></p>
        </div>
        </>
    )
}