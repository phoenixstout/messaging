import "./stylesheets/Account.css";
import { useRef, useState } from "react";



export default function Account() {
  const user_id = localStorage.getItem('user_id')
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [changed, setChanged] = useState(false);
  const [status, setStatus] = useState("");

  if(!user_id) {
    return window.location.href = '/'
  }

  function handleImageUpload(e) {
    const [file] = e.target.files;
    if (file) {
      if(file.size>1.6e7) return setStatus('too big')
      setChanged(true);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", uploadedImage.current.file);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/photo`, {
      method: "POST",
      headers: {
        authorization: "bearer " + localStorage.getItem("x-access-token"),
      },
      body: formData,
    });

    if (response) {
      window.location.reload()
      setStatus(response.statusText)};

  }

  return (
    <>
      <div className="profile-pic-wrapper">
        <div>Profile Picture:</div>
        <form action="" encType="multipart/form-data">
          <input
            className="file-input"
            type="file"
            ref={imageUploader}
            accept="image/*"
            onChange={handleImageUpload}
            multiple={false}
          />
        </form>
        <div
          className="img-wrapper"
          onClick={() => imageUploader.current.click()}
        >
          <img className="profile-pic" ref={uploadedImage} />
        </div>
      </div>
      <div className="changed-wrapper">
        {changed ? <button onClick={handleSubmit}>Save Changes</button> : null}
      </div>
      <div>{status}</div>
    </>
  );
}
