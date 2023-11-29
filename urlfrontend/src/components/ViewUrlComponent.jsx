import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {QRCodeCanvas} from 'qrcode.react';
import { useRef } from "react";
import { BooleanContext } from '../context/StateContext';

const ViewUrlComponent= () => {
  const { booleanValue } = useContext(BooleanContext);
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
    const campo = localStorage.getItem("url");

    useEffect(() => {
      const fetchUrlAndSetUrl = async () => {
        const result = await axios({
    method: 'post',
    url: "http://localhost:3333/all",
    data: {
      url: campo
          }
});

  setUrls(result.data);

      };
      fetchUrlAndSetUrl();
    },[booleanValue]);
console.log(urls);

    const copyToClipboard = async (shortUrl) => {
      try {
        await navigator.clipboard.writeText(shortUrl);
        toast.success('URL copiada para a área de transferência!');
      } catch (error) {
        console.error('Erro ao copiar:', error);
      }
    };
    
  return (

  <div className="UrlResult container justify-content-center align-items-center w-50">

      {urls.map((url, idx) => (

        urls ? <div id="resultado"
        key={idx} className="container d-flex flex-row justify-content-center align-items-center">

            <div id="OrigUrl" className="OrigUrl p-2 text text-decoration-none">
              <p className="text-center">
                {url.origUrl}
              </p>
            </div>
            
            <div id="ShortUrl" className="ShortUrl container d-flex flex-row justify-content-center
            align-items-center p-2 text text-decoration-none" > 
                <a
                  className='text rounded text-decoration-none '
                  
                  href={url.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                > <p>
                  {url.shortUrl}
                  </p>
                </a>
                </div>

                <div className='copy'>
                  <button
                    className="copiar"
                    type="button"
                    onClick={() => copyToClipboard(url.shortUrl)}
                  >
                    Copiar
                  </button>
                </div>
                <div className='qrcode'>
                <button className="copiar" onClick={handleShow}>
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
  
  );
}

export default ViewUrlComponent;