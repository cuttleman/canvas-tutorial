// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Text = /*#__PURE__*/function () {
  function Text() {
    _classCallCheck(this, Text);

    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  _createClass(Text, [{
    key: "setText",
    value: function setText(str, density, stageWidth, stageHeight) {
      this.canvas.width = stageWidth;
      this.canvas.height = stageHeight;
      var myText = str;
      var fontWidth = 500;
      var fontSize = 400;
      var fontName = "Hind";
      this.ctx.clearRect(0, 0, stageWidth, stageHeight);
      this.ctx.font = "".concat(fontWidth, " ").concat(fontSize, "px ").concat(fontName);
      this.ctx.fillStyle = "rgba(255,255,255,0.01)";
      this.ctx.textBaseline = "alphabetic";
      var fontPos = this.ctx.measureText(myText);
      this.ctx.fillText(myText, (stageWidth - fontPos.width) / 2, fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent + (stageHeight - fontSize) / 2);
      return this.dotPos(density, stageWidth, stageHeight);
    }
  }, {
    key: "dotPos",
    value: function dotPos(density, stageWidth, stageHeight) {
      var imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;
      var particles = [];
      var i = 0;
      var width = 0;
      var pixel;

      for (var height = 0; height < stageHeight; height += density) {
        ++i;
        var slide = i % 2 == 0;
        width = 0;

        if (slide == 1) {
          width += 6;
        }

        for (width; width < stageWidth; width += density) {
          pixel = imageData[(width + height * stageWidth) * 4 - 1];

          if (pixel != 0 && width > 0 && width < stageWidth && height > 0 && height < stageHeight) {
            particles.push({
              x: width,
              y: height
            });
          }
        }
      }

      return particles;
    }
  }]);

  return Text;
}();

exports.Text = Text;
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = distance;
exports.pointCircle = pointCircle;
exports.hslToHex = hslToHex;

function distance(x1, y1, x2, y2) {
  var x = x2 - x1;
  var y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

function pointCircle(px, py, cx, cy, r) {
  if (distance(px, py, cx, cy) <= r) {
    return true;
  } else {
    return false;
  }
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs(h / 60 % 2 - 1));
  var m = l - c / 2;
  var red = 0;
  var green = 0;
  var blue = 0;

  if (0 <= h && h < 60) {
    red = c;
    green = x;
    blue = 0;
  } else if (60 <= h && h < 120) {
    red = x;
    green = c;
    blue = 0;
  } else if (120 <= h && h < 180) {
    red = 0;
    green = c;
    blue = x;
  } else if (180 <= h && h < 240) {
    red = 0;
    green = x;
    blue = c;
  } else if (240 <= h && h < 300) {
    red = x;
    green = 0;
    blue = c;
  } else if (300 <= h && h < 360) {
    red = c;
    green = 0;
    blue = x;
  }

  red = red + m;
  green = green + m;
  blue = blue + m;
  return (red * 255 << 16) + (green * 255 << 8) + (blue * 255 | 0);
}
},{}],"particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle(pos, groupRatio, indexRatio, texture) {
    _classCallCheck(this, Particle);

    this.sprite = new PIXI.Sprite(texture);
    var minScale = 0.3;
    var maxScale = 0.6;
    var scale = (maxScale - minScale) * indexRatio + minScale;
    this.sprite.scale.set(scale);
    var minLight = 60;
    var maxLight = 40;
    var light = (maxLight - minLight) * indexRatio + minLight;
    var minHue = 280;
    var maxHue = 330;
    var hue = (maxHue - minHue) * groupRatio + minHue;
    this.sprite.tint = (0, _utils.hslToHex)(hue, 84, light);
    this.x = pos.x;
    this.y = pos.y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.vx = 0;
    this.vy = 0;
  }

  _createClass(Particle, [{
    key: "animate",
    value: function animate(index, total) {
      if (index < total) {
        this.x += this.vx;
        this.y += this.vy;
      }

      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }]);

  return Particle;
}();

exports.Particle = Particle;
},{"./utils":"utils.js"}],"particle-group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleGroup = void 0;

var _particle = require("./particle");

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_ANGLE = 90 * Math.PI / 180;
var GRAVITY = 0.4;
var VERTICAL_RATE = 0.3;
var MOUSE_PULL_RATE = 0.1;
var FRICTION = 0.97;
var MOUSE_MOVE_FRICTION = 0.7;

