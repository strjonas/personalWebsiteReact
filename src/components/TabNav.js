import React from "react";

class TabNav extends React.Component {
  render() {
    return (
      <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px" }}>
        <ul className="nav nav-tabs TabNav">
          {this.props.tabs.map((tab) => {
            const active = tab === this.props.selected ? "acitve " : "";

            return (
              <li className="nav-item" key={tab}>
                <a
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
