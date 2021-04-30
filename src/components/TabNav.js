import React from "react";

class TabNav extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <ul style={{ background: "#BF1209" }} className="nav nav-tabs TabNav">
          {this.props.tabs.map((tab) => {
            const active = tab === this.props.selected ? "acitve " : "";

            return (
              <li className="nav-item" key={tab}>
                <a
                  style={{ color: "white" }}
                  className={"nav-link" + active}
                  onClick={() => this.props.setSelected(tab)}
                >
                  {tab}
                </a>
              </li>
            );
          })}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default TabNav;
