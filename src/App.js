import React from "react";
import data from "./data.json";
import Menus from "./components/Menus";
import Filter from "./components/Filter";
import Comanda from "./components/Comanda";
import Toast from "./components/Toast";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menus: data.menus,
      comanda: localStorage.getItem("comanda")
        ? JSON.parse(localStorage.getItem("comanda"))
        : [],
      order: localStorage.getItem("order")
        ? JSON.parse(localStorage.getItem("order"))
        : [],
      type: "",
      sort: "",
      message: false
    };
  }
  createOrder = (order) => {
    if (
      order.comanda.length &&
      (order.name.length !== 0 || order.table !== "")
    ) {
      this.setState({ order: order });
      localStorage.setItem("order", JSON.stringify(this.state.order));
      localStorage.removeItem("comanda");
      this.setState({ comanda: [] });
      this.setState({ message: true });
    }
  };
  removeFromComanda = (item) => {
    const comanda = this.state.comanda.slice();
    if (item.count === 1) {
      this.setState({ comanda: comanda.filter((i) => i._id !== item._id) });
      localStorage.setItem(
        "comanda",
        JSON.stringify(comanda.filter((i) => i._id !== item._id))
      );
    } else {
      comanda.item = item.count--;
      this.setState({ comanda: comanda });
      localStorage.setItem("comanda", JSON.stringify(this.state.comanda));
    }
  };
  addItem = (menu) => {
    const comanda = this.state.comanda.slice();
    let alreadyInComanda = false;
    comanda.forEach((item) => {
      if (item._id === menu._id) {
        item.count++;
        alreadyInComanda = true;
      }
    });
    if (!alreadyInComanda) {
      comanda.push({ ...menu, count: 1 });
    }
    this.setState({ comanda });
    localStorage.setItem("comanda", JSON.stringify(comanda));
  };
  filterType = (event) => {
    if (event.target.value === "") {
      this.setState({ type: "", menus: data.menus });
    } else {
      this.setState({
        type: event.target.value,
        menus: data.menus.filter((item) => item.menu === event.target.value)
      });
    }
  };
  filterSort = (event) => {
    const sort = event.target.value;
    if (event.target.value === "") {
      this.setState({ sort: "", menus: data.menus });
    } else {
      this.setState((state) => ({
        sort: sort,
        menus: this.state.menus
          .slice()
          .sort((a, b) =>
            sort === "dsc"
              ? a.price < b.price
                ? 1
                : -1
              : sort === "asc"
              ? a.price > b.price
                ? 1
                : -1
              : a._id > b._id
              ? 1
              : -1
          )
      }));
    }
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <span role="img" aria-label="emoji">
            👑
          </span>
          <a href="/"> Burguer Queen </a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.menus.length}
                type={this.state.type}
                sort={this.state.name}
                filterType={this.filterType}
                filterSort={this.filterSort}
              />
              <Menus menus={this.state.menus} addItem={this.addItem} />
            </div>
            <div className="aside">
              <Comanda
                comanda={this.state.comanda}
                removeFromComanda={this.removeFromComanda}
                createOrder={this.createOrder}
              />
              {this.state.message && (
                <Toast position="top-right" visible={true} />
              )}
            </div>
          </div>
        </main>
        <footer>Copyright {new Date().getFullYear()}</footer>
      </div>
    );
  }
}
export default App;
