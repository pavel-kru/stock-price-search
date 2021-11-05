/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface MyButton {
        "disabled": boolean;
        "type": string;
    }
    interface UcLoader {
    }
    interface UcStockFinder {
    }
    interface UcStockPrice {
        "stockSymbol": string;
    }
}
declare global {
    interface HTMLMyButtonElement extends Components.MyButton, HTMLStencilElement {
    }
    var HTMLMyButtonElement: {
        prototype: HTMLMyButtonElement;
        new (): HTMLMyButtonElement;
    };
    interface HTMLUcLoaderElement extends Components.UcLoader, HTMLStencilElement {
    }
    var HTMLUcLoaderElement: {
        prototype: HTMLUcLoaderElement;
        new (): HTMLUcLoaderElement;
    };
    interface HTMLUcStockFinderElement extends Components.UcStockFinder, HTMLStencilElement {
    }
    var HTMLUcStockFinderElement: {
        prototype: HTMLUcStockFinderElement;
        new (): HTMLUcStockFinderElement;
    };
    interface HTMLUcStockPriceElement extends Components.UcStockPrice, HTMLStencilElement {
    }
    var HTMLUcStockPriceElement: {
        prototype: HTMLUcStockPriceElement;
        new (): HTMLUcStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "my-button": HTMLMyButtonElement;
        "uc-loader": HTMLUcLoaderElement;
        "uc-stock-finder": HTMLUcStockFinderElement;
        "uc-stock-price": HTMLUcStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface MyButton {
        "disabled"?: boolean;
        "type"?: string;
    }
    interface UcLoader {
    }
    interface UcStockFinder {
        "onUcSymbolSelected"?: (event: CustomEvent<string>) => void;
    }
    interface UcStockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "my-button": MyButton;
        "uc-loader": UcLoader;
        "uc-stock-finder": UcStockFinder;
        "uc-stock-price": UcStockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-button": LocalJSX.MyButton & JSXBase.HTMLAttributes<HTMLMyButtonElement>;
            "uc-loader": LocalJSX.UcLoader & JSXBase.HTMLAttributes<HTMLUcLoaderElement>;
            "uc-stock-finder": LocalJSX.UcStockFinder & JSXBase.HTMLAttributes<HTMLUcStockFinderElement>;
            "uc-stock-price": LocalJSX.UcStockPrice & JSXBase.HTMLAttributes<HTMLUcStockPriceElement>;
        }
    }
}
