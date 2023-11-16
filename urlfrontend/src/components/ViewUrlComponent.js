import React, { useEffect, useState } from 'react'
import axios from "axios"


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
        alert("Link Copiado: " + shortUrl);
      } catch (e) { 
     
      }
    }
    
  return (
    <div className="container mt-">
  <div className="row justify-content-center">
    <div className="col-md-8">
      {urls.map((url, idx) => (
        <div id="welcomeDiv"  style={{display:'none'}} key={idx} className="mt-4">
          <div className="d-flex justify-content-center">

            <div className="me-4">
              <input
                id={`origUrl-${idx}`}
                type="text"
                className="form-control"
                value={url.origUrl}
                disabled
              />
            </div>
            
            <div>
                <a
                  className='me-4 d-inline-block p-1 text-decoration-none text-dark rounded'
                  id={`shortUrl-${idx}`}
                  href={url.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: 'white' }}
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
          
        </div>
        
      ))}
    </div>
  </div>
</div>

  );
}

export default ViewUrlComponent;