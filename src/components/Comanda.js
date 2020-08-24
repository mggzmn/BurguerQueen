import React, { Component } from "react";
import formatCurrency from "../util";
import Bounce from "react-reveal/Bounce";
export default class Comanda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClient: false,
      name: "",
      table: ""
    };
  }
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      table: this.state.table,
      comanda: this.props.comanda
    };
    this.props.createOrder(order);
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { comanda } = this.props;
    return (
      <div>
        {comanda.length === 0 ? (
          <div className="comanda comanda-header">Comanda Vacía</div>
        ) : (
          <div className="comanda comanda-header">
            Tienes {comanda.length} items en la comanda
          </div>
        )}

        <div>
          <div className="comanda">
            <Bounce right cascade>
              <ul className="comanda-items">
                {comanda.map((item) => (
                  <li key={item._id}>
                    <div>
                      <span className="emoji" role="img" aria-label="emoji">
                        {item.emoji}
                      </span>
                    </div>
                    <div>
                      <div>{item.name}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromComanda(item)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Bounce>
          </div>
          {comanda.length !== 0 && (
            <div>
              <div className="comanda">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      comanda.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showClient: true });
                    }}
                    className="buttonFill"
                  >
                    Enviar
                  </button>
                </div>
              </div>
              {this.state.showClient && (
                <div className="comanda">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Nombre Cliente</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Mesa:</label>
                        <input
                          name="table"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <button type="submit" className="buttonFill">
                          Enviar Comanda
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
