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

        console.log(result.data);        
        setUrls(result.data);
      };
      fetchUrlAndSetUrl();
    }, []);

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
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Url Original</th>
            <th>Url Encurtada</th>
            <th>Copiar Link</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>{url.origUrl}</td>
              <td>
                <a id="link" onClick={()=> Teste(url.urlId)} href={`${url.origUrl}`} target='blank'>{url.shortUrl}</a>
              </td>             
              <td><button onClick={()=> copyP(url.shortUrl)}> Copiar Url</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUrlComponent;