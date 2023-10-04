import { Link } from "react-router-dom"

export default function NewMessage() {

    return (
        <div>
            <Link to={'/messages'}>New Message</Link>
        </div>
    )
}