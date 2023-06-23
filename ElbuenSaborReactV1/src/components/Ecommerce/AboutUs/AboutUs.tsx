import React from "react";
import { useNavigate } from "react-router";
import "./AboutUs.scss";
import HeaderEcommerce from "../HeaderEcommerce/HeaderEcommerce";
import { Row } from "react-bootstrap";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderEcommerce />
      <Row><label className="page-name">SOBRE NOSOTROS</label></Row>
      <div className="AboutUs">
        <article>
          <h3 style={{ textAlign: "center" }}>Trabajo Integrador El Buen Sabor</h3>
        </article>
        <div className="wrapper">
          <article>
            <h2>¿En qué consiste nuestra e-commerce?</h2>
            <p>
              El Buen Sabor es un local de comida rápida ubicado en Mendoza cuya especialidad son las hamburguesas, aunque también vende pizas, papas y bebidas. El local vende a través de su página web y permite retiro en el local y delivery, su público objetivo son personas de entre 16 y 45 años de la provincia de Mendoza que estén dispuestos a desafiar sus paladares.
            </p>
          </article>
        </div>
        <article>
          <h3>INTEGRANTES</h3>
        </article>
        <div className="integrantes-wrapper">
          <article>
            <img src="/sebaSulia.jpg" alt="" />
            <h2>Sebastian Sulia</h2>
            <h3>Back End Developer</h3>
            <div className="habilities">
              <h1>Habilidades:</h1>
              <span> Java </span>
              <span> JavaScript </span>
              <span> TypeScript </span>
              <span> NodeJs </span>
              <span> .NET C# </span>
              <span> HTML </span>
              <span> CSS </span>
            </div>
          </article>
          <article>
            <img src="/Franco.png" alt="" />
            <h2>Franco Gonzalez</h2>
            <h3>Front End Developer</h3>
            <div className="habilities">
              <h1>Habilidades:</h1>
              <span> Java </span>
              <span> Javascript </span>
              <span> Typescript </span>
              <span> React </span>
              <span> HTML </span>
              <span> CSS </span>
              <span> SCSS </span>
            </div>
          </article>
          <article>
            <img src="/emiChiofalo.jpg" alt="" />
            <h2>Emilia Chiofalo</h2>
            <h3>Front End Developer</h3>
            <div className="habilities">
              <h1>Habilidades:</h1>
              <span> Java </span>
              <span> Javascript </span>
              <span> Typescript </span>
              <span> NodeJs </span>
              <span> React</span>
              <span> HTML</span>
              <span> CSS</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