var ParticleGroup = /*#__PURE__*/function () {
  function ParticleGroup(pos, groupRatio, texture, lineTotal) {
    _classCallCheck(this, ParticleGroup);

    this.particles = [];

    for (var i = 0; i < lineTotal; i++) {
      var item = new _particle.Particle(pos, groupRatio, i / lineTotal, texture);
      this.particles.push(item);
    }
  }

  _createClass(ParticleGroup, [{
    key: "animate",
    value: function animate(mouse) {
      var total = this.particles.length;

      for (var i = 0; i < total; i++) {
        var item = this.particles[i];
        item.vy += GRAVITY;

        if ((0, _utils.pointCircle)(item.x, item.y, mouse.x, mouse.y, 60)) {
          var pos = this.getPullPos(item.x, item.y, mouse.x, mouse.y);
          item.vx += pos.x;
          item.vy += pos.y;
          item.vx *= MOUSE_MOVE_FRICTION;
          item.vy *= MOUSE_MOVE_FRICTION;
        }

        if (i < total - 1) {
          var next = this.particles[i + 1];
          this.setAngle(item, next, 0);
          this.setAngle(next, item, Math.PI);
        }

        item.vx *= FRICTION;
        item.vy *= FRICTION;
        item.animate(i, total - 1);
      }
    }
  }, {
    key: "getPullPos",
    value: function getPullPos(x1, y1, x2, y2) {
      var dist = (0, _utils.distance)(x1, y1, x2, y2);
      var angle = Math.atan2(y2 - y1, x2 - x1);
      var x = Math.cos(angle) * dist * MOUSE_PULL_RATE;
      var y = Math.sin(angle) * dist * MOUSE_PULL_RATE;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "setAngle",
    value: function setAngle(item1, item2, connectAngle) {
      var angle = connectAngle - DEFAULT_ANGLE;
      var tx = item1.x + Math.cos(angle);
      var ty = item1.x + Math.sin(angle);
      var vx = (item2.x - tx) * VERTICAL_RATE;
      var vy = (item2.y - ty) * VERTICAL_RATE;
      item1.vx += vx;
      item1.vy += vy;
      item2.vx -= vx;
      item2.vy -= vy;
    }
  }]);

  return ParticleGroup;
}();

exports.ParticleGroup = ParticleGroup;
},{"./particle":"particle.js","./utils":"utils.js"}],"particle.png":[function(require,module,exports) {
module.exports = "/particle.02a616eb.png";
},{}],"visual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visual = void 0;

var _text = require("./text");

var _particleGroup = require("./particle-group");

var _particle = _interopRequireDefault(require("./particle.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LINE_TOTAL = 10;

var Visual = /*#__PURE__*/function () {
  function Visual() {
    _classCallCheck(this, Visual);

    this.text = new _text.Text();
    this.texture = PIXI.Texture.from(_particle.default);
    this.particleGroups = [];
    this.mouse = {
      x: 0,
      y: 0,
      radius: 10
    };
    document.addEventListener("pointermove", this.onMove.bind(this), false);
  }

  _createClass(Visual, [{
    key: "show",
    value: function show(stageWidth, stageHeight, stage) {
      if (this.container) {
        stage.removeChild(this.container);
      }

      this.pos = this.text.setText("JUNO", 10, stageWidth, stageHeight);
      this.container = new PIXI.ParticleContainer(this.pos.length * LINE_TOTAL, {
        vertices: false,
        position: true,
        rotation: false,
        scale: false,
        uvs: false,
        tint: true
      });
      stage.addChild(this.container);
      this.particleGroups = [];
      var total = this.pos.length;

      for (var i = 0; i < total; i++) {
        var item = new _particleGroup.ParticleGroup(this.pos[i], i / total, this.texture, LINE_TOTAL);
        this.particleGroups.push(item);
      }

      for (var _i = LINE_TOTAL - 1; _i >= 0; _i--) {
        this.addChild(_i);
      }
    }
  }, {
    key: "addChild",
    value: function addChild(index) {
      for (var i = 0; i < this.particleGroups.length; i++) {
        this.container.addChild(this.particleGroups[i].particles[index].sprite);
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      for (var i = 0; i < this.particleGroups.length; i++) {
        var item = this.particleGroups[i];
        item.animate(this.mouse);
      }
    }
  }, {
    key: "onMove",
    value: function onMove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }
  }]);

  return Visual;
}();

exports.Visual = Visual;
},{"./text":"text.js","./particle-group":"particle-group.js","./particle.png":"particle.png"}],"app.js":[function(require,module,exports) {
"use strict";

var _visual = require("./visual");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    var _this = this;

    _classCallCheck(this, App);

    this.setWebgl();
    WebFont.load({
      google: {
        families: ["Hind: 700"]
      },
      fontactive: function fontactive() {
        _this.visual = new _visual.Visual();

        _this.resize();

        window.addEventListener("resize", _this.resize.bind(_this), false); //

        requestAnimationFrame(_this.animate.bind(_this));
      }
    });
  }

  _createClass(App, [{
    key: "setWebgl",
    value: function setWebgl() {
      this.renderer = new PIXI.Renderer({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        antialias: true,
        transparent: false,
        resolution: window.devicePixelRatio > 1 ? 2 : 1,
        autoDensity: true,
        powerPreference: "high-performance",
        backgroundColor: 0xffffff
      });
      document.body.appendChild(this.renderer.view);
      this.stage = new PIXI.Container();
    }
  }, {
    key: "resize",
    value: function resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;
      this.renderer.resize(this.stageWidth, this.stageHeight);
      this.visual.show(this.stageWidth, this.stageHeight, this.stage);
    }
  }, {
    key: "animate",
    value: function animate(t) {
      requestAnimationFrame(this.animate.bind(this));
      this.visual.animate();
      this.renderer.render(this.stage);
    }
  }]);

  return App;
}();

window.onload = function () {
  new App();
};
},{"./visual":"visual.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50500" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map