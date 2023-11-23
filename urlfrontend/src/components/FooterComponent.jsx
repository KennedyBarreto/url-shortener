import React from 'react';

const FooterComponent = () => {
  return (
    <footer>
      <div className="contato container d-flex flex-row justify-content-center align-items-center">
        <div className="logo1">
          <img src="innov.png" alt="InnovTech Logo" />
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="dpg.png" alt="DPG Logo" />
          </a>
          </div>
          <div className="logo2">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="zap.png" alt="Zap Logo" />
          </a>
          </div>
      </div>
      <div className="rodape">
        <h4>Todos os direitos reservados 2023</h4>
      </div>
    </footer>
  );
};

export default FooterComponent;
