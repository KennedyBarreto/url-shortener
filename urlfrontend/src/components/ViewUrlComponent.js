import React, { useEffect, useState } from 'react'
import axios from "axios"

const ViewUrlComponent= () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
      const fetchUrlAndSetUrl = async () => {
        const result = await axios.get("http://localhost:3333/all");
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

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Url Original</th>
            <th>Url Encurtada</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>{url.origUrl}</td>
              <td>
                <a onClick={()=> Teste(url.urlId)} href={`${url.origUrl}`} target='blank'>{url.shortUrl}</a>
              </td>             
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUrlComponent;