import { Component, Event, EventEmitter, h, State } from '@stencil/core';
import { AV_API_KEY } from '../global/global';

@Component({
  tag: 'uc-stock-finder',
  styleUrls: ['./stock-finder.scss'],
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string }[] = [];
  @State() stockNameValue: string;
  @State() loading = false;
  @State() stockNameInputValid = false;
  @State() error = '';

  @Event({ bubbles: true, composed: true })
  ucSymbolSelected: EventEmitter<string>;

  onSelectSymbol(symbol: string) {
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
    } else {
      this.stockNameInputValid = false;
    }
  }

  onSearchSymbol(event: Event) {
    event.preventDefault();
    this.searchResults = [];
    const stockName = this.stockNameInput.value;
    this.loading = true;
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`
    )
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
      searchResults = <uc-loader />;
    }
    if (this.error) {
      searchResults = <p class='error'>{this.error}</p>;
    }
    if (this.searchResults[0]) {
      searchResults = (
        <ul>
          <h3>Search Results:</h3>
          {this.searchResults.map((res) => (
            <li onClick={this.onSelectSymbol.bind(this, res.symbol)}>
              <strong>{res.symbol}</strong> - {res.name}
            </li>
          ))}
        </ul>
      );
    }

    return [
      <h1>Find stock symbol.</h1>,
      <form onSubmit={this.onSearchSymbol.bind(this)}>
        <input
          id='stock-finder'
          ref={(el) => (this.stockNameInput = el)}
          placeholder='company name'
          onInput={this.onStockNameInput.bind(this)}
          value={this.stockNameValue}
        />
        <my-button
          type='submit'
          class='my-button'
          disabled={!this.stockNameInputValid}
        >
          Search Symbol
        </my-button>
      </form>,
      searchResults,
    ];
  }
}
