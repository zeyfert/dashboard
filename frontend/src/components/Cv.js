import React from 'react';
import photoCv from '../images/photo_cv.png';
import { Envelope, Whatsapp } from 'react-bootstrap-icons';


export default class Cv extends React.Component {
  constructor(props) {
    super(props)
    this.state = { heightPhoto: 215, heightTitle: 100, widthSpanFirst: 180, widthSpanSecond: 80 };
  }
  render() {
    const { heightPhoto, heightTitle, widthSpanFirst, widthSpanSecond  } = this.state; 
    return (
      <div>
        <div className="row" >
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-3">
                <img src={photoCv} style={{ height: heightPhoto }} className="img-thumbnail shadow mx-auto d-block" alt="cv_photo"></img>
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
                      <span className="d-inline " style={{ width: widthSpanSecond }}>
                        <Whatsapp />
                      </span>
                      <span>+7 (960) 521-80-88</span>
                    </li>
                    <li className="d-flex py-1">
                      <span className="d-inline" style={{ width: widthSpanSecond }}><Envelope /></span>
                      <span>maxim.zeyfert@gmail.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 d-flex align-items-center justify-content-center" style={{ height: heightTitle }}>
          <div className="border-bottom">
            <h2 style={{ color: '#0487cc' }}>Опыт работы</h2>
          </div>
        </div>
      </div>
      <div className="row pl-4 pb-2">
        <div className="col-sm-3 text-center">
          <div style={{ color: '#0487cc' }}>
            <p><u>Октябрь 2020 - Апрель 2021</u></p>
          </div>
        </div>
        <div className="col-sm-9">
          <h4>Aquiva Labs</h4>
          <h5 className="text-muted">Release Engineer</h5>
          <ul>
            <li>
              разработка скриптов автоматизации на основе асинхронного и синхронного кода (Node.js, bash)
            </li>
            <li>
              сбор и обработка (подготовка) данных (API, JSON, базы данных)
            </li>
            <li>
              внедрение отчетов в CI (JavaScript, HTML)
            </li>
            <li>
              настройка и обслуживание CI (Jenkins)
            </li>
          </ul>
        </div>
      </div>
      <div className="row pl-4 pb-2">
        <div className="col-sm-3 text-center">
          <div style={{ color: '#0487cc' }}>
            <p><u>Октябрь 2018 - Сентябрь 2020</u></p>
          </div>
        </div>
        <div className="col-sm-9">
          <h4>FXTM</h4>
          <h5 className="text-muted">Инженер внутренней безопасности</h5>
          <ul>
            <li>
              разработка скриптов взаимодействия систем видеонаблюдения и контроля доступа (Python)
            </li>
            <li>
              автоматизация отчетности (Python, Pandas, Matplotlib)
            </li>
            <li>
              разработка веб-интерфейса отчета о рабочем времени
            </li>
            <li>
              администрирование серверов (Linux, Windows)
            </li>
            <li>
              обслуживание компонентов систем видеонаблюдения и контроля доступа
            </li>
          </ul>
        </div>
      </div>
      <div className="row pl-4 pb-2">
        <div className="col-sm-3 text-center">
          <div style={{ color: '#0487cc' }}>
            <p><u>Январь 2018 — Октябрь 2018</u></p>
          </div>
        </div>
        <div className="col-sm-9">
          <h4>Фольксваген Груп Рус</h4>
          <h5 className="text-muted">Системный аналитик</h5>
          <ul>
            <li>
              администрирование серверов (Windows)
            </li>
            <li>
              обслуживание систем видеонаблюдения и контроля доступа
              </li>
            <li>
              описание процессов ИТ-процессов;
            </li>
          </ul>
        </div>
      </div>
      <div className="row pl-4 pb-2">
        <div className="col-sm-3 text-center">
          <div style={{ color: '#0487cc' }}>
            <p><u>Ноябрь 2016 — Январь 2018</u></p>
          </div>
        </div>
        <div className="col-sm-9">
          <h4>Атос (Проект Фольксваген Груп Рус)</h4>
          <h5 className="text-muted">Инженер по поддержке программного обеспечения</h5>
          <ul>
            <li>
              восстановление работоспособности пользовательского и производственного оборудования
            </li>
          </ul>
        </div>
      </div>
    </div>
    );
  };
};