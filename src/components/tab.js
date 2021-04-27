import React from "react";

class Tab extends React.Component {
  render() {
    if (this.props.isSelected) {
      return (
        <div
          style={{
            marginTop: "10px",
          }}
        >
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}

export default Tab;
