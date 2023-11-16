import React, { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddUrlComponent = () => {
    const [url, setUrl] = useState("https://");
    const notify = () => toast("Wow so easy!");
    
    const onSubmit = (e)=> {
        e.preventDefault();
       
        if (!url) {
          
          return;
        }

        if (url.substring(0,7) !== "http://" && url.substring(0,8) !== "https://"){
          alert("Digite uma url que comece com 'http:// ou https://'");
          return;
        } else {

          localStorage.setItem("url", url);

        axios
          .post("http://localhost:3333/short", {origUrl: url})
          .then(res => {
            
          })
          .catch(err => {
            console.log(err.message);
          });
        
        setUrl("https://");
        
      }
    }
    
    console.log(url)

  return (
    <div>
  <main>
    <section className="container d-flex flex-column justify-content-center align-items-center">
      <h1 className='titulo'>Encurtador de URL</h1>
      <form className="d-flex align-items-center w-75" onClick={notify} onSubmit={onSubmit}>
        <input
          className="form-control me-2 fs-5"
          type="text"
          placeholder="https://www.exemplo.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-lg">
          Encurtar
        </button>
      </form>
    </section>
  </main>
  <ToastContainer />
</div>
  );
}

export default AddUrlComponent;