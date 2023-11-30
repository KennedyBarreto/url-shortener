import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUrlComponent = () => {
    const [url, setUrl] = useState("https://");
    const [urls, setUrls] = useState([]);
    const [title, setTitle] = useState(); //novo state de teste pro titulo

    const onSubmit = (e)=> {

        e.preventDefault();
        if (!url) {
          const notify = () => toast.error("Campo em Branco");
          notify();
          return;
        }
          else {
    
          const data = {
            origUrl: url,
            shortTitle: title, // Utiliza o valor do título como shortTitle
          };
    
          axios
          .post('http://localhost:3333/check-url', { urlId: title })
          .then((res) => {
            // Se o URL estiver disponível (não existe no banco de dados), então pode enviar os dados para criar o URL encurtado
            axios.post('http://localhost:3333/short', data)
            .then(response => {
              const shortenedUrl = response.data; // Obtém as respostas
        
              // Atualiza o estado Link com o URL encurtado retornado pelo servidor
              setUrls(prevUrls => [...prevUrls, shortenedUrl]);
              
        
              // Limpa a mensagem de erro, se houver
              
            })
            .catch(error => {
              console.error('Erro ao encurtar URL:', error);
              
            });
          })
          .catch((err) => {
<<<<<<< HEAD
            const notify = () => toast.error("Titulo indisponivel!");
            notify();
          }); 
      }
=======
             // Trate o erro caso ocorra uma falha na verificação do URL
          }); */
      };
>>>>>>> parent of c6bd5c3 (feat: changes to match the live version)
        
        setUrl("https://");
        
      }

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


  <div className="UrlResult container justify-content-center align-items-center w-50">

{urls.map((url, idx) => ( //aqui vao ser renderizados os dados da requisição

  <div id="resultado"
  key={idx} className="container d-flex flex-row justify-content-center align-items-center">

      
        <p className="text-center">
          {url.origUrl}
        </p>
      
        <p className="text-center">
            {url.shortUrl}
        </p>
          
          

  </div>
))}

</div>

</div>
  );
}

export default AddUrlComponent;