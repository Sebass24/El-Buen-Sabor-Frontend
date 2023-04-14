import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <div>
      <div className="Container_Footer">
        <div className="Container_Foter_contact">
          <span className="Contactanos">Contactanos</span>
          <div className="Container_Foter_contact_items">
            <i className="fa-solid fa-location-dot"></i>
            <span>Mendoza-Argentina</span>
          </div>
          <div className="Container_Foter_contact_items">
            <i className="fa-brands fa-whatsapp"></i>
            <span>+54-9-2616172242</span>
          </div>
          <div className="Container_Foter_contact_items">
            <i className="fa-solid fa-envelope"></i>
            <span>ElBuenSaborMendoza@gmail.com</span>
          </div>
        </div>

        <div className="Arow_container_Footer">
          <div className="arrowBottom_Footer">
            <div className="imgLogo_Footer"></div>
          </div>
        </div>

        <div className="PayMethods">
          <span className="Contactanos">Métodos de pago</span>
          <div className="Container_cards">
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-paypal"></i>
            <i className="fa-brands fa-cc-amex"></i>
            <img src="/mercadopago.png"></img>
            <i className="fa-brands fa-cc-apple-pay"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
