/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/index.js":
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
/***/ (() => {

eval("var transactions = [];\nvar myChart;\nfetch(\"/api/transaction\").then(function (response) {\n  return response.json();\n}).then(function (data) {\n  // save db data on global variable\n  transactions = data;\n  populateTotal();\n  populateTable();\n  populateChart();\n});\n\nfunction populateTotal() {\n  // reduce transaction amounts to a single total value\n  var total = transactions.reduce(function (total, t) {\n    return total + parseInt(t.value);\n  }, 0);\n  var totalEl = document.querySelector(\"#total\");\n  totalEl.textContent = total;\n}\n\nfunction populateTable() {\n  var tbody = document.querySelector(\"#tbody\");\n  tbody.innerHTML = \"\";\n  transactions.forEach(function (transaction) {\n    // create and populate a table row\n    var tr = document.createElement(\"tr\");\n    tr.innerHTML = \"\\n      <td>\".concat(transaction.name, \"</td>\\n      <td>\").concat(transaction.value, \"</td>\\n    \");\n    tbody.appendChild(tr);\n  });\n}\n\nfunction populateChart() {\n  // copy array and reverse it\n  var reversed = transactions.slice().reverse();\n  var sum = 0; // create date labels for chart\n\n  var labels = reversed.map(function (t) {\n    var date = new Date(t.date);\n    return \"\".concat(date.getMonth() + 1, \"/\").concat(date.getDate(), \"/\").concat(date.getFullYear());\n  }); // create incremental values for chart\n\n  var data = reversed.map(function (t) {\n    sum += parseInt(t.value);\n    return sum;\n  }); // remove old chart if it exists\n\n  if (myChart) {\n    myChart.destroy();\n  }\n\n  var ctx = document.getElementById(\"myChart\").getContext(\"2d\");\n  myChart = new Chart(ctx, {\n    type: 'line',\n    data: {\n      labels: labels,\n      datasets: [{\n        label: \"Total Over Time\",\n        fill: true,\n        backgroundColor: \"#6666ff\",\n        data: data\n      }]\n    }\n  });\n}\n\nfunction sendTransaction(isAdding) {\n  var nameEl = document.querySelector(\"#t-name\");\n  var amountEl = document.querySelector(\"#t-amount\");\n  var errorEl = document.querySelector(\".form .error\"); // validate form\n\n  if (nameEl.value === \"\" || amountEl.value === \"\") {\n    errorEl.textContent = \"Missing Information\";\n    return;\n  } else {\n    errorEl.textContent = \"\";\n  } // create record\n\n\n  var transaction = {\n    name: nameEl.value,\n    value: amountEl.value,\n    date: new Date().toISOString()\n  }; // if subtracting funds, convert amount to negative number\n\n  if (!isAdding) {\n    transaction.value *= -1;\n  } // add to beginning of current array of data\n\n\n  transactions.unshift(transaction); // re-run logic to populate ui with new record\n\n  populateChart();\n  populateTable();\n  populateTotal(); // also send to server\n\n  fetch(\"/api/transaction\", {\n    method: \"POST\",\n    body: JSON.stringify(transaction),\n    headers: {\n      Accept: \"application/json, text/plain, */*\",\n      \"Content-Type\": \"application/json\"\n    }\n  }).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    if (data.errors) {\n      errorEl.textContent = \"Missing Information\";\n    } else {\n      // clear form\n      nameEl.value = \"\";\n      amountEl.value = \"\";\n    }\n  })[\"catch\"](function (err) {\n    // fetch failed, so save in indexed db\n    saveRecord(transaction); // clear form\n\n    nameEl.value = \"\";\n    amountEl.value = \"\";\n  });\n}\n\ndocument.querySelector(\"#add-btn\").onclick = function () {\n  sendTransaction(true);\n};\n\ndocument.querySelector(\"#sub-btn\").onclick = function () {\n  sendTransaction(false);\n};\n\n//# sourceURL=webpack://public/./assets/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/index.js"]();
/******/ 	
/******/ })()
;