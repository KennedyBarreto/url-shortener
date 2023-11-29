import React, { useState, useContext } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BooleanContext } from '../context/StateContext';


const AddUrlComponent = () => {
    const [url, setUrl] = useState("https://");
    const [title, setTitle] = useState(); //novo state de teste pro titulo
    const { toggleBooleanValue } = useContext(BooleanContext);
    
    const onSubmit = (e)=> {
      toggleBooleanValue();
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
          .post("http://localhost:3333/short", {origUrl: url, shortTitle: title}) //add o parametro title na chamada do endpoint
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
  className="form-control me-2 fs-5 w-50"
  type="text"
  placeholder="Titulo (opcional)"
  value={title}
  title="Máximo 15 caracteres, apenas letras, números e traços"
  onChange={(e) => {
    const inputValue = e.target.value;

    // Aplicando regex para permitir apenas letras, números e "-"
    const filteredValue = inputValue.replace(/[^A-Za-z0-9-]/g, '');

    // Limitando o tamanho máximo para 15 caracteres
    const trimmedValue = filteredValue.slice(0, 15);

    // Atualizando o estado com o valor filtrado e limitado
    setTitle(trimmedValue);
  }}
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