import {
  Component,
  h,
  State,
  Element,
  Prop,
  Watch,
  Listen,
} from '@stencil/core';
import { urlWithSymbolConstructor } from '../../global/global';

@Component({
  tag: 'uc-stock-price',
  styleUrl: 'stock-price.scss',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @State() price: number;
  @State() userInput: string;
  @State() userInputValid = false;
  @State() loading = false;
  @State() error: string;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stickSymbolChange(newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      this.userInput = newVal;
      this.fetchStockPrice(newVal);
    }
  }

  @Element() el: HTMLElement;

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

  @Listen('ucSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  onUserInput({ target }) {
    this.userInput = target.value;
    if (this.userInput !== '') {
      this.error = '';
      this.userInputValid = true;
    } else {
      this.userInputValid = false;
    }
  }

  hostData() {
    return { class: this.error ? 'error' : '' };
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stockSymbol = (
    //   this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement
    // ).value;
    this.stockSymbol = this.stockInput.value;
    // this.fetchStockPrice(stockSymbol);
  }

  fetchStockPrice(symbol: string) {
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
          throw new Error(
            'Our standard API call frequency is 5 calls per minute and 500 calls per day.'
          );
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
  note = {
    Note: 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.',
  };
  render() {
    let contentData = <p>Please, Enter a Company Symbol.</p>;
    if (this.price) {
      contentData = <p>Price: ${this.price}</p>;
    }
    if (this.error) {
      contentData = <p class='error'>{this.error}</p>;
    }
    if (this.loading) {
      contentData = <uc-loader />;
    }
    return [
      <h1>Check stock price.</h1>,
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id='stock-symbol'
          ref={(el) => (this.stockInput = el)}
          value={this.userInput}
          onInput={this.onUserInput.bind(this)}
          class={this.error && 'error'}
          placeholder='company symbol'
        />
        <my-button
          type='submit'
          class='my-button'
          disabled={!this.userInputValid}
        >
          Check Price
        </my-button>
      </form>,
      <div>{contentData}</div>,
    ];
  }
}
