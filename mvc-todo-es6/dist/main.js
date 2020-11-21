/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./js/storage.js");
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model.js */ "./js/model.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template.js */ "./js/template.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view.js */ "./js/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controller.js */ "./js/controller.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var App = function App() {
  _classCallCheck(this, App);

  this.storage = new _storage_js__WEBPACK_IMPORTED_MODULE_0__.default("todos");
  this.model = new _model_js__WEBPACK_IMPORTED_MODULE_1__.default(this.storage);
  this.template = new _template_js__WEBPACK_IMPORTED_MODULE_2__.default();
  this.view = new _view_js__WEBPACK_IMPORTED_MODULE_3__.default(this.template);
  this.controller = new _controller_js__WEBPACK_IMPORTED_MODULE_4__.default(this.model, this.view);
};

new App();

/***/ }),

/***/ "./js/controller.js":
/*!**************************!*\
  !*** ./js/controller.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(model, view) {
    var _this = this;

    _classCallCheck(this, Controller);

    this.model = model;
    this.view = view;
    this.showAll();
    this.view.bind("newTodo", function (title) {
      _this.addItem(title);
    });
    this.view.bind("itemRemove", function (item) {
      _this.removeItem(item.id);
    });
    this.view.bind("itemToggle", function (item) {
      _this.toggleComplete(item.id, item.completed);
    });
    this.view.bind("itemEdit", function (item) {
      _this.editItem(item.id);
    });
    this.view.bind("itemEditDone", function (item) {
      _this.editItemSave(item.id, item.title);
    });
    this.view.bind("removeCompleted", function () {
      _this.removeCompletedItems();
    });
  }

  _createClass(Controller, [{
    key: "showAll",
    value: function showAll() {
      var _this2 = this;

      this.model.read(function (data) {
        _this2.view.render("showEntries", data);
      });
    }
  }, {
    key: "addItem",
    value: function addItem(title) {
      var _this3 = this;

      if (title.trim() === "") return; // 새로운 데이터를 로컬 스토리지에 저장하고 인풋 창을 초기화한다.

      this.model.create(title, function (title) {
        _this3.view.render("clearNewTodo", title);
      }); // 새로운 데이터가 반영된 데이터를 읽어들여 이 데이터를 토대로 뷰를 렌더링한다.

      this.showAll();
    }
  }, {
    key: "removeItem",
    value: function removeItem(id) {
      var _this4 = this;

      this.model.remove(id, function (id) {
        _this4.view.render("removeItem", id);
      });
    }
  }, {
    key: "toggleComplete",
    value: function toggleComplete(id, completed) {
      var _this5 = this;

      this.model.update(id, {
        completed: completed
      }, function (data) {
        _this5.view.render("elementComplete", {
          id: data.id,
          completed: data.completed
        });
      });
    }
  }, {
    key: "editItem",
    value: function editItem(id) {
      var _this6 = this;

      this.model.read(id, function (data) {
        _this6.view.render("editItem", {
          id: id,
          title: data[0].title
        });
      });
    }
  }, {
    key: "editItemSave",
    value: function editItemSave(id, title) {
      var _this7 = this;

      title = title.trim();

      if (title.length !== 0) {
        this.model.update(id, {
          title: title
        }, function (data) {
          _this7.view.render("editItemDone", {
            id: data.id,
            title: data.title
          });
        });
      } else {
        this.removeItem(id);
      }
    }
  }, {
    key: "removeCompletedItems",
    value: function removeCompletedItems() {
      var _this8 = this;

      this.model.read({
        completed: true
      }, function (data) {
        data.forEach(function (item) {
          return _this8.removeItem(item);
        });
      });
    }
  }]);

  return Controller;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controller);

/***/ }),

