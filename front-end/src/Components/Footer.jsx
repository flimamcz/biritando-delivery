import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import linkedin from '../images/linkedin.svg';

function Footer() {
  return (
    <footer>
      <div className="footer_content">
        <div className="footer_links">
          <h4>Fábio Penna</h4>
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <Link
            to="https://www.linkedin.com/in/fabio-penna-dev/"
          >
            linkedin
          </Link>
        </div>
        <div className="footer_links">
          <h4>Filipe Lima</h4>
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <Link
            to="https://www.linkedin.com/in/filipe-lima-dev/"
          >
            linkedin
          </Link>
        </div>
        <div className="footer_links">
          <h4>João Hélder</h4>
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <Link
            to="https://www.linkedin.com/in/joaohelder0/"
          >
            linkedin
          </Link>
        </div>
        <div className="footer_links">
          <h4>João Victor</h4>
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <Link
            to="https://www.linkedin.com/in/joaovictorschiavon/"
          >
            linkedin
          </Link>
        </div>
        <div className="footer_links">
          <h4>Vinicius Andrade</h4>
          <img src={ linkedin } alt="linkedin logo" width="25px" />
          <Link
            to="https://www.linkedin.com/in/vin%C3%ADcius-andrade-dev/"
          >
            linkedin
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
