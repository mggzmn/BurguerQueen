import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
export default class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null
    };
  }
  openModal = (menu) => {
    this.setState({ menu });
  };
  closeModal = () => {
    this.setState({ menu: null });
  };
  render() {
    const { menu } = this.state;
    return (
      <div>
        <Fade left cascade={true}>
          <ul className="menus">
            {this.props.menus.map((menu) => (
              <li key={menu._id}>
                <div className="menu">
                  <span
                    className="emoji"
                    role="img"
                    aria-label="emoji"
                    onClick={() => this.openModal(menu)}
                  >
                    {menu.emoji}
                  </span>
                  <h2>{menu.name}</h2>
                  <p>{menu.type}</p>
                  <div className="menu-price">
                    <div>{formatCurrency(menu.price)}</div>
                    <div>
                      <button
                        onClick={() => this.props.addItem(menu)}
                        className="button-add"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {menu && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="item-detail">
                <div className="item-box">
                  <div className="item-box-center">
                    <span className="emoji" role="img" aria-label="emoji">
                      {menu.emoji}
                    </span>
                  </div>
                </div>
                <div className="item-box">
                  <div className="item-detail-descrption">
                    <p>{menu.name}</p>
                    <p>{menu.type}</p>
                    <p>
                      Existencia:
                      {menu.stock.map((item) => (
                        <span>
                          {" "}
                          <button>{item}</button>
                        </span>
                      ))}
                    </p>
                    <div className="menu-price">
                      <div>{formatCurrency(menu.price)}</div>
                      <button
                        className="buttonFill"
                        onClick={() => {
                          this.props.addItem(menu);
                          this.closeModal();
                        }}
                      >
                        Añadir a Comanda
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
