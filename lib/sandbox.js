
// ## License (MIT)

// Copyright (c) 2016 Hage Yaapa

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


var vm = require('vm');

module.exports = function sandbox (code, context, opts, {timeout}={}) {
  let newContext = {};
  if (context) {
    Object.keys(context).forEach(function (key) {
      newContext[key] = context[key];
      
    });
  }
  const vmContext = vm.createContext(newContext);
  // Create the Sandbox
  const resultKey = 'SAFE_VALUE_' + Math.floor(Math.random() * 1000000);
  
   let clearContext = '';
  //   `
  //   (function(){
  //     const keys = Object.getOwnPropertyNames(this);
  //     keys.forEach((key) => {
  //       const item = this[key];
  //       if(typeof(item)=='function' && key!='_') item.bind(this);
  //     });
  //   })();
  // `;
  code = clearContext + resultKey + '=' + code;
  const script = new vm.Script(code);
  
  script.runInNewContext(vmContext, {
    timeout: timeout || 15000//,
    //microtaskMode: 'afterEvaluate' // from Node 14 should properly timeout async script
  });
  

  return vmContext[resultKey];


  // let sandbox = {};
  // let resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000);
  // sandbox[resultKey] = {};
  // let clearContext = `
  //   (function(){
  //     Function = undefined;
  //     const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
  //     keys.forEach((key) => {
  //       const item = this[key];
  //       if(!item || typeof item.constructor !== 'function') return;
  //       this[key].constructor = 'cleared';
  //     });
  //   })();
  // `;
  // code = clearContext + resultKey + '=' + code;
  // if (context) {
  //   Object.keys(context).forEach(function (key) {
  //     sandbox[key] = context[key];
  //   })
  // }
  // vm.runInNewContext(code, sandbox, opts);
  // return sandbox[resultKey];
}
