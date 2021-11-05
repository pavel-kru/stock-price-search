import { Component, h } from '@stencil/core';
export class Loader {
  render() {
    return (h("div", { class: 'lds-roller' },
      h("div", null),
      h("div", null),
      h("div", null),
      h("div", null),
      h("div", null),
      h("div", null),
      h("div", null),
      h("div", null)));
  }
  static get is() { return "uc-loader"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./loader.css"]
  }; }
  static get styleUrls() { return {
    "$": ["loader.css"]
  }; }
}
