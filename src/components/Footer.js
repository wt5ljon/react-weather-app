import React from 'react';

const Footer = (props) => (
    <div className="footer">
        <span className="footer__row">
            <span className="footer__text">Copyright {props.year}</span>
            <span className="footer__text">Version {props.version}</span>
        </span>
    </div>
);

export default Footer;