(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _Line=_interopRequireDefault(require("./itam/Line")),_Dot=_interopRequireDefault(require("./itam/Dot"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var canvas=document.createElement("canvas");document.body.prepend(canvas),canvas.width=window.innerWidth,canvas.height=window.innerHeight;var animateId,ctx=canvas.getContext("2d"),line=new _Line.default,dots=[],isClick=!1,mouse={x:canvas.width/2,y:canvas.height/2},radiuses={inner:80,outter:100},animate=function e(){animateId=window.requestAnimationFrame(e),ctx.fillStyle="#17072610",ctx.fillRect(0,0,canvas.width,canvas.height),line.update(mouse.x,mouse.y),dots.forEach(function(e){e.update(mouse.x,mouse.y,isClick)})},init=function(){ctx.fillStyle="#170726",ctx.fillRect(0,0,canvas.width,canvas.height);for(var e=0;e<18;e++){var t=new _Dot.default;e%3==0?t.init(ctx,mouse.x,mouse.y,e,radiuses.inner,"right"):t.init(ctx,mouse.x,mouse.y,e,radiuses.outter,"right"),dots[e]=t}line.init(ctx,dots,"#bc18be","#1b99bd"),animate()};init(),window.addEventListener("resize",function(){canvas.width=window.innerWidth,canvas.height=window.innerHeight}),canvas.addEventListener("mousemove",function(e){mouse.x=e.offsetX,mouse.y=e.offsetY}),canvas.addEventListener("mousedown",function(e){isClick=!0}),canvas.addEventListener("mouseup",function(e){isClick=!1});

},{"./itam/Dot":2,"./itam/Line":3}],2:[function(require,module,exports){
"use strict";function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,i){for(var s=0;s<i.length;s++){var e=i[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function _createClass(t,i,s){return i&&_defineProperties(t.prototype,i),s&&_defineProperties(t,s),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var Dot=function(){function t(){_classCallCheck(this,t),this.deg=0,this.shrink=0}return _createClass(t,[{key:"update",value:function(t,i,s){this.deg+="right"===this.direction?.005:-.005,this.x=t,this.y=i,this.radius+=this.shrink,s?this.radius>this.initRadius-50?this.shrink=-2:this.shrink=0:(this.shrink=0,this.radius<this.initRadius&&(this.radius+=1))}},{key:"draw",value:function(){this.ctx.beginPath(),this.ctx.arc(this.x+Math.cos(Math.PI*(this.position/9))*this.radius,this.y+Math.sin(Math.PI*(this.position/9))*this.radius,2,0,2*Math.PI),this.ctx.fillStyle="red",this.ctx.fill(),this.ctx.closePath()}},{key:"getPosition",value:function(){return{x:this.x+Math.cos(Math.PI*(this.position/9+this.deg))*this.radius,y:this.y+Math.sin(Math.PI*(this.position/9+this.deg))*this.radius}}},{key:"init",value:function(t,i,s,e,h,a){this.ctx=t,this.x=i,this.y=s,this.position=e,this.radius=h,this.initRadius=h,this.direction=a}}]),t}(),_default=Dot;exports.default=_default;

},{}],3:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,e,i){return e&&_defineProperties(t.prototype,e),i&&_defineProperties(t,i),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var Line=function(){function t(){_classCallCheck(this,t),this.deg=0}return _createClass(t,[{key:"update",value:function(t,e){this.grad=this.ctx.createLinearGradient(t-80,e-80,t+80,e+80),this.grad.addColorStop("0",this.startColor),this.grad.addColorStop("1",this.endColor),this.draw()}},{key:"pointToPoint",value:function(t,e){this.ctx.lineTo(this.dots[t+1>=e?0:t+1].getPosition().x,this.dots[t+1>=e?0:t+1].getPosition().y)}},{key:"draw",value:function(){if(this.ctx){this.ctx.beginPath(),this.ctx.lineWidth=2,this.ctx.moveTo(this.dots[0].getPosition().x,this.dots[0].getPosition().y);for(var t=0;t<18;t++)this.pointToPoint(t,18);this.ctx.strokeStyle=this.grad,this.ctx.stroke(),this.ctx.closePath()}}},{key:"init",value:function(t,e,i,o){this.ctx=t,this.dots=e,this.startColor=i,this.endColor=o}}]),t}(),_default=Line;exports.default=_default;

},{}],4:[function(require,module,exports){
"use strict";require("./canvas");

},{"./canvas":1}]},{},[4]);
