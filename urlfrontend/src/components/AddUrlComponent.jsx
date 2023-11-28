import React, { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddUrlComponent = () => {
    const [url, setUrl] = useState("https://");
    const [title, setTitle] = useState();
    
    
    const onSubmit = (e)=> {
        e.preventDefault();
       
        if (!url) {
          const notify = () => toast.error("Campo em Branco");
          notify();
          return;
        } else if (url.substring(0,7) !== "http://" && url.substring(0,8) !== "https://"){
          const notify = () => toast.error("A URL deve começar com http:// ou https://");
          notify();
          return;
        }
          else if (url.length<=8){
          const notify = () => toast.error("Digite uma URL para começar!");
          notify();
          return;
        } 
          else {
          const notify = () => toast.success("URL encurtada com sucesso!");
          notify();
          localStorage.setItem("url", url);

        axios
          .post("http://localhost:3333/short", {origUrl: url, shortTitle: title})
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
      <h1 className='titulo'>INNOVLINK</h1>
      <h2 className='subtitulo'>Encurte seus links com rapidez</h2>
      <form className="d-flex align-items-center w-75" onSubmit={onSubmit}>
        <input
          className="form-control me-2 fs-5"
          type="text"
          placeholder="https://www.exemplo.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

<input
          className="form-control me-2 fs-5"
          type="text"
          placeholder="MeuLink"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-dark btn-lg">
          Encurtar
        </button>
      </form>
    </section>
  </main>

</div>
  );
}

export default AddUrlComponent;