/***/ "./js/model.js":
/*!*********************!*\
  !*** ./js/model.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model(storage) {
    _classCallCheck(this, Model);

    this.storage = storage;
  }

  _createClass(Model, [{
    key: "read",
    value: function read(query, callback) {
      var queryType = _typeof(query);

      callback = callback || function () {};

      if (queryType === "function") {
        callback = query;
        return this.storage.findAll(callback);
      } else if (queryType === "number" || queryType === "string") {
        query = parseInt(query, 10);
        return this.storage.find({
          id: query
        }, callback);
      } else {
        return this.storage.find(query, callback);
      }
    }
  }, {
    key: "create",
    value: function create(title, callback) {
      title = title || "";

      callback = callback || function () {};

      var newTodo = {
        title: title.trim(),
        completed: false
      };
      this.storage.save(newTodo, callback);
    }
  }, {
    key: "remove",
    value: function remove(id, callback) {
      this.storage.remove(id, callback);
    }
  }, {
    key: "update",
    value: function update(id, data, callback) {
      this.storage.save(data, callback, id);
    }
  }]);

  return Model;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);

/***/ }),

/***/ "./js/storage.js":
/*!***********************!*\
  !*** ./js/storage.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Storage = /*#__PURE__*/function () {
  function Storage(name) {
    _classCallCheck(this, Storage);

    this._dbName = name;

    if (!localStorage.getItem(name)) {
      var data = {
        todos: []
      };
      localStorage.setItem(this._dbName, JSON.stringify(data));
    }
  }

  _createClass(Storage, [{
    key: "findAll",
    value: function findAll(callback) {
      callback.call(this, JSON.parse(localStorage.getItem(this._dbName)).todos);
    }
  }, {
    key: "save",
    value: function save(updateData, callback, id) {
      var data = JSON.parse(localStorage.getItem(this._dbName));
      var targetTodo;

      if (id) {
        data.todos = data.todos.map(function (todo) {
          if (todo.id === id) {
            todo = _objectSpread(_objectSpread({}, todo), updateData);
            targetTodo = todo;
          }

          return todo;
        });
        localStorage.setItem(this._dbName, JSON.stringify(data));
        callback.call(this, targetTodo);
      } else {
        updateData.id = new Date().getTime();
        data.todos.push(updateData);
        localStorage.setItem(this._dbName, JSON.stringify(data));
        callback.call(this, [updateData]);
      }
    }
  }, {
    key: "remove",
    value: function remove(id, callback) {
      var data = JSON.parse(localStorage.getItem(this._dbName));
      var todos = data.todos;
      todos = todos.filter(function (todo) {
        return todo.id !== id;
      });
      localStorage.setItem(this._dbName, JSON.stringify(data));
      callback.call(this, id);
    }
  }, {
    key: "find",
    value: function find(query, callback) {
      if (!callback) return;
      var data = JSON.parse(localStorage.getItem(this._dbName));
      var todos = data.todos;
      var targetTodos = todos.filter(function (todo) {
        for (var q in query) {
          if (todo[q] !== query[q]) return false;
          return true;
        }
      });
      callback.call(this, targetTodos);
    }
  }]);

  return Storage;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);

/***/ }),

/***/ "./js/template.js":
/*!************************!*\
  !*** ./js/template.js ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Template = /*#__PURE__*/function () {
  function Template() {
    _classCallCheck(this, Template);

    this.defaultTemplate = "\n      <li data-id=\"{{id}}\" class=\"{{completed}}\">\n        <div class=\"view\">\n          <input class=\"toggle\" type=\"checkbox\" {{checked}} />\n          <label>{{title}}</label>\n          <button class=\"destroy\"></button>\n        </div>\n      </li>\n    ";
  }

  _createClass(Template, [{
    key: "insert",
    value: function insert(data) {
      if (data.length === 0) return "";
      var view = "";
      var template;

      for (var i = 0; i < data.length; i++) {
        template = this.defaultTemplate;
        var completed = "";
        var checked = "";

        if (data[i].completed) {
          completed = "completed";
          checked = "checked";
        }

        template = template.replace("{{id}}", data[i].id);
        template = template.replace("{{title}}", data[i].title);
        template = template.replace("{{completed}}", completed);
        template = template.replace("{{checked}}", checked);
        view = view + template;
      }

      return view;
    }
  }]);

  return Template;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Template);

/***/ }),

