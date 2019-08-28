/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main2.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Enum/Position.ts":
/*!******************************!*\
  !*** ./src/Enum/Position.ts ***!
  \******************************/
/*! exports provided: Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Position\", function() { return Position; });\nvar Position;\r\n(function (Position) {\r\n    Position[Position[\"Top\"] = 0] = \"Top\";\r\n    Position[Position[\"Right\"] = 1] = \"Right\";\r\n    Position[Position[\"Bottom\"] = 2] = \"Bottom\";\r\n    Position[Position[\"Left\"] = 3] = \"Left\";\r\n})(Position || (Position = {}));\r\n\n\n//# sourceURL=webpack:///./src/Enum/Position.ts?");

/***/ }),

/***/ "./src/Objects/Map.ts":
/*!****************************!*\
  !*** ./src/Objects/Map.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Map = /** @class */ (function () {\r\n    function Map(verticalNumber, horizontalNumber, tiles) {\r\n        if (this.hasCorrectNumberTiles(verticalNumber * horizontalNumber, tiles) && this._isCorrectMap(tiles, verticalNumber, horizontalNumber)) {\r\n            this._verticalNumber = verticalNumber;\r\n            this._horizontalNumber = horizontalNumber;\r\n            this._tiles = tiles;\r\n            console.log(\"以下のマップを生成しました。\");\r\n            this.print();\r\n        }\r\n        else {\r\n            throw \"Tileに不備があります\";\r\n        }\r\n    }\r\n    Map.prototype.print = function () {\r\n        var str = this.getDisplayStrings();\r\n        var text = \"\";\r\n        for (var i = 0; i < this._horizontalNumber * 3; i++) {\r\n            for (var j = 0; j < this._verticalNumber * 3; j++) {\r\n                text += str[j + i * this._horizontalNumber * 3];\r\n            }\r\n            text += \"\\n\";\r\n        }\r\n        console.log(text);\r\n    };\r\n    Map.prototype.getDisplayStrings = function () {\r\n        var displayRoutes = this.getDisplayRoutes();\r\n        var str = [];\r\n        for (var i = 0; i < this._horizontalNumber * 3; i++) {\r\n            for (var j = 0; j < this._verticalNumber * 3; j++) {\r\n                if (displayRoutes[j + i * this._horizontalNumber * 3]) {\r\n                    str.push(\"　\");\r\n                }\r\n                else {\r\n                    str.push(\"＃\");\r\n                }\r\n            }\r\n        }\r\n        return str;\r\n    };\r\n    // 描画順にRouteを並び替える\r\n    Map.prototype.getDisplayRoutes = function () {\r\n        var sortedTilesRoutes = [];\r\n        for (var y = 0; y < this._verticalNumber; y++) {\r\n            for (var i = 0; i < 4; i++) {\r\n                for (var x = 0; x < this._horizontalNumber; x++) {\r\n                    var currentTile = this._tiles[y * this._verticalNumber + x].routes;\r\n                    switch (i) {\r\n                        case 0:\r\n                            sortedTilesRoutes.push(false);\r\n                            sortedTilesRoutes.push(currentTile.top);\r\n                            sortedTilesRoutes.push(false);\r\n                            break;\r\n                        case 1:\r\n                            sortedTilesRoutes.push(currentTile.left);\r\n                            sortedTilesRoutes.push(true);\r\n                            break;\r\n                        case 2:\r\n                            sortedTilesRoutes.push(currentTile.right);\r\n                            break;\r\n                        case 3:\r\n                            sortedTilesRoutes.push(false);\r\n                            sortedTilesRoutes.push(currentTile.bottom);\r\n                            sortedTilesRoutes.push(false);\r\n                            break;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        return sortedTilesRoutes;\r\n    };\r\n    // タイルの数があっているか\r\n    Map.prototype.hasCorrectNumberTiles = function (tilesNumber, tiles) {\r\n        if (tilesNumber === tiles.length) {\r\n            return true;\r\n        }\r\n        return false;\r\n    };\r\n    // タイルがそれぞれ正しい組み合わせか\r\n    Map.prototype._isCorrectMap = function (tiles, verticalNumber, horizontalNumber) {\r\n        var sortedTilesByLocation = this.getSortedTilesByLocation(tiles, verticalNumber, horizontalNumber);\r\n        // 左端のタイルが左に行ける\r\n        var hasLeft = sortedTilesByLocation.left.some(function (tile) {\r\n            return tile.routes.left;\r\n        });\r\n        var hasTop = sortedTilesByLocation.top.some(function (tile) {\r\n            return tile.routes.top;\r\n        });\r\n        // 右端のタイルの右に行けるか\r\n        var hasRight = sortedTilesByLocation.right.some(function (tile) {\r\n            return tile.routes.right;\r\n        });\r\n        // 下端のタイルの下に行けるか\r\n        var hasBottom = sortedTilesByLocation.bottom.some(function (tile) {\r\n            return tile.routes.bottom;\r\n        });\r\n        // タイルの道がMap外\r\n        if (hasLeft || hasBottom || hasRight || hasTop) {\r\n            return false;\r\n        }\r\n        // タイルの道がつながらない場所にあるか\r\n        var hasWrongRoute = tiles.some(function (tile, index) {\r\n            if (tile.routes.top) {\r\n                return !(tiles[index - horizontalNumber].routes.bottom);\r\n            }\r\n            if (tile.routes.right) {\r\n                return !(tiles[index + 1].routes.left);\r\n            }\r\n            if (tile.routes.bottom) {\r\n                return !(tiles[index + horizontalNumber].routes.top);\r\n            }\r\n            if (tile.routes.left) {\r\n                return !(tiles[index - 1].routes.right);\r\n            }\r\n        });\r\n        return !hasWrongRoute;\r\n    };\r\n    Map.prototype.getSortedTilesByLocation = function (tiles, verticalNumber, horizontalNumber) {\r\n        // 左端のタイル\r\n        var leftTiles = tiles.filter(function (tile, index) {\r\n            return index % horizontalNumber === 0;\r\n        });\r\n        // 上端のタイル\r\n        var topTiles = tiles.filter(function (tiles, index) {\r\n            return index < horizontalNumber;\r\n        });\r\n        // 右端のタイル\r\n        var rightTiles = tiles.filter(function (tile, index) {\r\n            return index % horizontalNumber === horizontalNumber - 1;\r\n        });\r\n        // 下端のタイル\r\n        var bottomTiles = tiles.filter(function (tile, index) {\r\n            return verticalNumber * horizontalNumber - horizontalNumber <= index;\r\n        });\r\n        return {\r\n            left: leftTiles,\r\n            top: topTiles,\r\n            right: rightTiles,\r\n            bottom: bottomTiles\r\n        };\r\n    };\r\n    Object.defineProperty(Map.prototype, \"verticalNumber\", {\r\n        get: function () {\r\n            return this._verticalNumber;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Map.prototype, \"horizontalNumber\", {\r\n        get: function () {\r\n            return this._horizontalNumber;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Map.prototype, \"tiles\", {\r\n        get: function () {\r\n            return Array.from(this._tiles);\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return Map;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Map);\r\n\n\n//# sourceURL=webpack:///./src/Objects/Map.ts?");

/***/ }),

/***/ "./src/Objects/Tile.ts":
/*!*****************************!*\
  !*** ./src/Objects/Tile.ts ***!
  \*****************************/
/*! exports provided: RoutesTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RoutesTemplate\", function() { return RoutesTemplate; });\nvar RoutesTemplate = {\r\n    lowerLeft: {\r\n        top: true,\r\n        right: true,\r\n        bottom: false,\r\n        left: false\r\n    },\r\n    lowerRight: {\r\n        top: true,\r\n        right: false,\r\n        bottom: false,\r\n        left: true\r\n    },\r\n    upperLeft: {\r\n        top: false,\r\n        right: true,\r\n        bottom: true,\r\n        left: false\r\n    },\r\n    upperRight: {\r\n        top: false,\r\n        right: false,\r\n        bottom: true,\r\n        left: true\r\n    },\r\n    center: {\r\n        top: true,\r\n        right: true,\r\n        bottom: true,\r\n        left: true\r\n    },\r\n    lower: {\r\n        top: true,\r\n        right: true,\r\n        bottom: false,\r\n        left: true\r\n    },\r\n    upper: {\r\n        top: false,\r\n        right: true,\r\n        bottom: true,\r\n        left: true\r\n    },\r\n    left: {\r\n        top: true,\r\n        right: true,\r\n        bottom: true,\r\n        left: false\r\n    },\r\n    right: {\r\n        top: true,\r\n        right: false,\r\n        bottom: true,\r\n        left: true\r\n    }\r\n};\r\nvar Tile = /** @class */ (function () {\r\n    function Tile(positions) {\r\n        this._routes = positions;\r\n    }\r\n    Object.defineProperty(Tile.prototype, \"routes\", {\r\n        get: function () {\r\n            return Object.assign({}, this._routes);\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return Tile;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tile);\r\n\n\n//# sourceURL=webpack:///./src/Objects/Tile.ts?");

/***/ }),

/***/ "./src/Objects/World.ts":
/*!******************************!*\
  !*** ./src/Objects/World.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Enum_Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Enum/Position */ \"./src/Enum/Position.ts\");\n\r\nvar World = /** @class */ (function () {\r\n    function World(map, tankLocation, tankPosition) {\r\n        if (!(map.horizontalNumber * map.verticalNumber > tankLocation || tankLocation >= 0)) {\r\n            throw \"TankがMap上にありません\";\r\n        }\r\n        this._map = map;\r\n        this._tankLocation = tankLocation;\r\n        this._tankPosition = tankPosition;\r\n        this._states = [{\r\n                order: \"start\",\r\n                location: this._tankLocation,\r\n                position: this._tankPosition\r\n            }];\r\n        this.goForwardTank = this.goForwardTank.bind(this);\r\n        console.log(\"\\u521D\\u671F\\u306E\\u4F4D\\u7F6E: \" + this._states[0].location);\r\n        console.log(\"\\u521D\\u671F\\u306E\\u65B9\\u5411: \" + this._states[0].position);\r\n    }\r\n    // 前に1マス進む\r\n    World.prototype.goForwardTank = function () {\r\n        if (!this.isRoute()) {\r\n            throw \"前に進めません\";\r\n        }\r\n        this._tankLocation = this.getForwardLocation();\r\n        var state = {\r\n            order: \"goForwardTank\",\r\n            location: this._tankLocation,\r\n            position: this._tankPosition\r\n        };\r\n        this._states.push(state);\r\n        return Object.assign({}, state);\r\n    };\r\n    World.prototype.print = function () {\r\n        var displayStrings = Array.from(this._map.getDisplayStrings());\r\n        var tankChar;\r\n        switch (this._tankPosition) {\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Top:\r\n                tankChar = \"上\";\r\n                break;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Right:\r\n                tankChar = \"右\";\r\n                break;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Bottom:\r\n                tankChar = \"下\";\r\n                break;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Left:\r\n                tankChar = \"左\";\r\n                break;\r\n        }\r\n        displayStrings[this.getDisplayLocation()] = tankChar;\r\n        var text = \"\";\r\n        for (var i = 0; i < this._map.horizontalNumber * 3; i++) {\r\n            for (var j = 0; j < this._map.verticalNumber * 3; j++) {\r\n                text += displayStrings[j + i * this._map.horizontalNumber * 3];\r\n            }\r\n            text += \"\\n\";\r\n        }\r\n        console.log(text);\r\n    };\r\n    // 描画上のタンクの位置\r\n    World.prototype.getDisplayLocation = function () {\r\n        var y = Math.floor(this._tankLocation / this._map.horizontalNumber);\r\n        var x = this._tankLocation - y * this._map.horizontalNumber;\r\n        return (1 + 3 * y) * this._map.horizontalNumber * 3 + (1 + 3 * x);\r\n    };\r\n    World.prototype.isRoute = function () {\r\n        switch (this._tankPosition) {\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Top:\r\n                return this._map.tiles[this._tankLocation].routes.top;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Right:\r\n                return this._map.tiles[this._tankLocation].routes.right;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Bottom:\r\n                return this._map.tiles[this._tankLocation].routes.bottom;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Left:\r\n                return this._map.tiles[this._tankLocation].routes.left;\r\n        }\r\n    };\r\n    World.prototype.getForwardLocation = function () {\r\n        switch (this._tankPosition) {\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Top:\r\n                return this._tankLocation - this._map.horizontalNumber;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Right:\r\n                return this._tankLocation + 1;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Bottom:\r\n                return this._tankLocation + this._map.horizontalNumber;\r\n            case _Enum_Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].Left:\r\n                return this._tankLocation - 1;\r\n            default:\r\n                return this._tankLocation;\r\n        }\r\n    };\r\n    return World;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (World);\r\n\n\n//# sourceURL=webpack:///./src/Objects/World.ts?");

/***/ }),

