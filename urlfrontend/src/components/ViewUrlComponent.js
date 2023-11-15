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

    async function Teste (urlid){
      try {
        const result = await axios.get(`http://localhost:3333/find/${urlid}`);
      console.log(result);
      console.log(urlid);
      } catch (error) {
        console.log(error);
      }
    
    
    }

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
        <div key={idx} className="mb-3">
          <div className="d-flex justify-content-center">
            <div className="me-3">
              <label htmlFor={`origUrl-${idx}`} className="form-label">Url Original:</label>
              <input
                id={`origUrl-${idx}`}
                type="text"
                className="form-control"
                value={url.origUrl}
                disabled
              />
            </div>
            <div>
              <label htmlFor={`shortUrl-${idx}`} className="form-label">Url Encurtada:</label>
              <div
                className="input-group clickable-field"
                onClick={() => Teste(url.urlId)}
              >
                <a
                  id={`shortUrl-${idx}`}
                  href={url.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {url.shortUrl}
                </a>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => copyP(url.shortUrl)}
                >
                  Copiar Url
                </button>
              </div>
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