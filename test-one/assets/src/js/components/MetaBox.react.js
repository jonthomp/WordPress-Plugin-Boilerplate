import React from "react";

class MetaBox extends React.Component {
  render() {
    return (
      <div>
        <p>
          <input
            type="text"
            defaultValue={this.props.fieldValue}
            name="_custom_field"
          />
        </p>
      </div>
    );
  }
}

export default MetaBox;
