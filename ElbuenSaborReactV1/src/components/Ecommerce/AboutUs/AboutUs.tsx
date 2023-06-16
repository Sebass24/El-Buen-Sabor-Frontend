import React from "react";
import { useNavigate } from "react-router";
import "./AboutUs.scss";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="img">
        <h1 className='Title_AboutUS'>{"Sobre Nosotros"}</h1>
      </div>
      <div className="AboutUs">
        <article>
          <h2>Trabajo Integrador El Buen Sabor</h2>
        </article>
        <div className="wrapper">
          <article>
            <h2>¿En qué consiste nuetra e-commerce?</h2>
            <p>
              El Buen Sabor es un local de comida rápida ubicado en Mendoza cuya especialidad son las hamburguesas, aunque también vende pizas, papas y bebidas. El local vende a través de su página web y permite retiro en el local y delivery, su público objetivo son personas de entre 16 y 45 años de la provincia de Mendoza que estén dispuestos a desafiar sus paladares.
            </p>
          </article>
        </div>
        <article>
          <h2>Integrantes</h2>
        </article>
        <div className="integrantes-wrapper">
          <article>
            <img src="/sebaSulia.jpg" alt="" />
            <h2>Sebastian Sulia</h2>
            <h3>Back End Developer</h3>
            <div className="habilities">
              <h1>Habilidades:</h1>
              <span> Java </span>
              <span> JavaSript </span>
              <span> TypeScript </span>
              <span> NodeJs </span>
              <span> C# </span>
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
              <span> React = Nivel Alto</span>
              <span> HTML = Nivel Alto</span>
              <span> CSS = Nivel Alto</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
