import React from 'react';
import cn from 'classnames';

const Header = ({ children, switcher }) => (
  <div className="modal-header">
    <div className="modal-title">
      {children}
    </div>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={switcher}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

const Body = ({ children }) => <div className="d-flex justify-content-center"><p className="model-body pt-4">{children}</p></div>

const Footer = ({ children }) => <div className="d-flex justify-content-end"><p className="model-footer pr-3">{children}</p></div>

class ModalItem extends React.Component {
  static Header = Header;

  static Body = Body;

  static Footer = Footer;

  render() {
    const { isOpen, children } = this.props
    const classes = cn({
      modal: true,
      fade: isOpen,
      show: isOpen,
    });

    const style = {
      display: isOpen ? 'block' : 'none',
    };

    return (
      <div className={classes} style={style} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  };

  changeModalState = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h6>Please push button below in order to show modal</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center py-4">
            <button type="button" className="modal-open-button btn btn-outline-success" onClick={this.changeModalState}>Show Modal</button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ModalItem isOpen={isModalOpen}>
              <ModalItem.Header switcher={this.changeModalState} >
                Title
              </ModalItem.Header>
              <ModalItem.Body>
                Body
              </ModalItem.Body>
                <ModalItem.Footer>
                  <button type="button" className="modal-close-button btn btn-outline-danger" onClick={this.changeModalState}>Cancel</button>
                </ModalItem.Footer>
            </ModalItem>
          </div>
        </div>
      </div>
    );
  }
}