import React from 'react';

function Footer(props) {
    return (
        <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ul className="footer-links">
                <li>
                  <a href="privacy-policy.html">Privacy Policy</a>
                </li>
                <li>
                  <a href="terms-of-service.html">Terms of Use</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 text-right">
              © {new Date().getFullYear()} <a href="#">Confledit</a> All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;