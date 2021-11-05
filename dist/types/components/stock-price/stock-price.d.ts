export declare class StockPrice {
  stockInput: HTMLInputElement;
  price: number;
  userInput: string;
  userInputValid: boolean;
  loading: boolean;
  error: string;
  stockSymbol: string;
  stickSymbolChange(newVal: string, oldVal: string): void;
  el: HTMLElement;
  componentWillLoad(): void;
  componentDidLoad(): void;
  onStockSymbolSelected(event: CustomEvent): void;
  onUserInput({ target }: {
    target: any;
  }): void;
  hostData(): {
    class: string;
  };
  onFetchStockPrice(event: Event): void;
  fetchStockPrice(symbol: string): void;
  note: {
    Note: string;
  };
  render(): any[];
}