/***/ "./js/view.js":
/*!********************!*\
  !*** ./js/view.js ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View(template) {
    _classCallCheck(this, View);

    this.template = template;
    this.$todoList = document.querySelector(".todo-list");
    this.$todoInput = document.querySelector(".new-todo");
    this.$clearCompleted = document.querySelector(".clear-completed");
  }

  _createClass(View, [{
    key: "bind",
    value: function bind(event, handler) {
      var _this = this;

      if (event === "newTodo") {
        this.$todoInput.addEventListener("change", function () {
          handler(_this.$todoInput.value);
        });
      } else if (event === "itemRemove") {
        this.$todoList.addEventListener("click", function (event) {
          var target = event.target;

          if (target.className === "destroy") {
            var targetId = _this._getItemId(target.parentNode, "li");

            console.log(targetId);
            handler({
              id: targetId
            });
          }
        });
      } else if (event === "itemToggle") {
        this.$todoList.addEventListener("click", function (event) {
          var target = event.target;

          if (target.type === "checkbox") {
            var targetId = _this._getItemId(target);

            handler({
              id: targetId,
              completed: target.checked
            });
          }
        });
      } else if (event === "itemEdit") {
        this.$todoList.addEventListener("click", function (event) {
          var target = event.target;

          if (target.tagName.toLowerCase() === "label") {
            var targetId = _this._getItemId(target);

            handler({
              id: targetId
            });
          }
        });
      } else if (event === "itemEditDone") {
        this.$todoList.addEventListener("keypress", function (event) {
          if (event.keyCode === 13) {
            var target = event.target;

            var targetId = _this._itemId(target);

            handler({
              id: targetId,
              title: target.value
            });
          }
        });
      } else if (event === "removeCompleted") {
        this.$clearCompleted.addEventListener("click", function () {
          handler();
        });
      }
    }
  }, {
    key: "render",
    value: function render(viewCmd, data) {
      var _this2 = this;

      var viewCommands = {
        showEntries: function showEntries() {
          _this2._addItem(data);
        },
        clearNewTodo: function clearNewTodo() {
          _this2.$todoInput.value = "";
        },
        removeItem: function removeItem() {
          _this2._removeItem(data);
        },
        elementComplete: function elementComplete() {
          _this2._elementComplete(data.id, data.completed);
        },
        editItem: function editItem() {
          _this2._editItem(data.id, data.title);
        },
        editItemDone: function editItemDone() {
          _this2._editItemDone(data.id, data.title);
        }
      };
      viewCommands[viewCmd]();
    }
  }, {
    key: "_addItem",
    value: function _addItem(data) {
      this.$todoList.innerHTML = this.template.insert(data);
    }
  }, {
    key: "_getItemId",
    value: function _getItemId(element, tagName) {
      var li;

      if (tagName) {
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
          li = element.parentNode;
        }
      } else {
        li = element.parentNode.parentNode;
      }

      return parseInt(li.dataset.id, 10);
    }
  }, {
    key: "_itemId",
    value: function _itemId(element) {
      var li;
      li = element.parentNode;
      return parseInt(li.dataset.id, 10);
    }
  }, {
    key: "_removeItem",
    value: function _removeItem(id) {
      var listItem = document.querySelector('[data-id="' + id + '"]');

      if (listItem) {
        this.$todoList.removeChild(listItem);
      }
    }
  }, {
    key: "_elementComplete",
    value: function _elementComplete(id, completed) {
      var listItem = document.querySelector('[data-id="' + id + '"]');

      if (listItem) {
        listItem.className = completed ? "completed" : "";
      }
    }
  }, {
    key: "_editItem",
    value: function _editItem(id, title) {
      var listItem = document.querySelector('[data-id="' + id + '"]');

      if (listItem) {
        listItem.className += "editing";
        var input = document.createElement("input");
        input.className = "edit";
        listItem.appendChild(input);
        input.focus();
        input.value = title;
      }
    }
  }, {
    key: "_editItemDone",
    value: function _editItemDone(id, title) {
      var listItem = document.querySelector('[data-id="' + id + '"]');

      if (listItem) {
        var input = document.querySelector("input.edit", listItem);
        listItem.removeChild(input);
        listItem.className = listItem.className.replace("editing", "");
        var labels = document.querySelectorAll("label");
        labels.forEach(function (label) {
          if (label.parentNode.parentNode === listItem) {
            label.textContent = title;
          }
        });
      }
    }
  }]);

  return View;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map