/***/ "./src/main2.ts":
/*!**********************!*\
  !*** ./src/main2.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Objects/Tile */ \"./src/Objects/Tile.ts\");\n/* harmony import */ var _Objects_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Objects/Map */ \"./src/Objects/Map.ts\");\n/* harmony import */ var _Objects_World__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Objects/World */ \"./src/Objects/World.ts\");\n/* harmony import */ var _Enum_Position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enum/Position */ \"./src/Enum/Position.ts\");\n\r\n\r\n\r\n\r\n/* VTank内部 */\r\n// 利用するTile(4x4)\r\nvar tiles = [\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].upperLeft),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].upper),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].upperRight),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].left),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].center),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].right),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].lowerLeft),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].lower),\r\n    new _Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_Objects_Tile__WEBPACK_IMPORTED_MODULE_0__[\"RoutesTemplate\"].lowerRight)\r\n];\r\n// Mapの生成\r\nvar map = new _Objects_Map__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3, 3, tiles);\r\nvar world = new _Objects_World__WEBPACK_IMPORTED_MODULE_2__[\"default\"](map, 3, _Enum_Position__WEBPACK_IMPORTED_MODULE_3__[\"Position\"].Bottom);\r\nworld.print();\r\n\n\n//# sourceURL=webpack:///./src/main2.ts?");

/***/ })

/******/ });