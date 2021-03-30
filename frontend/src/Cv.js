import React from 'react';
import logo from './photo_cv.png';
import { Telephone, Envelope, Whatsapp, Telegram } from 'react-bootstrap-icons';
export default class Cv extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: 215, heightTitle: 100, widthSpanFirst: 180, widthSpanSecond: 80 };
  }
  render() {
    const { height, heightTitle, widthSpanFirst, widthSpanSecond } = this.state; 
    return (
      <div>
      <div className="row" >
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <img src={logo} style={{ height }} className="img-thumbnail shadow mx-auto d-block" alt="cv_photo"></img>
                </div>
                <div className="col-sm-9">
                <div className="row"> 
                  <div className="col-sm-12">
                    <ul className="list-unstyled">
                      <li><h3>Зейферт Максим Андреевич</h3></li>
                      <li className="text-muted"><h5>Junior Full Stack Developer</h5></li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled">
                      <li className="d-flex py-1">
                        <span className="d-inline text-muted" style={{ width: widthSpanFirst }}>Возраст</span>
                        <span>29</span>
                      </li>
                      <li className="d-flex py-1">
                        <span className="d-inline text-muted" style={{ width: widthSpanFirst }}>Город проживания</span>
                        <span>Калуга</span>
                      </li>
                      <li className="d-flex py-1">
                        <span className="d-inline text-muted" style={{ width: widthSpanFirst }}>Релокация</span>
                        <span>Москва</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul className="list-unstyled">
                      <li className="d-flex py-1">
                        <span className="d-inline text-muted" style={{ width: widthSpanSecond }}><Telephone /> <Whatsapp /> <Telegram /></span>
                        <span>+7 (960) 521-80-88</span>
                      </li>
                      <li className="d-flex py-1">
                        <span className="d-inline text-muted" style={{ width: widthSpanSecond }}><Envelope /></span>
                        <span>maxim.zeyfert@gmail.com</span>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
      <div className="row">
        <div className="col-sm-12 d-flex align-items-center justify-content-center" style={{ height: heightTitle }}>
          <div>
            <h2 style={{ color: '#0487cc' }}>Опыт работы</h2>
          </div>
        </div>
      </div>
      <div className="row pb-1">
        <div className="col-sm-3 d-flex align-items-center justify-content-center">
          <div className="card">
          <div style={{ color: '#0487cc' }}>
            <p><u>Октябрь 2020 - Апрель 2021</u></p>
          </div>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="card">
            <div className="card-body">
              <h4>Aquiva Labs</h4>
              <h5 className="text-muted">Релиз Инженер</h5>
              <ul>
                <li>
                  разработка скриптов/утилит на Node.js, Bash.
                </li>
                <li>
                  настройка Jenkins;
                </li>
              </ul>
            </div>
          </div> 
        </div>
      </div>
      <div className="row pb-1">
        <div className="col-sm-3 d-flex align-items-center justify-content-center">
          <div style={{ color: '#0487cc' }}>
            <p><u>Октябрь 2018 - Сентябрь 2020</u></p>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="card">
            <div className="card-body">
              <h4>FXTM</h4>
              <h5 className="text-muted">Инженер внутренней безопасности</h5>
              <ul>
                <li>
                  разработка скриптов взаимодействия (Python) между системами контроля доступа и видеонаблюдения.
                </li>
                <li>
                  администрирование Linux (Ubuntu), Windows;
                </li>
                <li>
                  сопровождение систем контроля доступа и видеонаблюдения;
                </li>
              </ul>
            </div>
          </div> 
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3 d-flex align-items-center justify-content-center">
          <div style={{ color: '#0487cc' }}>
            <p><u>Январь 2018 — Октябрь 2018</u></p>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="card">
            <div className="card-body">
              <h4>Фольксваген Груп Рус</h4>
              <h5 className="text-muted">Системный аналитик</h5>
              <ul>
                <li>
                  администрирование серверов Windows;
                </li>
                <li>
                  описание процессов ИТ-департамента по направлениям видеонаблюдение и систем контроля доступа;
                </li>
              </ul>
            </div>
          </div> 
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3 d-flex align-items-center justify-content-center">
          <div style={{ color: '#0487cc' }}>
            <p><u>Ноябрь 2016 — Январь 2018</u></p>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="card">
            <div className="card-body">
              <h4>Атос (Проект Фольксваген Груп Рус)</h4>
              <h5 className="text-muted">Инженер по поддержке программного обеспечения</h5>
              <ul>
                <li>
                  восстановление работоспособности рабочих станций и производственного оборудования;
                </li>
                <li>
                  консультации пользователей по вопросам работы Windows, а также различного ПО.
                </li>
              </ul>
            </div>
          </div> 
        </div>
      </div>
      </div>
    )
  }
}