import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
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
        const notify = () => toast.success("URL copiada com sucesso!");
          notify();
      } catch (e) { 
     
      }
    }
    
  return (


  <div className="row justify-content-center">
    <div className="col-md-6">

      {urls.map((url, idx) => (

        urls ? <div id="welcomeDiv"  style={{display:'block'}} key={idx} className="mt-4">

          <div className="d-flex justify-content-center me-5 d-inline-block p-1 
          text-decoration-none text-dark rounded"
          style={{ backgroundColor: 'white' }}>

            <div className="me-4 mt-2" style={{ backgroundColor: 'white' }}>
              <p>
                {url.origUrl}
              </p>
            </div>
            
            <div style={{ backgroundColor: 'white' }}> 
                <a
                  className='me-3 d-inline-block p-2 text rounded text-decoration-none'
                  id={`shortUrl-${idx}`}
                  href={url.shortUrl}
                  target="_blank"
                  rel="noreferrer"

                >
                  {url.shortUrl}
                </a>
                <button
                  className="btn btn-primary rounded"
                  type="button"
                  onClick={() => copyP(url.shortUrl)}
                >
                  Copiar Url
                </button>
              </div>
          </div>
        </div> : null
      ))}
 <ToastContainer />
    </div>
  </div>

  );
}

export default ViewUrlComponent;