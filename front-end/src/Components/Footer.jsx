import React from 'react';
import '../styles/footer.css';
import linkedin from '../images/linkedin.svg';

function Footer() {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_links">
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <a href="https://www.linkedin.com/in/fabio-penna-dev/" target="_blank" rel="noreferrer">
            <h4>Fabio Penna</h4>
          </a>
        </div>
        <div className="footer_links">
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <a href="https://www.linkedin.com/in/filipe-lima-dev/" target="_blank" rel="noreferrer">
            <h4>Filipe Lima</h4>
          </a>
        </div>
        <div className="footer_links">
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <a href="https://www.linkedin.com/in/joaohelder0/" target="_blank" rel="noreferrer">
            <h4>João Hélder</h4>
          </a>
        </div>
        <div className="footer_links">
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <a href="https://www.linkedin.com/in/joaovictorschiavon/" target="_blank" rel="noreferrer">
            <h4>João Victor</h4>
          </a>
        </div>
        <div className="footer_links">
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <a href="https://www.linkedin.com/in/vin%C3%ADcius-andrade-dev/" target="_blank" rel="noreferrer">
            <h4>Vinicius Andrade</h4>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
