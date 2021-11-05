import { EventEmitter } from '../stencil-public-runtime';
export declare class StockFinder {
  stockNameInput: HTMLInputElement;
  searchResults: {
    symbol: string;
    name: string;
  }[];
  stockNameValue: string;
  loading: boolean;
  stockNameInputValid: boolean;
  error: string;
  ucSymbolSelected: EventEmitter<string>;
  onSelectSymbol(symbol: string): void;
  hostData(): {
    class: string;
  };
  onStockNameInput({ target }: {
    target: any;
  }): void;
  onSearchSymbol(event: Event): void;
  render(): any[];
}
