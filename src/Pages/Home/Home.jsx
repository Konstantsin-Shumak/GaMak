import React from "react";
import background from '../../Assets/Images/background.svg';
import "./Home.css";

export const Home = () => {

  return (
    <main>
      <div className="info">
        <h1 className="info__header">Управляй задачами</h1>
        <p className="info__text">
          <strong>Создавай</strong> свою команду для реализации проекта.<br />
          <strong>Разделяй</strong> задачи на подзадачи.<br />
          <strong>Контролируй</strong> весь процесс самостоятельно.
        </p>
      </div>
      <img className="main__background_img" src={background} alt="background" />
    </main>
  );
}