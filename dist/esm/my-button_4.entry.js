import { r as registerInstance, h, c as createEvent, H as Host, g as getElement } from './index-3dc7e740.js';

const buttonCss = ".sc-my-button:root{--primary-color:#42a5f5;--text-color:#323232}.light-theme.sc-my-button-h,.light-theme .sc-my-button-h{--button-background-color:#42a5f5;--button-color:#ffffff}.dark-theme.sc-my-button-h,.dark-theme .sc-my-button-h{--button-background-color:#424242;--button-color:#42a5f5}.button.sc-my-button{background-color:#42a5f5;color:#ffffff;padding:12px 24px;border-radius:4px;outline:none;font-size:1em;border-color:transparent;font-weight:500;font-family:sans-serif;cursor:pointer}.button.sc-my-button:hover{background:linear-gradient(to right bottom, #42a5f5, #095391);box-shadow:4px 4px 7px 2px rgba(0, 0, 0, 0.6)}.button.sc-my-button:disabled{background:linear-gradient(to bottom, #d3d3d3, #9c9999);cursor:not-allowed;box-shadow:none}";

const ButtonComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("button", { class: 'button', disabled: this.disabled, type: this.type }, h("slot", null)));
  }
};
ButtonComponent.style = buttonCss;

const loaderCss = ":root{--primary-color:#42a5f5;--text-color:#323232}:host-context(.light-theme){--button-background-color:#42a5f5;--button-color:#ffffff}:host-context(.dark-theme){--button-background-color:#424242;--button-color:#42a5f5}.lds-roller{display:inline-block;position:relative;width:80px;height:80px}.lds-roller div{animation:lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;transform-origin:40px 40px}.lds-roller div:after{content:\" \";display:block;position:absolute;width:7px;height:7px;border-radius:50%;background-color:#09dfee;margin:-4px 0 0 -4px}.lds-roller div:nth-child(1){animation-delay:-0.036s}.lds-roller div:nth-child(1):after{top:63px;left:63px}.lds-roller div:nth-child(2){animation-delay:-0.072s}.lds-roller div:nth-child(2):after{top:68px;left:56px}.lds-roller div:nth-child(3){animation-delay:-0.108s}.lds-roller div:nth-child(3):after{top:71px;left:48px}.lds-roller div:nth-child(4){animation-delay:-0.144s}.lds-roller div:nth-child(4):after{top:72px;left:40px}.lds-roller div:nth-child(5){animation-delay:-0.18s}.lds-roller div:nth-child(5):after{top:71px;left:32px}.lds-roller div:nth-child(6){animation-delay:-0.216s}.lds-roller div:nth-child(6):after{top:68px;left:24px}.lds-roller div:nth-child(7){animation-delay:-0.252s}.lds-roller div:nth-child(7):after{top:63px;left:17px}.lds-roller div:nth-child(8){animation-delay:-0.288s}.lds-roller div:nth-child(8):after{top:56px;left:12px}@keyframes lds-roller{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const Loader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: 'lds-roller' }, h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null)));
  }
};
Loader.style = loaderCss;

const AV_API_KEY = 'FVKEXCIQ88SLZ4OT';
const urlWithSymbolConstructor = (str) => `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${str}&apikey=${AV_API_KEY}`;

const stockFinderCss = ":root{--primary-color:#42a5f5;--text-color:#323232}:host-context(.light-theme){--button-background-color:#42a5f5;--button-color:#ffffff}:host-context(.dark-theme){--button-background-color:#424242;--button-color:#42a5f5}:host{font-family:sans-serif;border:2px solid #6b096b;margin:auto;padding:1rem;display:block;width:20rem;max-width:100%}:host h1{font-size:1.1rem}:host form input{font:inherit;padding:0.3rem 0.25rem;display:block;margin-bottom:0.5rem;border-radius:4px;margin-top:10px;margin-bottom:20px}:host form input:focus{outline:none}:host form button.sc-my-button{height:35px;padding:0 10px;margin-bottom:30px}:host form button.sc-my-button:focus{outline:none}:host ul{margin:0;padding:0;list-style:none}:host ul li{margin:0 0 10px 0;padding:0.25rem;width:100%;border:1px solid #6b096b;border-radius:4px}:host ul li:hover,:host ul li:active{cursor:pointer;background-color:#6b096b;color:#ffffff;border:2px solid #ffffff;box-shadow:0 0 10px 1px blueviolet}:host(.error){border-color:red}.error{color:red}";

const StockFinder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ucSymbolSelected = createEvent(this, "ucSymbolSelected", 7);
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
  __stencil_render() {
    let searchResults = null;
    if (this.loading) {
      searchResults = h("uc-loader", null);
    }
    if (this.error) {
      searchResults = h("p", { class: 'error' }, this.error);
    }
    if (this.searchResults[0]) {
      searchResults = (h("ul", null, h("h3", null, "Search Results:"), this.searchResults.map((res) => (h("li", { onClick: this.onSelectSymbol.bind(this, res.symbol) }, h("strong", null, res.symbol), " - ", res.name)))));
    }
    return [
      h("h1", null, "Find stock symbol."),
      h("form", { onSubmit: this.onSearchSymbol.bind(this) }, h("input", { id: 'stock-finder', ref: (el) => (this.stockNameInput = el), placeholder: 'company name', onInput: this.onStockNameInput.bind(this), value: this.stockNameValue }), h("my-button", { type: 'submit', class: 'my-button', disabled: !this.stockNameInputValid }, "Search Symbol")),
      searchResults,
    ];
  }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockFinder.style = stockFinderCss;

const stockPriceCss = ":root{--primary-color:#42a5f5;--text-color:#323232}:host-context(.light-theme){--button-background-color:#42a5f5;--button-color:#ffffff}:host-context(.dark-theme){--button-background-color:#424242;--button-color:#42a5f5}:host{font-family:sans-serif;border:2px solid #6b096b;margin:auto;margin-bottom:20px;padding:1rem;display:block;width:20rem;max-width:100%}:host h1{font-size:1.1rem}:host form input{font:inherit;padding:0.3rem 0.25rem;display:block;margin-bottom:0.5rem;border-radius:4px;margin-top:10px;margin-bottom:20px}:host form input.error{border:1px solid red}:host form input:focus{outline:none}:host form button.sc-my-button{height:35px;padding:0 10px;margin-bottom:30px}:host form button.sc-my-button:focus{outline:none}:host(.error){border-color:red}.error{color:red}";

const StockPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  __stencil_render() {
    let contentData = h("p", null, "Please, Enter a Company Symbol.");
    if (this.price) {
      contentData = h("p", null, "Price: $", this.price);
    }
    if (this.error) {
      contentData = h("p", { class: 'error' }, this.error);
    }
    if (this.loading) {
      contentData = h("uc-loader", null);
    }
    return [
      h("h1", null, "Check stock price."),
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: 'stock-symbol', ref: (el) => (this.stockInput = el), value: this.userInput, onInput: this.onUserInput.bind(this), class: this.error && 'error', placeholder: 'company symbol' }), h("my-button", { type: 'submit', class: 'my-button', disabled: !this.userInputValid }, "Check Price")),
      h("div", null, contentData),
    ];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "stockSymbol": ["stickSymbolChange"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = stockPriceCss;

export { ButtonComponent as my_button, Loader as uc_loader, StockFinder as uc_stock_finder, StockPrice as uc_stock_price };
