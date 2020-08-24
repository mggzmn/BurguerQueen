import React, { Component } from "react";
export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Items</div>
        <div className="filter-sort">
          Precio{" "}
          <select value={this.props.name} onChange={this.props.filterSort}>
            <option value="">Default</option>
            <option value="asc">Menos-Más</option>
            <option value="dsc">Más-Menos</option>
          </select>
        </div>
        <div className="filter-type">
          Menu{" "}
          <select value={this.props.type} onChange={this.props.filterType}>
            <option value="">Todos</option>
            <option value="breakfast">Desayuno</option>
            <option value="food">Comida</option>
          </select>
        </div>
      </div>
    );
  }
}
