import React from 'react';

const FooterComponent = () => {
  return (
    <footer>
      <div id="footer"> 

        <div>
          <img src="logo-innovtech.png" alt="InnovTech Logo" />
          </div>

          <div>
          <a href="https://www.grupodpg.com.br/" target="_blank" rel="noopener noreferrer">
            <img src="logo-dpg.png" alt="DPG Logo" />
          </a>
          </div>
          
          <div className='zap'>
          <a href="https://zapcontabil.com/" target="_blank" rel="noopener noreferrer">
            <img src="logo-zapcontabil.png" alt="Zapcontabil Logo" />
          </a>
          </div>
          </div>
          
      <div className="endNote">
        <div>
        <h4>COMHUB 2023 © Todos os direitos reservados</h4>
        </div>
      </div>
      
    </footer>
  );
};

export default FooterComponent;
