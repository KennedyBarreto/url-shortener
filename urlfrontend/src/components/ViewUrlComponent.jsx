import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewUrlComponent= () => {
    const [urls, setUrls] = useState([]);
    const campo = localStorage.getItem("url");
    useEffect(() => {
      const fetchUrlAndSetUrl = async () => {
        const result = await axios({
  method: 'post',
  url: "http://localhost:3333/all",
  data: {
   url: campo, // This is the body part
  }
});

           
        setUrls(result.data);
      };
      fetchUrlAndSetUrl();
    });

    
    

    async function copyP(shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        const notify = () => toast.info("URL copiada com sucesso!",);
          notify();
      } catch (e) { 
     
      }
    }
    
  return (


  <div id="urls" className="row justify-content-center col-md-6">
   
      {urls.map((url, idx) => (

        urls ? <div id="resultado"  style={{display:'block', backgroundColor: 'white' }}
        key={idx} className="d-flex justify-content-center mt-4 me-5 d-inline-block p-1 
        text-decoration-none text-dark rounded" >

        

            <div id="OrigUrl" className="me-3 d-inline-block p-2 text rounded text-decoration-none'" 
            style={{ backgroundColor: 'white' }}>
              <p>
                {url.origUrl}
              </p>
            </div>
            
            <div id="ShortUrl" style={{ backgroundColor: 'white' }}> 
                <a
                  className='me-3 d-inline-block p-2 text rounded text-decoration-none'
                  id={`shortUrl-${idx}`}
                  href={url.shortUrl}
                  target="_blank"
                  rel="noreferrer"

                >
                  {url.shortUrl}
                </a>
                </div>
                <div id="copiar" class>
                  <button
                    className="btn btn-dark rounded fixed"
                    type="button"
                    onClick={() => copyP(url.shortUrl)}
                  >
                    Copiar Url
                  </button>
                </div>
        </div> : null
      ))}

    </div>
  

  );
}

export default ViewUrlComponent;