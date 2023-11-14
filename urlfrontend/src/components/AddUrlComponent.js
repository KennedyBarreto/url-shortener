import React, { useState } from 'react'
import axios from "axios";

const AddUrlComponent = () => {
    const [url, setUrl] = useState("https://");

    
    const onSubmit = (e)=> {
        e.preventDefault();

        if (!url) {
          alert("Valor em branco");
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
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.message);
          });
        alert("Link encurtado com sucesso");
        setUrl("https://");
        window.location.reload();
      }
    }
    console.log(url)

  return (
    <div>
      <main>
        <section className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="mb-2 fs-1">Encurtador de Url</h1>
          <form className="w-50" onSubmit={onSubmit}>
            <input
              className="w-100 border border-primary p-2 mb-2 fs-3 h-25"
              type="text"
              placeholder="https://www.exemplo.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-danger m-5">
              Encurtar
            </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddUrlComponent;