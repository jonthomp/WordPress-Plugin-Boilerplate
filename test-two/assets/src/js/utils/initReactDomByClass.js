import React from "react";
import ReactDOM from "react-dom";

function initReactDomByClass(className, Component) {
  const elements = document.getElementsByClassName(className);
  for (var i = 0; i < elements.length; i++) {
    const elm = elements[i];
    const props = JSON.parse(elm.getAttribute("data-props")) || {};
    ReactDOM.render(React.createElement(Component, props), elm);
  }
}

export default initReactDomByClass;
