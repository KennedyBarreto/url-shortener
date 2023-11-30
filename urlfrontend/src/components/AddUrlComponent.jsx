import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { QRCodeCanvas } from 'qrcode.react';
import { BooleanContext } from '../context/StateContext';


const AddUrlComponent = () => {
    const [url, setUrl] = useState("https://");
    const [title, setTitle] = useState(""); //novo state de teste pro titulo
    const { toggleBooleanValue } = useContext(BooleanContext);
    
    const onSubmit = (e)=> {
        e.preventDefault();
        toggleBooleanValue();
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
    
          const data = {
            origUrl: url
            //shortTitle: title, // Utiliza o valor do título como shortTitle
          };
    
          //axios
          //.post('http://localhost:3333/check-url', { urlId: title })
          //.then((res) => {
            // Se o URL estiver disponível (não existe no banco de dados), então pode enviar os dados para criar o URL encurtado
            axios.post('https://api.innovlink.click/short', data)
            .then(response => {

              const notify = () => toast.success("URL encurtada com sucesso!");
              notify();
              const shortenedUrl = response.data; // Obtém as respostas
        
              // Atualiza o estado Link com o URL encurtado retornado pelo servidor
              setUrls([shortenedUrl]);
              
        
              // Limpa a mensagem de erro, se houver
              
            })
            .catch(error => {
              console.error('Erro ao encurtar URL:', error);
              
            });
          /*})
          .catch((err) => {
             // Trate o erro caso ocorra uma falha na verificação do URL
          }); */
      }
        
        setUrl("https://");
        
      }
    
    
    console.log(url)

  const canvasRef = useRef();
  const handleButtonClicked = () => {
    const canvas = canvasRef.current.children[0]?.children[0];
    const pngFile = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.download = "QrCode";
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [urls, setUrls] = useState([]);


    

    const copyToClipboard = async (shortUrl) => {
      try {
        await navigator.clipboard.writeText(shortUrl);
        toast.success('URL copiada para a área de transferência!');
      } catch (error) {
        console.error('Erro ao copiar:', error);
      }
    };

  return (
    <div id="header">
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
          title="A url deve começar com http:// ou https:// !"
          onChange={(e) => setUrl(e.target.value)}
        />

<input
  className="form-control me-2 fs-5 w-50"
  type="text"
  disabled
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
  <section>

  <div>

      {urls.map((url, idx) => (

        urls ? <div id="resultado"
        key={idx}>

            <div id="OrigUrl" className="OrigUrl">
              <p className="text-center">
                {url.origUrl}
              </p>
            </div>
            
            <div id="ShortUrl" className="ShortUrl" > 
                <a
                  
                  id={`shortUrl-${idx}`}
                  href={url.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                > <p className="text-center">
                  {url.shortUrl}
                  </p>
                </a>
                </div>

                <div className='botoes'>
                  <button
                    
                    type="button"
                    onClick={() => copyToClipboard(url.shortUrl)}
                  >
                    Copiar
                  </button>
               
                
                <button onClick={handleShow}>
        QR
      </button>
      </div>
      
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body ><div ref={canvasRef}>
        <div className="container d-flex flex-row justify-content-center
            align-items-center p-2 text text-decoration-none">
          <QRCodeCanvas value={url.shortUrl} />
        </div>
      </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleButtonClicked}>
            Salvar Imagem
          </Button>
        </Modal.Footer>
      </Modal>

        </div> : null
      ))}

    </div>

  </section>
</div>
  );
}

export default AddUrlComponent;