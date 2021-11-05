'use strict';

const index = require('./index-aefe4e13.js');

/*
 Stencil Client Patch Browser v2.8.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('stencil-components.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["my-button_4.cjs",[[1,"uc-stock-finder",{"searchResults":[32],"stockNameValue":[32],"loading":[32],"stockNameInputValid":[32],"error":[32]}],[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"price":[32],"userInput":[32],"userInputValid":[32],"loading":[32],"error":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[6,"my-button",{"type":[1],"disabled":[516]}],[1,"uc-loader"]]]], options);
});
