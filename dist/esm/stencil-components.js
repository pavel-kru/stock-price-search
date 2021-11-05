import { p as promiseResolve, b as bootstrapLazy } from './index-3dc7e740.js';

/*
 Stencil Client Patch Browser v2.8.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["my-button_4",[[1,"uc-stock-finder",{"searchResults":[32],"stockNameValue":[32],"loading":[32],"stockNameInputValid":[32],"error":[32]}],[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"price":[32],"userInput":[32],"userInputValid":[32],"loading":[32],"error":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[6,"my-button",{"type":[1],"disabled":[516]}],[1,"uc-loader"]]]], options);
});
