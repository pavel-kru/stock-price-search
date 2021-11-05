import { Component, h, State, Element, Prop, Watch, Listen, } from '@stencil/core';
import { urlWithSymbolConstructor } from '../../global/global';
export class StockPrice {
  constructor() {
    this.userInputValid = false;
    this.loading = false;
    this.note = {
      Note: 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.',
    };
  }
  stickSymbolChange(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.userInput = newVal;
      this.fetchStockPrice(newVal);
    }
  }
  componentWillLoad() {
    console.log('componentWillLoad');
    console.log(this.stockSymbol);
    this.userInput = this.stockSymbol;
    this.userInputValid = true;
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  componentDidLoad() {
    console.log('componentDidLoad');
    // if (this.stockSymbol) {
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }
  onStockSymbolSelected(event) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  onUserInput({ target }) {
    this.userInput = target.value;
    if (this.userInput !== '') {
      this.error = '';
      this.userInputValid = true;
    }
    else {
      this.userInputValid = false;
    }
  }
  hostData() {
    return { class: this.error ? 'error' : '' };
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    // const stockSymbol = (
    //   this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement
    // ).value;
    this.stockSymbol = this.stockInput.value;
    // this.fetchStockPrice(stockSymbol);
  }
  fetchStockPrice(symbol) {
    this.loading = true;
    fetch(urlWithSymbolConstructor(symbol))
      .then((res) => {
      if (res.status !== 200) {
        throw new Error('Invalid.');
      }
      this.loading = false;
      return res.json();
    })
      .then((parsedRes) => {
      if (!parsedRes['Global Quote']) {
        throw new Error('Our standard API call frequency is 5 calls per minute and 500 calls per day.');
      }
      if (!parsedRes['Global Quote']['05. price']) {
        throw new Error('Please, enter a correct Symbol!');
      }
      this.price = +parsedRes['Global Quote']['05. price'];
    })
      .catch((err) => {
      this.loading = false;
      this.error = err.message;
    });
  }
  render() {
    let contentData = h("p", null, "Please, Enter a Company Symbol.");
    if (this.price) {
      contentData = h("p", null,
        "Price: $",
        this.price);
    }
    if (this.error) {
      contentData = h("p", { class: 'error' }, this.error);
    }
    if (this.loading) {
      contentData = h("uc-loader", null);
    }
    return [
      h("h1", null, "Check stock price."),
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
        h("input", { id: 'stock-symbol', ref: (el) => (this.stockInput = el), value: this.userInput, onInput: this.onUserInput.bind(this), class: this.error && 'error', placeholder: 'company symbol' }),
        h("my-button", { type: 'submit', class: 'my-button', disabled: !this.userInputValid }, "Check Price")),
      h("div", null, contentData),
    ];
  }
  static get is() { return "uc-stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["stock-price.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get properties() { return {
    "stockSymbol": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "stock-symbol",
      "reflect": true
    }
  }; }
  static get states() { return {
    "price": {},
    "userInput": {},
    "userInputValid": {},
    "loading": {},
    "error": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "stockSymbol",
      "methodName": "stickSymbolChange"
    }]; }
  static get listeners() { return [{
      "name": "ucSymbolSelected",
      "method": "onStockSymbolSelected",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
