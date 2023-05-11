import "./Footer.scss";
import Logo from "components/NavBar/Logo/Logo";

const Footer = () => {
  return (
    <div className="Container_Footer">
      
      <div className="Container_Footer_contact">
        <span><label>Contactanos</label></span>
        <div className="Container_Footer_contact_items">
          <i className="fa-solid fa-location-dot"></i>
          <label>Mendoza-Argentina</label>
        </div>
        <div className="Container_Footer_contact_items">
          <i className="fa-brands fa-whatsapp"></i>
          <label>+54-9-2616172242</label>
        </div>
        <div className="Container_Footer_contact_items">
          <i className="fa-solid fa-envelope"></i>
          <label>ElBuenSaborMendoza@gmail.com</label>
        </div>
      </div>

      <Logo />

      <div className="PaymentMethods">
        <label>Métodos de pago</label>
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
  );
};

export default Footer;
