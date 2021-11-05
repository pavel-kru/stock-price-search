import { Component, Event, h, State } from '@stencil/core';
import { AV_API_KEY } from '../global/global';
export class StockFinder {
  constructor() {
    this.searchResults = [];
    this.loading = false;
    this.stockNameInputValid = false;
    this.error = '';
  }
  onSelectSymbol(symbol) {
    this.ucSymbolSelected.emit(symbol);
  }
  hostData() {
    return { class: this.error ? 'error' : '' };
  }
  onStockNameInput({ target }) {
    console.log(target.value);
    this.stockNameValue = target.value;
    if (this.stockNameValue !== '') {
      this.error = '';
      this.stockNameInputValid = true;
    }
    else {
      this.stockNameInputValid = false;
    }
  }
  onSearchSymbol(event) {
    event.preventDefault();
    this.searchResults = [];
    const stockName = this.stockNameInput.value;
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then((res) => {
      this.loading = false;
      return res.json();
    })
      .then((parsedRes) => {
      if (!parsedRes['bestMatches'][0]) {
        throw new Error('Please, Enter a Correct name');
      }
      this.searchResults = parsedRes['bestMatches'].map((res) => ({
        symbol: res['1. symbol'],
        name: res['2. name'],
      }));
      this.stockNameInput.value = '';
    })
      .catch((err) => {
      this.loading = false;
      this.error = err.message;
    });
  }
  render() {
    let searchResults = null;
    if (this.loading) {
      searchResults = h("uc-loader", null);
    }
    if (this.error) {
      searchResults = h("p", { class: 'error' }, this.error);
    }
    if (this.searchResults[0]) {
      searchResults = (h("ul", null,
        h("h3", null, "Search Results:"),
        this.searchResults.map((res) => (h("li", { onClick: this.onSelectSymbol.bind(this, res.symbol) },
          h("strong", null, res.symbol),
          " - ",
          res.name)))));
    }
    return [
      h("h1", null, "Find stock symbol."),
      h("form", { onSubmit: this.onSearchSymbol.bind(this) },
        h("input", { id: 'stock-finder', ref: (el) => (this.stockNameInput = el), placeholder: 'company name', onInput: this.onStockNameInput.bind(this), value: this.stockNameValue }),
        h("my-button", { type: 'submit', class: 'my-button', disabled: !this.stockNameInputValid }, "Search Symbol")),
      searchResults,
    ];
  }
  static get is() { return "uc-stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./stock-finder.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-finder.css"]
  }; }
  static get states() { return {
    "searchResults": {},
    "stockNameValue": {},
    "loading": {},
    "stockNameInputValid": {},
    "error": {}
  }; }
  static get events() { return [{
      "method": "ucSymbolSelected",
      "name": "ucSymbolSelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
}
