(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * Bounce.js 0.8.2
 * MIT license
 */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Bounce=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Component, EasingClasses, Matrix4D;

Matrix4D = _dereq_("../math/matrix4d");

EasingClasses = {
  bounce: _dereq_("../easing/bounce"),
  sway: _dereq_("../easing/sway"),
  hardbounce: _dereq_("../easing/hardbounce"),
  hardsway: _dereq_("../easing/hardsway")
};

Component = (function() {
  Component.prototype.easing = "bounce";

  Component.prototype.duration = 1000;

  Component.prototype.delay = 0;

  Component.prototype.from = null;

  Component.prototype.to = null;

  function Component(options) {
    options || (options = {});
    if (options.easing != null) {
      this.easing = options.easing;
    }
    if (options.duration != null) {
      this.duration = options.duration;
    }
    if (options.delay != null) {
      this.delay = options.delay;
    }
    if (options.from != null) {
      this.from = options.from;
    }
    if (options.to != null) {
      this.to = options.to;
    }
    this.easingObject = new EasingClasses[this.easing](options);
  }

  Component.prototype.calculateEase = function(ratio) {
    return this.easingObject.calculate(ratio);
  };

  Component.prototype.getMatrix = function() {
    return new Matrix4D().identity();
  };

  Component.prototype.getEasedMatrix = function(ratio) {
    return this.getMatrix();
  };

  Component.prototype.serialize = function() {
    var key, serialized, value, _ref;
    serialized = {
      type: this.constructor.name.toLowerCase(),
      easing: this.easing,
      duration: this.duration,
      delay: this.delay,
      from: this.from,
      to: this.to
    };
    _ref = this.easingObject.serialize();
    for (key in _ref) {
      value = _ref[key];
      serialized[key] = value;
    }
    return serialized;
  };

  return Component;

})();

module.exports = Component;


},{"../easing/bounce":6,"../easing/hardbounce":7,"../easing/hardsway":8,"../easing/sway":10,"../math/matrix4d":13}],2:[function(_dereq_,module,exports){
var Component, Matrix4D, Rotate, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Rotate = (function(_super) {
  __extends(Rotate, _super);

  Rotate.prototype.from = 0;

  Rotate.prototype.to = 90;

  function Rotate() {
    Rotate.__super__.constructor.apply(this, arguments);
    this.diff = this.to - this.from;
  }

  Rotate.prototype.getMatrix = function(degrees) {
    var c, radians, s;
    radians = (degrees / 180) * Math.PI;
    c = Math.cos(radians);
    s = Math.sin(radians);
    return new Matrix4D([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  };

  Rotate.prototype.getEasedMatrix = function(ratio) {
    var easedAngle, easedRatio;
    easedRatio = this.calculateEase(ratio);
    easedAngle = this.from + this.diff * easedRatio;
    return this.getMatrix(easedAngle);
  };

  return Rotate;

})(Component);

module.exports = Rotate;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],3:[function(_dereq_,module,exports){
var Component, Matrix4D, Scale, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Scale = (function(_super) {
  __extends(Scale, _super);

  Scale.prototype.from = {
    x: 0.5,
    y: 0.5
  };

  Scale.prototype.to = {
    x: 1,
    y: 1
  };

  function Scale() {
    Scale.__super__.constructor.apply(this, arguments);
    this.fromVector = new Vector2D(this.from.x, this.from.y);
    this.toVector = new Vector2D(this.to.x, this.to.y);
    this.diff = this.toVector.clone().subtract(this.fromVector);
  }

  Scale.prototype.getMatrix = function(x, y) {
    var z;
    z = 1;
    return new Matrix4D([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
  };

  Scale.prototype.getEasedMatrix = function(ratio) {
    var easedRatio, easedVector;
    easedRatio = this.calculateEase(ratio);
    easedVector = this.fromVector.clone().add(this.diff.clone().multiply(easedRatio));
    return this.getMatrix(easedVector.x, easedVector.y);
  };

  return Scale;

})(Component);

module.exports = Scale;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],4:[function(_dereq_,module,exports){
var Component, Matrix4D, Skew, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Skew = (function(_super) {
  __extends(Skew, _super);

  Skew.prototype.from = {
    x: 0,
    y: 0
  };

  Skew.prototype.to = {
    x: 20,
    y: 0
  };

  function Skew() {
    Skew.__super__.constructor.apply(this, arguments);
    this.fromVector = new Vector2D(this.from.x, this.from.y);
    this.toVector = new Vector2D(this.to.x, this.to.y);
    this.diff = this.toVector.clone().subtract(this.fromVector);
  }

  Skew.prototype.getMatrix = function(degreesX, degreesY) {
    var radiansX, radiansY, tx, ty;
    radiansX = (degreesX / 180) * Math.PI;
    radiansY = (degreesY / 180) * Math.PI;
    tx = Math.tan(radiansX);
    ty = Math.tan(radiansY);
    return new Matrix4D([1, tx, 0, 0, ty, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  };

  Skew.prototype.getEasedMatrix = function(ratio) {
    var easedRatio, easedVector;
    easedRatio = this.calculateEase(ratio);
    easedVector = this.fromVector.clone().add(this.diff.clone().multiply(easedRatio));
    return this.getMatrix(easedVector.x, easedVector.y);
  };

  return Skew;

})(Component);

module.exports = Skew;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],5:[function(_dereq_,module,exports){
var Component, Matrix4D, Translate, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Translate = (function(_super) {
  __extends(Translate, _super);

  Translate.prototype.from = {
    x: 0,
    y: 0
  };

  Translate.prototype.to = {
    x: 0,
    y: 0
  };

  function Translate() {
    Translate.__super__.constructor.apply(this, arguments);
    this.fromVector = new Vector2D(this.from.x, this.from.y);
    this.toVector = new Vector2D(this.to.x, this.to.y);
    this.diff = this.toVector.clone().subtract(this.fromVector);
  }

  Translate.prototype.getMatrix = function(x, y) {
    var z;
    z = 0;
    return new Matrix4D([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
  };

  Translate.prototype.getEasedMatrix = function(ratio) {
    var easedRatio, easedVector;
    easedRatio = this.calculateEase(ratio);
    easedVector = this.fromVector.clone().add(this.diff.clone().multiply(easedRatio));
    return this.getMatrix(easedVector.x, easedVector.y);
  };

  return Translate;

})(Component);

module.exports = Translate;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],6:[function(_dereq_,module,exports){
var BounceEasing, Easing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Easing = _dereq_("./index");

BounceEasing = (function(_super) {
  __extends(BounceEasing, _super);

  BounceEasing.prototype.bounces = 4;

  BounceEasing.prototype.stiffness = 3;

  function BounceEasing(options) {
    var threshold;
    if (options == null) {
      options = {};
    }
    BounceEasing.__super__.constructor.apply(this, arguments);
    if (options.stiffness != null) {
      this.stiffness = options.stiffness;
    }
    if (options.bounces != null) {
      this.bounces = options.bounces;
    }
    this.alpha = this.stiffness / 100;
    threshold = 0.005 / Math.pow(10, this.stiffness);
    this.limit = Math.floor(Math.log(threshold) / -this.alpha);
    this.omega = this.calculateOmega(this.bounces, this.limit);
  }

  BounceEasing.prototype.calculate = function(ratio) {
    var t;
    if (ratio >= 1) {
      return 1;
    }
    t = ratio * this.limit;
    return 1 - this.exponent(t) * this.oscillation(t);
  };

  BounceEasing.prototype.calculateOmega = function(bounces, limit) {
    return (this.bounces + 0.5) * Math.PI / this.limit;
  };

  BounceEasing.prototype.exponent = function(t) {
    return Math.pow(Math.E, -this.alpha * t);
  };

  BounceEasing.prototype.oscillation = function(t) {
    return Math.cos(this.omega * t);
  };

  BounceEasing.prototype.serialize = function() {
    return {
      stiffness: this.stiffness,
      bounces: this.bounces
    };
  };

  return BounceEasing;

})(Easing);

module.exports = BounceEasing;


},{"./index":9}],7:[function(_dereq_,module,exports){
var BounceEasing, HardBounceEasing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BounceEasing = _dereq_("./bounce");

HardBounceEasing = (function(_super) {
  __extends(HardBounceEasing, _super);

  function HardBounceEasing() {
    return HardBounceEasing.__super__.constructor.apply(this, arguments);
  }

  HardBounceEasing.prototype.oscillation = function(t) {
    return Math.abs(Math.cos(this.omega * t));
  };

  return HardBounceEasing;

})(BounceEasing);

module.exports = HardBounceEasing;


},{"./bounce":6}],8:[function(_dereq_,module,exports){
var HardSwayEasing, SwayEasing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SwayEasing = _dereq_("./sway");

HardSwayEasing = (function(_super) {
  __extends(HardSwayEasing, _super);

  function HardSwayEasing() {
    return HardSwayEasing.__super__.constructor.apply(this, arguments);
  }

  HardSwayEasing.prototype.oscillation = function(t) {
    return Math.abs(Math.sin(this.omega * t));
  };

  return HardSwayEasing;

})(SwayEasing);

module.exports = HardSwayEasing;


},{"./sway":10}],9:[function(_dereq_,module,exports){
var Easing, MathHelpers;

MathHelpers = _dereq_("../math/helpers");

Easing = (function() {
  function Easing() {}

  Easing.prototype.calculate = function(ratio) {
    return ratio;
  };

  Easing.prototype.serialize = function() {
    return {};
  };

  Easing.prototype.findOptimalKeyPoints = function(threshold, resolution) {
    var area, halfway, i, keyPoint, keyPoints, loops, result, values;
    if (threshold == null) {
      threshold = 1.0;
    }
    if (resolution == null) {
      resolution = 1000;
    }
    keyPoints = [0];
    values = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= resolution ? _i < resolution : _i > resolution; i = 0 <= resolution ? ++_i : --_i) {
        _results.push(this.calculate(i / resolution));
      }
      return _results;
    }).call(this);
    keyPoints = keyPoints.concat(MathHelpers.findTurningPoints(values));
    keyPoints.push(resolution - 1);
    i = 0;
    loops = 1000;
    while (loops--) {
      if (i === keyPoints.length - 1) {
        break;
      }
      area = MathHelpers.areaBetweenLineAndCurve(values, keyPoints[i], keyPoints[i + 1]);
      if (area <= threshold) {
        i++;
      } else {
        halfway = Math.round(keyPoints[i] + (keyPoints[i + 1] - keyPoints[i]) / 2);
        keyPoints.splice(i + 1, 0, halfway);
      }
    }
    if (loops === 0) {
      return [];
    }
    return result = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = keyPoints.length; _i < _len; _i++) {
        keyPoint = keyPoints[_i];
        _results.push(keyPoint / (resolution - 1));
      }
      return _results;
    })();
  };

  return Easing;

})();

module.exports = Easing;


},{"../math/helpers":12}],10:[function(_dereq_,module,exports){
var BounceEasing, SwayEasing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BounceEasing = _dereq_("./bounce");

SwayEasing = (function(_super) {
  __extends(SwayEasing, _super);

  function SwayEasing() {
    return SwayEasing.__super__.constructor.apply(this, arguments);
  }

  SwayEasing.prototype.calculate = function(ratio) {
    var t;
    if (ratio >= 1) {
      return 0;
    }
    t = ratio * this.limit;
    return this.exponent(t) * this.oscillation(t);
  };

  SwayEasing.prototype.calculateOmega = function(bounces, limit) {
    return this.bounces * Math.PI / this.limit;
  };

  SwayEasing.prototype.oscillation = function(t) {
    return Math.sin(this.omega * t);
  };

  return SwayEasing;

})(BounceEasing);

module.exports = SwayEasing;


},{"./bounce":6}],11:[function(_dereq_,module,exports){
var Bounce, ComponentClasses, Matrix4D;

Matrix4D = _dereq_("./math/matrix4d");

ComponentClasses = {
  scale: _dereq_("./components/scale"),
  rotate: _dereq_("./components/rotate"),
  translate: _dereq_("./components/translate"),
  skew: _dereq_("./components/skew")
};

Bounce = (function() {
  Bounce.FPS = 30;

  Bounce.counter = 1;

  Bounce.prototype.components = null;

  Bounce.prototype.duration = 0;

  function Bounce() {
    this.components = [];
  }

  Bounce.prototype.scale = function(options) {
    return this.addComponent(new ComponentClasses["scale"](options));
  };

  Bounce.prototype.rotate = function(options) {
    return this.addComponent(new ComponentClasses["rotate"](options));
  };

  Bounce.prototype.translate = function(options) {
    return this.addComponent(new ComponentClasses["translate"](options));
  };

  Bounce.prototype.skew = function(options) {
    return this.addComponent(new ComponentClasses["skew"](options));
  };

  Bounce.prototype.addComponent = function(component) {
    this.components.push(component);
    this.updateDuration();
    return this;
  };

  Bounce.prototype.serialize = function() {
    var component, serialized, _i, _len, _ref;
    serialized = [];
    _ref = this.components;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      serialized.push(component.serialize());
    }
    return serialized;
  };

  Bounce.prototype.deserialize = function(serialized) {
    var options, _i, _len;
    for (_i = 0, _len = serialized.length; _i < _len; _i++) {
      options = serialized[_i];
      this.addComponent(new ComponentClasses[options.type](options));
    }
    return this;
  };

  Bounce.prototype.updateDuration = function() {
    return this.duration = this.components.map(function(component) {
      return component.duration + component.delay;
    }).reduce(function(a, b) {
      return Math.max(a, b);
    });
  };

  Bounce.prototype.define = function(name) {
    this.name = name || Bounce.generateName();
    this.styleElement = document.createElement("style");
    this.styleElement.innerHTML = this.getKeyframeCSS({
      name: this.name,
      prefix: true
    });
    document.body.appendChild(this.styleElement);
    return this;
  };

  Bounce.prototype.applyTo = function(elements, options) {
    var css, deferred, element, prefix, prefixes, _i, _j, _len, _len1, _ref;
    if (options == null) {
      options = {};
    }
    this.define();
    if (!elements.length) {
      elements = [elements];
    }
    prefixes = this.getPrefixes();
    deferred = null;
    if (window.jQuery && window.jQuery.Deferred) {
      deferred = new window.jQuery.Deferred();
    }
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      _ref = prefixes.animation;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        prefix = _ref[_j];
        css = [this.name, "" + this.duration + "ms", "linear", "both"];
        if (options.loop) {
          css.push("infinite");
        }
        element.style["" + prefix + "animation"] = css.join(" ");
      }
    }
    if (!options.loop) {
      setTimeout(((function(_this) {
        return function() {
          if (options.remove) {
            _this.remove();
          }
          if (typeof options.onComplete === "function") {
            options.onComplete();
          }
          if (deferred) {
            return deferred.resolve();
          }
        };
      })(this)), this.duration);
    }
    return deferred;
  };

  Bounce.prototype.remove = function() {
    var _ref;
    if (!this.styleElement) {
      return;
    }
    if (this.styleElement.remove) {
      return this.styleElement.remove();
    } else {
      return (_ref = this.styleElement.parentNode) != null ? _ref.removeChild(this.styleElement) : void 0;
    }
  };

  Bounce.prototype.getPrefixes = function(force) {
    var prefixes, style;
    prefixes = {
      transform: [""],
      animation: [""]
    };
    style = document.createElement("dummy").style;
    if (force || (!("transform" in style) && "webkitTransform" in style)) {
      prefixes.transform = ["-webkit-", ""];
    }
    if (force || (!("animation" in style) && "webkitAnimation" in style)) {
      prefixes.animation = ["-webkit-", ""];
    }
    return prefixes;
  };

  Bounce.prototype.getKeyframeCSS = function(options) {
    var animations, key, keyframeList, keyframes, matrix, prefix, prefixes, transformString, transforms, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (options == null) {
      options = {};
    }
    this.name = options.name || Bounce.generateName();
    prefixes = {
      transform: [""],
      animation: [""]
    };
    if (options.prefix || options.forcePrefix) {
      prefixes = this.getPrefixes(options.forcePrefix);
    }
    keyframeList = [];
    keyframes = this.getKeyframes(options);
    _ref = this.keys;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      matrix = keyframes[key];
      transformString = "matrix3d" + matrix;
      transforms = [];
      _ref1 = prefixes.transform;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        prefix = _ref1[_j];
        transforms.push("" + prefix + "transform: " + transformString + ";");
      }
      keyframeList.push("" + (Math.round(key * 100 * 100) / 100) + "% { " + (transforms.join(" ")) + " }");
    }
    animations = [];
    _ref2 = prefixes.animation;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      prefix = _ref2[_k];
      animations.push("@" + prefix + "keyframes " + this.name + " { \n  " + (keyframeList.join("\n  ")) + " \n}");
    }
    return animations.join("\n\n");
  };

  Bounce.prototype.getKeyframes = function(options) {
    var component, componentKeys, currentTime, frames, i, key, keyframes, keys, matrix, ratio, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1;
    if (options == null) {
      options = {};
    }
    keys = [0, 1];
    if (options.optimized) {
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        componentKeys = component.easingObject.findOptimalKeyPoints().map((function(_this) {
          return function(key) {
            return (key * component.duration / _this.duration) + (component.delay / _this.duration);
          };
        })(this));
        if (component.delay) {
          componentKeys.push((component.delay / this.duration) - 0.001);
        }
        keys = keys.concat(componentKeys);
      }
    } else {
      frames = Math.round((this.duration / 1000) * Bounce.FPS);
      for (i = _j = 0; 0 <= frames ? _j <= frames : _j >= frames; i = 0 <= frames ? ++_j : --_j) {
        keys.push(i / frames);
      }
    }
    keys = keys.sort(function(a, b) {
      return a - b;
    });
    this.keys = [];
    keyframes = {};
    for (_k = 0, _len1 = keys.length; _k < _len1; _k++) {
      key = keys[_k];
      if (keyframes[key]) {
        continue;
      }
      matrix = new Matrix4D().identity();
      _ref1 = this.components;
      for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
        component = _ref1[_l];
        currentTime = key * this.duration;
        if ((component.delay - currentTime) > 1e-8) {
          continue;
        }
        ratio = (key - component.delay / this.duration) / (component.duration / this.duration);
        matrix.multiply(component.getEasedMatrix(ratio));
      }
      this.keys.push(key);
      keyframes[key] = matrix.transpose().toFixed(3);
    }
    return keyframes;
  };

  Bounce.generateName = function() {
    return "animation-" + (Bounce.counter++);
  };

  Bounce.isSupported = function() {
    var property, propertyIsSupported, propertyList, propertyLists, style, _i, _j, _len, _len1;
    style = document.createElement("dummy").style;
    propertyLists = [["transform", "webkitTransform"], ["animation", "webkitAnimation"]];
    for (_i = 0, _len = propertyLists.length; _i < _len; _i++) {
      propertyList = propertyLists[_i];
      propertyIsSupported = false;
      for (_j = 0, _len1 = propertyList.length; _j < _len1; _j++) {
        property = propertyList[_j];
        propertyIsSupported || (propertyIsSupported = property in style);
      }
      if (!propertyIsSupported) {
        return false;
      }
    }
    return true;
  };

  return Bounce;

})();

module.exports = Bounce;


},{"./components/rotate":2,"./components/scale":3,"./components/skew":4,"./components/translate":5,"./math/matrix4d":13}],12:[function(_dereq_,module,exports){
var MathHelpers;

MathHelpers = (function() {
  function MathHelpers() {}

  MathHelpers.prototype.sign = function(value) {
    if (value < 0) {
      return -1;
    }
    return 1;
  };

  MathHelpers.prototype.findTurningPoints = function(values) {
    var i, signA, signB, turningPoints, _i, _ref;
    turningPoints = [];
    for (i = _i = 1, _ref = values.length - 1; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
      signA = this.sign(values[i] - values[i - 1]);
      signB = this.sign(values[i + 1] - values[i]);
      if (signA !== signB) {
        turningPoints.push(i);
      }
    }
    return turningPoints;
  };

  MathHelpers.prototype.areaBetweenLineAndCurve = function(values, start, end) {
    var area, curveValue, i, length, lineValue, yEnd, yStart, _i;
    length = end - start;
    yStart = values[start];
    yEnd = values[end];
    area = 0;
    for (i = _i = 0; 0 <= length ? _i <= length : _i >= length; i = 0 <= length ? ++_i : --_i) {
      curveValue = values[start + i];
      lineValue = yStart + (i / length) * (yEnd - yStart);
      area += Math.abs(lineValue - curveValue);
    }
    return area;
  };

  return MathHelpers;

})();

module.exports = new MathHelpers;


},{}],13:[function(_dereq_,module,exports){
var Matrix4D;

Matrix4D = (function() {
  Matrix4D.prototype._array = null;

  function Matrix4D(array) {
    this._array = (array != null ? array.slice(0) : void 0) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  Matrix4D.prototype.equals = function(matrix) {
    return this.toString() === matrix.toString();
  };

  Matrix4D.prototype.identity = function() {
    this.setArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return this;
  };

  Matrix4D.prototype.multiply = function(matrix) {
    var i, j, k, res, value, _i, _j, _k;
    res = new Matrix4D;
    for (i = _i = 0; _i < 4; i = ++_i) {
      for (j = _j = 0; _j < 4; j = ++_j) {
        for (k = _k = 0; _k < 4; k = ++_k) {
          value = res.get(i, j) + this.get(i, k) * matrix.get(k, j);
          res.set(i, j, value);
        }
      }
    }
    return this.copy(res);
  };

  Matrix4D.prototype.transpose = function() {
    var a;
    a = this.getArray();
    this.setArray([a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]]);
    return this;
  };

  Matrix4D.prototype.get = function(row, column) {
    return this.getArray()[row * 4 + column];
  };

  Matrix4D.prototype.set = function(row, column, value) {
    return this._array[row * 4 + column] = value;
  };

  Matrix4D.prototype.copy = function(matrix) {
    this._array = matrix.getArray();
    return this;
  };

  Matrix4D.prototype.clone = function() {
    return new Matrix4D(this.getArray());
  };

  Matrix4D.prototype.getArray = function() {
    return this._array.slice(0);
  };

  Matrix4D.prototype.setArray = function(array) {
    this._array = array;
    return this;
  };

  Matrix4D.prototype.toString = function() {
    return "(" + (this.getArray().join(", ")) + ")";
  };

  Matrix4D.prototype.toFixed = function(n) {
    var value;
    this._array = (function() {
      var _i, _len, _ref, _results;
      _ref = this._array;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        _results.push(parseFloat(value.toFixed(n)));
      }
      return _results;
    }).call(this);
    return this;
  };

  return Matrix4D;

})();

module.exports = Matrix4D;


},{}],14:[function(_dereq_,module,exports){
var Vector2D;

Vector2D = (function() {
  Vector2D.prototype.x = 0;

  Vector2D.prototype.y = 0;

  function Vector2D(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }

  Vector2D.prototype.add = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._addScalar(vector);
    }
    this.x += vector.x;
    this.y += vector.y;
    return this;
  };

  Vector2D.prototype._addScalar = function(n) {
    this.x += n;
    this.y += n;
    return this;
  };

  Vector2D.prototype.subtract = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._subtractScalar(vector);
    }
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  };

  Vector2D.prototype._subtractScalar = function(n) {
    return this._addScalar(-n);
  };

  Vector2D.prototype.multiply = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._multiplyScalar(vector);
    }
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  };

  Vector2D.prototype._multiplyScalar = function(n) {
    this.x *= n;
    this.y *= n;
    return this;
  };

  Vector2D.prototype.divide = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._divideScalar(vector);
    }
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
  };

  Vector2D.prototype._divideScalar = function(n) {
    return this._multiplyScalar(1 / n);
  };

  Vector2D.prototype.clone = function() {
    return new Vector2D(this.x, this.y);
  };

  Vector2D.prototype.copy = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  };

  Vector2D.prototype.equals = function(vector) {
    return vector.x === this.x && vector.y === this.y;
  };

  Vector2D.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")";
  };

  Vector2D.prototype.toFixed = function(n) {
    this.x = parseFloat(this.x.toFixed(n));
    this.y = parseFloat(this.y.toFixed(n));
    return this;
  };

  Vector2D.prototype.toArray = function() {
    return [this.x, this.y];
  };

  Vector2D.isVector2D = function(item) {
    return item instanceof Vector2D;
  };

  return Vector2D;

})();

module.exports = Vector2D;


},{}]},{},[11])
(11)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
'use strict';

var _bounce = require('bounce.js');

var _bounce2 = _interopRequireDefault(_bounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function skurtLogo() {
  var width = window.innerWidth;
  var skurt = new _bounce2.default().skew({
    from: { x: 0 },
    to: { x: 20 }
  }).translate({
    from: { x: 0 },
    to: { x: width },
    duration: 500,
    bounces: 4
  }).translate({
    from: { x: 0 },
    to: { x: width * -2 },
    duration: 1,
    delay: 500
  }).translate({
    from: { x: 0 },
    to: { x: width },
    duration: 200,
    delay: 501
  }).skew({
    from: { x: 0 },
    to: { x: -20 },
    delay: 702,
    bounces: 5
  });

  return skurt;
}

function grandTwirl() {
  var twirl = new _bounce2.default();
  twirl.scale({
    from: { x: 0.1, y: 0.1 },
    to: { x: 1, y: 1 },
    stiffness: 1,
    bounces: 4,
    duration: 1500,
    delay: 100
  }).rotate({
    from: 0,
    to: 360,
    duration: 1500,
    delay: 200,
    bounces: 2
  });

  return twirl;
}

var animations = [skurtLogo, grandTwirl];

document.getElementById('logo').addEventListener('click', function (e) {
  var animation = animations[getRandomInt(0, animations.length)];
  animation().applyTo(e.target);
});

},{"bounce.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYm91bmNlLmpzL2JvdW5jZS5qcyIsInNyYy9jbGllbnQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN4Z0NBLFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDOUIsU0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFBLEFBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUN0RDs7QUFFRCxTQUFTLFNBQVMsR0FBRztBQUNuQixNQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQzlCLE1BQUksS0FBSyxHQUFHLHNCQUFZLENBQ3JCLElBQUksQ0FBQztBQUNKLFFBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDZCxNQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0dBQ2QsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNYLFFBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDZCxNQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO0FBQ2hCLFlBQVEsRUFBRSxHQUFHO0FBQ2IsV0FBTyxFQUFFLENBQUM7R0FDWCxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ1gsUUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNkLE1BQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDckIsWUFBUSxFQUFFLENBQUM7QUFDWCxTQUFLLEVBQUUsR0FBRztHQUNYLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDWCxRQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2QsTUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUNoQixZQUFRLEVBQUUsR0FBRztBQUNiLFNBQUssRUFBRSxHQUFHO0dBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNOLFFBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7QUFDYixNQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDZCxTQUFLLEVBQUUsR0FBRztBQUNWLFdBQU8sRUFBRSxDQUFDO0dBQ1gsQ0FBQyxDQUFDOztBQUVMLFNBQU8sS0FBSyxDQUFDO0NBQ2Q7O0FBRUQsU0FBUyxVQUFVLEdBQUc7QUFDcEIsTUFBSSxLQUFLLEdBQUcsc0JBQVksQ0FBQztBQUN6QixPQUFLLENBQUMsS0FBSyxDQUFDO0FBQ1YsUUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLE1BQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsQixhQUFTLEVBQUUsQ0FBQztBQUNaLFdBQU8sRUFBRSxDQUFDO0FBQ1YsWUFBUSxFQUFFLElBQUk7QUFDZCxTQUFLLEVBQUUsR0FBRztHQUNYLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDUixRQUFJLEVBQUUsQ0FBQztBQUNQLE1BQUUsRUFBRSxHQUFHO0FBQ1AsWUFBUSxFQUFFLElBQUk7QUFDZCxTQUFLLEVBQUUsR0FBRztBQUNWLFdBQU8sRUFBRSxDQUFDO0dBQ1gsQ0FBQyxDQUFDOztBQUVILFNBQU8sS0FBSyxDQUFDO0NBQ2Q7O0FBRUQsSUFBSSxVQUFVLEdBQUcsQ0FDZixTQUFTLEVBQ1QsVUFBVSxDQUNYLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDcEUsTUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDL0QsV0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMvQixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBCb3VuY2UuanMgMC44LjJcbiAqIE1JVCBsaWNlbnNlXG4gKi9cbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKGUpO2Vsc2V7dmFyIGY7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz9mPXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2Y9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYoZj1zZWxmKSxmLkJvdW5jZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBDb21wb25lbnQsIEVhc2luZ0NsYXNzZXMsIE1hdHJpeDREO1xuXG5NYXRyaXg0RCA9IF9kZXJlcV8oXCIuLi9tYXRoL21hdHJpeDRkXCIpO1xuXG5FYXNpbmdDbGFzc2VzID0ge1xuICBib3VuY2U6IF9kZXJlcV8oXCIuLi9lYXNpbmcvYm91bmNlXCIpLFxuICBzd2F5OiBfZGVyZXFfKFwiLi4vZWFzaW5nL3N3YXlcIiksXG4gIGhhcmRib3VuY2U6IF9kZXJlcV8oXCIuLi9lYXNpbmcvaGFyZGJvdW5jZVwiKSxcbiAgaGFyZHN3YXk6IF9kZXJlcV8oXCIuLi9lYXNpbmcvaGFyZHN3YXlcIilcbn07XG5cbkNvbXBvbmVudCA9IChmdW5jdGlvbigpIHtcbiAgQ29tcG9uZW50LnByb3RvdHlwZS5lYXNpbmcgPSBcImJvdW5jZVwiO1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZHVyYXRpb24gPSAxMDAwO1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZGVsYXkgPSAwO1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZnJvbSA9IG51bGw7XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS50byA9IG51bGw7XG5cbiAgZnVuY3Rpb24gQ29tcG9uZW50KG9wdGlvbnMpIHtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgIGlmIChvcHRpb25zLmVhc2luZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmVhc2luZyA9IG9wdGlvbnMuZWFzaW5nO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGVsYXkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmZyb20gIT0gbnVsbCkge1xuICAgICAgdGhpcy5mcm9tID0gb3B0aW9ucy5mcm9tO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy50byAhPSBudWxsKSB7XG4gICAgICB0aGlzLnRvID0gb3B0aW9ucy50bztcbiAgICB9XG4gICAgdGhpcy5lYXNpbmdPYmplY3QgPSBuZXcgRWFzaW5nQ2xhc3Nlc1t0aGlzLmVhc2luZ10ob3B0aW9ucyk7XG4gIH1cblxuICBDb21wb25lbnQucHJvdG90eXBlLmNhbGN1bGF0ZUVhc2UgPSBmdW5jdGlvbihyYXRpbykge1xuICAgIHJldHVybiB0aGlzLmVhc2luZ09iamVjdC5jYWxjdWxhdGUocmF0aW8pO1xuICB9O1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuZ2V0TWF0cml4ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0RCgpLmlkZW50aXR5KCk7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5nZXRFYXNlZE1hdHJpeCA9IGZ1bmN0aW9uKHJhdGlvKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWF0cml4KCk7XG4gIH07XG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5LCBzZXJpYWxpemVkLCB2YWx1ZSwgX3JlZjtcbiAgICBzZXJpYWxpemVkID0ge1xuICAgICAgdHlwZTogdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICBlYXNpbmc6IHRoaXMuZWFzaW5nLFxuICAgICAgZHVyYXRpb246IHRoaXMuZHVyYXRpb24sXG4gICAgICBkZWxheTogdGhpcy5kZWxheSxcbiAgICAgIGZyb206IHRoaXMuZnJvbSxcbiAgICAgIHRvOiB0aGlzLnRvXG4gICAgfTtcbiAgICBfcmVmID0gdGhpcy5lYXNpbmdPYmplY3Quc2VyaWFsaXplKCk7XG4gICAgZm9yIChrZXkgaW4gX3JlZikge1xuICAgICAgdmFsdWUgPSBfcmVmW2tleV07XG4gICAgICBzZXJpYWxpemVkW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNlcmlhbGl6ZWQ7XG4gIH07XG5cbiAgcmV0dXJuIENvbXBvbmVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7XG5cblxufSx7XCIuLi9lYXNpbmcvYm91bmNlXCI6NixcIi4uL2Vhc2luZy9oYXJkYm91bmNlXCI6NyxcIi4uL2Vhc2luZy9oYXJkc3dheVwiOjgsXCIuLi9lYXNpbmcvc3dheVwiOjEwLFwiLi4vbWF0aC9tYXRyaXg0ZFwiOjEzfV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQ29tcG9uZW50LCBNYXRyaXg0RCwgUm90YXRlLCBWZWN0b3IyRCxcbiAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIF9fZXh0ZW5kcyA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoX19oYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9O1xuXG5NYXRyaXg0RCA9IF9kZXJlcV8oXCIuLi9tYXRoL21hdHJpeDRkXCIpO1xuXG5WZWN0b3IyRCA9IF9kZXJlcV8oXCIuLi9tYXRoL3ZlY3RvcjJkXCIpO1xuXG5Db21wb25lbnQgPSBfZGVyZXFfKFwiLi9pbmRleFwiKTtcblxuUm90YXRlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICBfX2V4dGVuZHMoUm90YXRlLCBfc3VwZXIpO1xuXG4gIFJvdGF0ZS5wcm90b3R5cGUuZnJvbSA9IDA7XG5cbiAgUm90YXRlLnByb3RvdHlwZS50byA9IDkwO1xuXG4gIGZ1bmN0aW9uIFJvdGF0ZSgpIHtcbiAgICBSb3RhdGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5kaWZmID0gdGhpcy50byAtIHRoaXMuZnJvbTtcbiAgfVxuXG4gIFJvdGF0ZS5wcm90b3R5cGUuZ2V0TWF0cml4ID0gZnVuY3Rpb24oZGVncmVlcykge1xuICAgIHZhciBjLCByYWRpYW5zLCBzO1xuICAgIHJhZGlhbnMgPSAoZGVncmVlcyAvIDE4MCkgKiBNYXRoLlBJO1xuICAgIGMgPSBNYXRoLmNvcyhyYWRpYW5zKTtcbiAgICBzID0gTWF0aC5zaW4ocmFkaWFucyk7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0RChbYywgLXMsIDAsIDAsIHMsIGMsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdKTtcbiAgfTtcblxuICBSb3RhdGUucHJvdG90eXBlLmdldEVhc2VkTWF0cml4ID0gZnVuY3Rpb24ocmF0aW8pIHtcbiAgICB2YXIgZWFzZWRBbmdsZSwgZWFzZWRSYXRpbztcbiAgICBlYXNlZFJhdGlvID0gdGhpcy5jYWxjdWxhdGVFYXNlKHJhdGlvKTtcbiAgICBlYXNlZEFuZ2xlID0gdGhpcy5mcm9tICsgdGhpcy5kaWZmICogZWFzZWRSYXRpbztcbiAgICByZXR1cm4gdGhpcy5nZXRNYXRyaXgoZWFzZWRBbmdsZSk7XG4gIH07XG5cbiAgcmV0dXJuIFJvdGF0ZTtcblxufSkoQ29tcG9uZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3RhdGU7XG5cblxufSx7XCIuLi9tYXRoL21hdHJpeDRkXCI6MTMsXCIuLi9tYXRoL3ZlY3RvcjJkXCI6MTQsXCIuL2luZGV4XCI6MX1dLDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIENvbXBvbmVudCwgTWF0cml4NEQsIFNjYWxlLCBWZWN0b3IyRCxcbiAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIF9fZXh0ZW5kcyA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoX19oYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9O1xuXG5NYXRyaXg0RCA9IF9kZXJlcV8oXCIuLi9tYXRoL21hdHJpeDRkXCIpO1xuXG5WZWN0b3IyRCA9IF9kZXJlcV8oXCIuLi9tYXRoL3ZlY3RvcjJkXCIpO1xuXG5Db21wb25lbnQgPSBfZGVyZXFfKFwiLi9pbmRleFwiKTtcblxuU2NhbGUgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gIF9fZXh0ZW5kcyhTY2FsZSwgX3N1cGVyKTtcblxuICBTY2FsZS5wcm90b3R5cGUuZnJvbSA9IHtcbiAgICB4OiAwLjUsXG4gICAgeTogMC41XG4gIH07XG5cbiAgU2NhbGUucHJvdG90eXBlLnRvID0ge1xuICAgIHg6IDEsXG4gICAgeTogMVxuICB9O1xuXG4gIGZ1bmN0aW9uIFNjYWxlKCkge1xuICAgIFNjYWxlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuZnJvbVZlY3RvciA9IG5ldyBWZWN0b3IyRCh0aGlzLmZyb20ueCwgdGhpcy5mcm9tLnkpO1xuICAgIHRoaXMudG9WZWN0b3IgPSBuZXcgVmVjdG9yMkQodGhpcy50by54LCB0aGlzLnRvLnkpO1xuICAgIHRoaXMuZGlmZiA9IHRoaXMudG9WZWN0b3IuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLmZyb21WZWN0b3IpO1xuICB9XG5cbiAgU2NhbGUucHJvdG90eXBlLmdldE1hdHJpeCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgejtcbiAgICB6ID0gMTtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDREKFt4LCAwLCAwLCAwLCAwLCB5LCAwLCAwLCAwLCAwLCB6LCAwLCAwLCAwLCAwLCAxXSk7XG4gIH07XG5cbiAgU2NhbGUucHJvdG90eXBlLmdldEVhc2VkTWF0cml4ID0gZnVuY3Rpb24ocmF0aW8pIHtcbiAgICB2YXIgZWFzZWRSYXRpbywgZWFzZWRWZWN0b3I7XG4gICAgZWFzZWRSYXRpbyA9IHRoaXMuY2FsY3VsYXRlRWFzZShyYXRpbyk7XG4gICAgZWFzZWRWZWN0b3IgPSB0aGlzLmZyb21WZWN0b3IuY2xvbmUoKS5hZGQodGhpcy5kaWZmLmNsb25lKCkubXVsdGlwbHkoZWFzZWRSYXRpbykpO1xuICAgIHJldHVybiB0aGlzLmdldE1hdHJpeChlYXNlZFZlY3Rvci54LCBlYXNlZFZlY3Rvci55KTtcbiAgfTtcblxuICByZXR1cm4gU2NhbGU7XG5cbn0pKENvbXBvbmVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2NhbGU7XG5cblxufSx7XCIuLi9tYXRoL21hdHJpeDRkXCI6MTMsXCIuLi9tYXRoL3ZlY3RvcjJkXCI6MTQsXCIuL2luZGV4XCI6MX1dLDQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIENvbXBvbmVudCwgTWF0cml4NEQsIFNrZXcsIFZlY3RvcjJELFxuICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH07XG5cbk1hdHJpeDREID0gX2RlcmVxXyhcIi4uL21hdGgvbWF0cml4NGRcIik7XG5cblZlY3RvcjJEID0gX2RlcmVxXyhcIi4uL21hdGgvdmVjdG9yMmRcIik7XG5cbkNvbXBvbmVudCA9IF9kZXJlcV8oXCIuL2luZGV4XCIpO1xuXG5Ta2V3ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICBfX2V4dGVuZHMoU2tldywgX3N1cGVyKTtcblxuICBTa2V3LnByb3RvdHlwZS5mcm9tID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIFNrZXcucHJvdG90eXBlLnRvID0ge1xuICAgIHg6IDIwLFxuICAgIHk6IDBcbiAgfTtcblxuICBmdW5jdGlvbiBTa2V3KCkge1xuICAgIFNrZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5mcm9tVmVjdG9yID0gbmV3IFZlY3RvcjJEKHRoaXMuZnJvbS54LCB0aGlzLmZyb20ueSk7XG4gICAgdGhpcy50b1ZlY3RvciA9IG5ldyBWZWN0b3IyRCh0aGlzLnRvLngsIHRoaXMudG8ueSk7XG4gICAgdGhpcy5kaWZmID0gdGhpcy50b1ZlY3Rvci5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuZnJvbVZlY3Rvcik7XG4gIH1cblxuICBTa2V3LnByb3RvdHlwZS5nZXRNYXRyaXggPSBmdW5jdGlvbihkZWdyZWVzWCwgZGVncmVlc1kpIHtcbiAgICB2YXIgcmFkaWFuc1gsIHJhZGlhbnNZLCB0eCwgdHk7XG4gICAgcmFkaWFuc1ggPSAoZGVncmVlc1ggLyAxODApICogTWF0aC5QSTtcbiAgICByYWRpYW5zWSA9IChkZWdyZWVzWSAvIDE4MCkgKiBNYXRoLlBJO1xuICAgIHR4ID0gTWF0aC50YW4ocmFkaWFuc1gpO1xuICAgIHR5ID0gTWF0aC50YW4ocmFkaWFuc1kpO1xuICAgIHJldHVybiBuZXcgTWF0cml4NEQoWzEsIHR4LCAwLCAwLCB0eSwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV0pO1xuICB9O1xuXG4gIFNrZXcucHJvdG90eXBlLmdldEVhc2VkTWF0cml4ID0gZnVuY3Rpb24ocmF0aW8pIHtcbiAgICB2YXIgZWFzZWRSYXRpbywgZWFzZWRWZWN0b3I7XG4gICAgZWFzZWRSYXRpbyA9IHRoaXMuY2FsY3VsYXRlRWFzZShyYXRpbyk7XG4gICAgZWFzZWRWZWN0b3IgPSB0aGlzLmZyb21WZWN0b3IuY2xvbmUoKS5hZGQodGhpcy5kaWZmLmNsb25lKCkubXVsdGlwbHkoZWFzZWRSYXRpbykpO1xuICAgIHJldHVybiB0aGlzLmdldE1hdHJpeChlYXNlZFZlY3Rvci54LCBlYXNlZFZlY3Rvci55KTtcbiAgfTtcblxuICByZXR1cm4gU2tldztcblxufSkoQ29tcG9uZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTa2V3O1xuXG5cbn0se1wiLi4vbWF0aC9tYXRyaXg0ZFwiOjEzLFwiLi4vbWF0aC92ZWN0b3IyZFwiOjE0LFwiLi9pbmRleFwiOjF9XSw1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBDb21wb25lbnQsIE1hdHJpeDRELCBUcmFuc2xhdGUsIFZlY3RvcjJELFxuICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH07XG5cbk1hdHJpeDREID0gX2RlcmVxXyhcIi4uL21hdGgvbWF0cml4NGRcIik7XG5cblZlY3RvcjJEID0gX2RlcmVxXyhcIi4uL21hdGgvdmVjdG9yMmRcIik7XG5cbkNvbXBvbmVudCA9IF9kZXJlcV8oXCIuL2luZGV4XCIpO1xuXG5UcmFuc2xhdGUgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gIF9fZXh0ZW5kcyhUcmFuc2xhdGUsIF9zdXBlcik7XG5cbiAgVHJhbnNsYXRlLnByb3RvdHlwZS5mcm9tID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIFRyYW5zbGF0ZS5wcm90b3R5cGUudG8gPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgZnVuY3Rpb24gVHJhbnNsYXRlKCkge1xuICAgIFRyYW5zbGF0ZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmZyb21WZWN0b3IgPSBuZXcgVmVjdG9yMkQodGhpcy5mcm9tLngsIHRoaXMuZnJvbS55KTtcbiAgICB0aGlzLnRvVmVjdG9yID0gbmV3IFZlY3RvcjJEKHRoaXMudG8ueCwgdGhpcy50by55KTtcbiAgICB0aGlzLmRpZmYgPSB0aGlzLnRvVmVjdG9yLmNsb25lKCkuc3VidHJhY3QodGhpcy5mcm9tVmVjdG9yKTtcbiAgfVxuXG4gIFRyYW5zbGF0ZS5wcm90b3R5cGUuZ2V0TWF0cml4ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciB6O1xuICAgIHogPSAwO1xuICAgIHJldHVybiBuZXcgTWF0cml4NEQoWzEsIDAsIDAsIHgsIDAsIDEsIDAsIHksIDAsIDAsIDEsIHosIDAsIDAsIDAsIDFdKTtcbiAgfTtcblxuICBUcmFuc2xhdGUucHJvdG90eXBlLmdldEVhc2VkTWF0cml4ID0gZnVuY3Rpb24ocmF0aW8pIHtcbiAgICB2YXIgZWFzZWRSYXRpbywgZWFzZWRWZWN0b3I7XG4gICAgZWFzZWRSYXRpbyA9IHRoaXMuY2FsY3VsYXRlRWFzZShyYXRpbyk7XG4gICAgZWFzZWRWZWN0b3IgPSB0aGlzLmZyb21WZWN0b3IuY2xvbmUoKS5hZGQodGhpcy5kaWZmLmNsb25lKCkubXVsdGlwbHkoZWFzZWRSYXRpbykpO1xuICAgIHJldHVybiB0aGlzLmdldE1hdHJpeChlYXNlZFZlY3Rvci54LCBlYXNlZFZlY3Rvci55KTtcbiAgfTtcblxuICByZXR1cm4gVHJhbnNsYXRlO1xuXG59KShDb21wb25lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zbGF0ZTtcblxuXG59LHtcIi4uL21hdGgvbWF0cml4NGRcIjoxMyxcIi4uL21hdGgvdmVjdG9yMmRcIjoxNCxcIi4vaW5kZXhcIjoxfV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQm91bmNlRWFzaW5nLCBFYXNpbmcsXG4gIF9faGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfTtcblxuRWFzaW5nID0gX2RlcmVxXyhcIi4vaW5kZXhcIik7XG5cbkJvdW5jZUVhc2luZyA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgX19leHRlbmRzKEJvdW5jZUVhc2luZywgX3N1cGVyKTtcblxuICBCb3VuY2VFYXNpbmcucHJvdG90eXBlLmJvdW5jZXMgPSA0O1xuXG4gIEJvdW5jZUVhc2luZy5wcm90b3R5cGUuc3RpZmZuZXNzID0gMztcblxuICBmdW5jdGlvbiBCb3VuY2VFYXNpbmcob3B0aW9ucykge1xuICAgIHZhciB0aHJlc2hvbGQ7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBCb3VuY2VFYXNpbmcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKG9wdGlvbnMuc3RpZmZuZXNzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc3RpZmZuZXNzID0gb3B0aW9ucy5zdGlmZm5lc3M7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJvdW5jZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ib3VuY2VzID0gb3B0aW9ucy5ib3VuY2VzO1xuICAgIH1cbiAgICB0aGlzLmFscGhhID0gdGhpcy5zdGlmZm5lc3MgLyAxMDA7XG4gICAgdGhyZXNob2xkID0gMC4wMDUgLyBNYXRoLnBvdygxMCwgdGhpcy5zdGlmZm5lc3MpO1xuICAgIHRoaXMubGltaXQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHRocmVzaG9sZCkgLyAtdGhpcy5hbHBoYSk7XG4gICAgdGhpcy5vbWVnYSA9IHRoaXMuY2FsY3VsYXRlT21lZ2EodGhpcy5ib3VuY2VzLCB0aGlzLmxpbWl0KTtcbiAgfVxuXG4gIEJvdW5jZUVhc2luZy5wcm90b3R5cGUuY2FsY3VsYXRlID0gZnVuY3Rpb24ocmF0aW8pIHtcbiAgICB2YXIgdDtcbiAgICBpZiAocmF0aW8gPj0gMSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHQgPSByYXRpbyAqIHRoaXMubGltaXQ7XG4gICAgcmV0dXJuIDEgLSB0aGlzLmV4cG9uZW50KHQpICogdGhpcy5vc2NpbGxhdGlvbih0KTtcbiAgfTtcblxuICBCb3VuY2VFYXNpbmcucHJvdG90eXBlLmNhbGN1bGF0ZU9tZWdhID0gZnVuY3Rpb24oYm91bmNlcywgbGltaXQpIHtcbiAgICByZXR1cm4gKHRoaXMuYm91bmNlcyArIDAuNSkgKiBNYXRoLlBJIC8gdGhpcy5saW1pdDtcbiAgfTtcblxuICBCb3VuY2VFYXNpbmcucHJvdG90eXBlLmV4cG9uZW50ID0gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhNYXRoLkUsIC10aGlzLmFscGhhICogdCk7XG4gIH07XG5cbiAgQm91bmNlRWFzaW5nLnByb3RvdHlwZS5vc2NpbGxhdGlvbiA9IGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gTWF0aC5jb3ModGhpcy5vbWVnYSAqIHQpO1xuICB9O1xuXG4gIEJvdW5jZUVhc2luZy5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0aWZmbmVzczogdGhpcy5zdGlmZm5lc3MsXG4gICAgICBib3VuY2VzOiB0aGlzLmJvdW5jZXNcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBCb3VuY2VFYXNpbmc7XG5cbn0pKEVhc2luZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQm91bmNlRWFzaW5nO1xuXG5cbn0se1wiLi9pbmRleFwiOjl9XSw3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBCb3VuY2VFYXNpbmcsIEhhcmRCb3VuY2VFYXNpbmcsXG4gIF9faGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfTtcblxuQm91bmNlRWFzaW5nID0gX2RlcmVxXyhcIi4vYm91bmNlXCIpO1xuXG5IYXJkQm91bmNlRWFzaW5nID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICBfX2V4dGVuZHMoSGFyZEJvdW5jZUVhc2luZywgX3N1cGVyKTtcblxuICBmdW5jdGlvbiBIYXJkQm91bmNlRWFzaW5nKCkge1xuICAgIHJldHVybiBIYXJkQm91bmNlRWFzaW5nLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgSGFyZEJvdW5jZUVhc2luZy5wcm90b3R5cGUub3NjaWxsYXRpb24gPSBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKE1hdGguY29zKHRoaXMub21lZ2EgKiB0KSk7XG4gIH07XG5cbiAgcmV0dXJuIEhhcmRCb3VuY2VFYXNpbmc7XG5cbn0pKEJvdW5jZUVhc2luZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSGFyZEJvdW5jZUVhc2luZztcblxuXG59LHtcIi4vYm91bmNlXCI6Nn1dLDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIEhhcmRTd2F5RWFzaW5nLCBTd2F5RWFzaW5nLFxuICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH07XG5cblN3YXlFYXNpbmcgPSBfZGVyZXFfKFwiLi9zd2F5XCIpO1xuXG5IYXJkU3dheUVhc2luZyA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgX19leHRlbmRzKEhhcmRTd2F5RWFzaW5nLCBfc3VwZXIpO1xuXG4gIGZ1bmN0aW9uIEhhcmRTd2F5RWFzaW5nKCkge1xuICAgIHJldHVybiBIYXJkU3dheUVhc2luZy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEhhcmRTd2F5RWFzaW5nLnByb3RvdHlwZS5vc2NpbGxhdGlvbiA9IGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoTWF0aC5zaW4odGhpcy5vbWVnYSAqIHQpKTtcbiAgfTtcblxuICByZXR1cm4gSGFyZFN3YXlFYXNpbmc7XG5cbn0pKFN3YXlFYXNpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhcmRTd2F5RWFzaW5nO1xuXG5cbn0se1wiLi9zd2F5XCI6MTB9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBFYXNpbmcsIE1hdGhIZWxwZXJzO1xuXG5NYXRoSGVscGVycyA9IF9kZXJlcV8oXCIuLi9tYXRoL2hlbHBlcnNcIik7XG5cbkVhc2luZyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gRWFzaW5nKCkge31cblxuICBFYXNpbmcucHJvdG90eXBlLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKHJhdGlvKSB7XG4gICAgcmV0dXJuIHJhdGlvO1xuICB9O1xuXG4gIEVhc2luZy5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9O1xuXG4gIEVhc2luZy5wcm90b3R5cGUuZmluZE9wdGltYWxLZXlQb2ludHMgPSBmdW5jdGlvbih0aHJlc2hvbGQsIHJlc29sdXRpb24pIHtcbiAgICB2YXIgYXJlYSwgaGFsZndheSwgaSwga2V5UG9pbnQsIGtleVBvaW50cywgbG9vcHMsIHJlc3VsdCwgdmFsdWVzO1xuICAgIGlmICh0aHJlc2hvbGQgPT0gbnVsbCkge1xuICAgICAgdGhyZXNob2xkID0gMS4wO1xuICAgIH1cbiAgICBpZiAocmVzb2x1dGlvbiA9PSBudWxsKSB7XG4gICAgICByZXNvbHV0aW9uID0gMTAwMDtcbiAgICB9XG4gICAga2V5UG9pbnRzID0gWzBdO1xuICAgIHZhbHVlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfaSwgX3Jlc3VsdHM7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gX2kgPSAwOyAwIDw9IHJlc29sdXRpb24gPyBfaSA8IHJlc29sdXRpb24gOiBfaSA+IHJlc29sdXRpb247IGkgPSAwIDw9IHJlc29sdXRpb24gPyArK19pIDogLS1faSkge1xuICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuY2FsY3VsYXRlKGkgLyByZXNvbHV0aW9uKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSkuY2FsbCh0aGlzKTtcbiAgICBrZXlQb2ludHMgPSBrZXlQb2ludHMuY29uY2F0KE1hdGhIZWxwZXJzLmZpbmRUdXJuaW5nUG9pbnRzKHZhbHVlcykpO1xuICAgIGtleVBvaW50cy5wdXNoKHJlc29sdXRpb24gLSAxKTtcbiAgICBpID0gMDtcbiAgICBsb29wcyA9IDEwMDA7XG4gICAgd2hpbGUgKGxvb3BzLS0pIHtcbiAgICAgIGlmIChpID09PSBrZXlQb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGFyZWEgPSBNYXRoSGVscGVycy5hcmVhQmV0d2VlbkxpbmVBbmRDdXJ2ZSh2YWx1ZXMsIGtleVBvaW50c1tpXSwga2V5UG9pbnRzW2kgKyAxXSk7XG4gICAgICBpZiAoYXJlYSA8PSB0aHJlc2hvbGQpIHtcbiAgICAgICAgaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFsZndheSA9IE1hdGgucm91bmQoa2V5UG9pbnRzW2ldICsgKGtleVBvaW50c1tpICsgMV0gLSBrZXlQb2ludHNbaV0pIC8gMik7XG4gICAgICAgIGtleVBvaW50cy5zcGxpY2UoaSArIDEsIDAsIGhhbGZ3YXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobG9vcHMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfaSwgX2xlbiwgX3Jlc3VsdHM7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBrZXlQb2ludHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAga2V5UG9pbnQgPSBrZXlQb2ludHNbX2ldO1xuICAgICAgICBfcmVzdWx0cy5wdXNoKGtleVBvaW50IC8gKHJlc29sdXRpb24gLSAxKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSkoKTtcbiAgfTtcblxuICByZXR1cm4gRWFzaW5nO1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVhc2luZztcblxuXG59LHtcIi4uL21hdGgvaGVscGVyc1wiOjEyfV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIEJvdW5jZUVhc2luZywgU3dheUVhc2luZyxcbiAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIF9fZXh0ZW5kcyA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoX19oYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9O1xuXG5Cb3VuY2VFYXNpbmcgPSBfZGVyZXFfKFwiLi9ib3VuY2VcIik7XG5cblN3YXlFYXNpbmcgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gIF9fZXh0ZW5kcyhTd2F5RWFzaW5nLCBfc3VwZXIpO1xuXG4gIGZ1bmN0aW9uIFN3YXlFYXNpbmcoKSB7XG4gICAgcmV0dXJuIFN3YXlFYXNpbmcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBTd2F5RWFzaW5nLnByb3RvdHlwZS5jYWxjdWxhdGUgPSBmdW5jdGlvbihyYXRpbykge1xuICAgIHZhciB0O1xuICAgIGlmIChyYXRpbyA+PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgdCA9IHJhdGlvICogdGhpcy5saW1pdDtcbiAgICByZXR1cm4gdGhpcy5leHBvbmVudCh0KSAqIHRoaXMub3NjaWxsYXRpb24odCk7XG4gIH07XG5cbiAgU3dheUVhc2luZy5wcm90b3R5cGUuY2FsY3VsYXRlT21lZ2EgPSBmdW5jdGlvbihib3VuY2VzLCBsaW1pdCkge1xuICAgIHJldHVybiB0aGlzLmJvdW5jZXMgKiBNYXRoLlBJIC8gdGhpcy5saW1pdDtcbiAgfTtcblxuICBTd2F5RWFzaW5nLnByb3RvdHlwZS5vc2NpbGxhdGlvbiA9IGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gTWF0aC5zaW4odGhpcy5vbWVnYSAqIHQpO1xuICB9O1xuXG4gIHJldHVybiBTd2F5RWFzaW5nO1xuXG59KShCb3VuY2VFYXNpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN3YXlFYXNpbmc7XG5cblxufSx7XCIuL2JvdW5jZVwiOjZ9XSwxMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQm91bmNlLCBDb21wb25lbnRDbGFzc2VzLCBNYXRyaXg0RDtcblxuTWF0cml4NEQgPSBfZGVyZXFfKFwiLi9tYXRoL21hdHJpeDRkXCIpO1xuXG5Db21wb25lbnRDbGFzc2VzID0ge1xuICBzY2FsZTogX2RlcmVxXyhcIi4vY29tcG9uZW50cy9zY2FsZVwiKSxcbiAgcm90YXRlOiBfZGVyZXFfKFwiLi9jb21wb25lbnRzL3JvdGF0ZVwiKSxcbiAgdHJhbnNsYXRlOiBfZGVyZXFfKFwiLi9jb21wb25lbnRzL3RyYW5zbGF0ZVwiKSxcbiAgc2tldzogX2RlcmVxXyhcIi4vY29tcG9uZW50cy9za2V3XCIpXG59O1xuXG5Cb3VuY2UgPSAoZnVuY3Rpb24oKSB7XG4gIEJvdW5jZS5GUFMgPSAzMDtcblxuICBCb3VuY2UuY291bnRlciA9IDE7XG5cbiAgQm91bmNlLnByb3RvdHlwZS5jb21wb25lbnRzID0gbnVsbDtcblxuICBCb3VuY2UucHJvdG90eXBlLmR1cmF0aW9uID0gMDtcblxuICBmdW5jdGlvbiBCb3VuY2UoKSB7XG4gICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gIH1cblxuICBCb3VuY2UucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmFkZENvbXBvbmVudChuZXcgQ29tcG9uZW50Q2xhc3Nlc1tcInNjYWxlXCJdKG9wdGlvbnMpKTtcbiAgfTtcblxuICBCb3VuY2UucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5hZGRDb21wb25lbnQobmV3IENvbXBvbmVudENsYXNzZXNbXCJyb3RhdGVcIl0ob3B0aW9ucykpO1xuICB9O1xuXG4gIEJvdW5jZS5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmFkZENvbXBvbmVudChuZXcgQ29tcG9uZW50Q2xhc3Nlc1tcInRyYW5zbGF0ZVwiXShvcHRpb25zKSk7XG4gIH07XG5cbiAgQm91bmNlLnByb3RvdHlwZS5za2V3ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmFkZENvbXBvbmVudChuZXcgQ29tcG9uZW50Q2xhc3Nlc1tcInNrZXdcIl0ob3B0aW9ucykpO1xuICB9O1xuXG4gIEJvdW5jZS5wcm90b3R5cGUuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgdGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICB0aGlzLnVwZGF0ZUR1cmF0aW9uKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQm91bmNlLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29tcG9uZW50LCBzZXJpYWxpemVkLCBfaSwgX2xlbiwgX3JlZjtcbiAgICBzZXJpYWxpemVkID0gW107XG4gICAgX3JlZiA9IHRoaXMuY29tcG9uZW50cztcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIGNvbXBvbmVudCA9IF9yZWZbX2ldO1xuICAgICAgc2VyaWFsaXplZC5wdXNoKGNvbXBvbmVudC5zZXJpYWxpemUoKSk7XG4gICAgfVxuICAgIHJldHVybiBzZXJpYWxpemVkO1xuICB9O1xuXG4gIEJvdW5jZS5wcm90b3R5cGUuZGVzZXJpYWxpemUgPSBmdW5jdGlvbihzZXJpYWxpemVkKSB7XG4gICAgdmFyIG9wdGlvbnMsIF9pLCBfbGVuO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc2VyaWFsaXplZC5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgb3B0aW9ucyA9IHNlcmlhbGl6ZWRbX2ldO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQobmV3IENvbXBvbmVudENsYXNzZXNbb3B0aW9ucy50eXBlXShvcHRpb25zKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEJvdW5jZS5wcm90b3R5cGUudXBkYXRlRHVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kdXJhdGlvbiA9IHRoaXMuY29tcG9uZW50cy5tYXAoZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LmR1cmF0aW9uICsgY29tcG9uZW50LmRlbGF5O1xuICAgIH0pLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoYSwgYik7XG4gICAgfSk7XG4gIH07XG5cbiAgQm91bmNlLnByb3RvdHlwZS5kZWZpbmUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZSB8fCBCb3VuY2UuZ2VuZXJhdGVOYW1lKCk7XG4gICAgdGhpcy5zdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgdGhpcy5zdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5nZXRLZXlmcmFtZUNTUyh7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBwcmVmaXg6IHRydWVcbiAgICB9KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBCb3VuY2UucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbihlbGVtZW50cywgb3B0aW9ucykge1xuICAgIHZhciBjc3MsIGRlZmVycmVkLCBlbGVtZW50LCBwcmVmaXgsIHByZWZpeGVzLCBfaSwgX2osIF9sZW4sIF9sZW4xLCBfcmVmO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5kZWZpbmUoKTtcbiAgICBpZiAoIWVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuICAgIH1cbiAgICBwcmVmaXhlcyA9IHRoaXMuZ2V0UHJlZml4ZXMoKTtcbiAgICBkZWZlcnJlZCA9IG51bGw7XG4gICAgaWYgKHdpbmRvdy5qUXVlcnkgJiYgd2luZG93LmpRdWVyeS5EZWZlcnJlZCkge1xuICAgICAgZGVmZXJyZWQgPSBuZXcgd2luZG93LmpRdWVyeS5EZWZlcnJlZCgpO1xuICAgIH1cbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGVsZW1lbnRzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudHNbX2ldO1xuICAgICAgX3JlZiA9IHByZWZpeGVzLmFuaW1hdGlvbjtcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgIHByZWZpeCA9IF9yZWZbX2pdO1xuICAgICAgICBjc3MgPSBbdGhpcy5uYW1lLCBcIlwiICsgdGhpcy5kdXJhdGlvbiArIFwibXNcIiwgXCJsaW5lYXJcIiwgXCJib3RoXCJdO1xuICAgICAgICBpZiAob3B0aW9ucy5sb29wKSB7XG4gICAgICAgICAgY3NzLnB1c2goXCJpbmZpbml0ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LnN0eWxlW1wiXCIgKyBwcmVmaXggKyBcImFuaW1hdGlvblwiXSA9IGNzcy5qb2luKFwiIFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmxvb3ApIHtcbiAgICAgIHNldFRpbWVvdXQoKChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMucmVtb3ZlKSB7XG4gICAgICAgICAgICBfdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLm9uQ29tcGxldGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkZWZlcnJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSksIHRoaXMuZHVyYXRpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJyZWQ7XG4gIH07XG5cbiAgQm91bmNlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3JlZjtcbiAgICBpZiAoIXRoaXMuc3R5bGVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnN0eWxlRWxlbWVudC5yZW1vdmUpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0eWxlRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChfcmVmID0gdGhpcy5zdHlsZUVsZW1lbnQucGFyZW50Tm9kZSkgIT0gbnVsbCA/IF9yZWYucmVtb3ZlQ2hpbGQodGhpcy5zdHlsZUVsZW1lbnQpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcblxuICBCb3VuY2UucHJvdG90eXBlLmdldFByZWZpeGVzID0gZnVuY3Rpb24oZm9yY2UpIHtcbiAgICB2YXIgcHJlZml4ZXMsIHN0eWxlO1xuICAgIHByZWZpeGVzID0ge1xuICAgICAgdHJhbnNmb3JtOiBbXCJcIl0sXG4gICAgICBhbmltYXRpb246IFtcIlwiXVxuICAgIH07XG4gICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZHVtbXlcIikuc3R5bGU7XG4gICAgaWYgKGZvcmNlIHx8ICghKFwidHJhbnNmb3JtXCIgaW4gc3R5bGUpICYmIFwid2Via2l0VHJhbnNmb3JtXCIgaW4gc3R5bGUpKSB7XG4gICAgICBwcmVmaXhlcy50cmFuc2Zvcm0gPSBbXCItd2Via2l0LVwiLCBcIlwiXTtcbiAgICB9XG4gICAgaWYgKGZvcmNlIHx8ICghKFwiYW5pbWF0aW9uXCIgaW4gc3R5bGUpICYmIFwid2Via2l0QW5pbWF0aW9uXCIgaW4gc3R5bGUpKSB7XG4gICAgICBwcmVmaXhlcy5hbmltYXRpb24gPSBbXCItd2Via2l0LVwiLCBcIlwiXTtcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeGVzO1xuICB9O1xuXG4gIEJvdW5jZS5wcm90b3R5cGUuZ2V0S2V5ZnJhbWVDU1MgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGFuaW1hdGlvbnMsIGtleSwga2V5ZnJhbWVMaXN0LCBrZXlmcmFtZXMsIG1hdHJpeCwgcHJlZml4LCBwcmVmaXhlcywgdHJhbnNmb3JtU3RyaW5nLCB0cmFuc2Zvcm1zLCBfaSwgX2osIF9rLCBfbGVuLCBfbGVuMSwgX2xlbjIsIF9yZWYsIF9yZWYxLCBfcmVmMjtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBCb3VuY2UuZ2VuZXJhdGVOYW1lKCk7XG4gICAgcHJlZml4ZXMgPSB7XG4gICAgICB0cmFuc2Zvcm06IFtcIlwiXSxcbiAgICAgIGFuaW1hdGlvbjogW1wiXCJdXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucy5wcmVmaXggfHwgb3B0aW9ucy5mb3JjZVByZWZpeCkge1xuICAgICAgcHJlZml4ZXMgPSB0aGlzLmdldFByZWZpeGVzKG9wdGlvbnMuZm9yY2VQcmVmaXgpO1xuICAgIH1cbiAgICBrZXlmcmFtZUxpc3QgPSBbXTtcbiAgICBrZXlmcmFtZXMgPSB0aGlzLmdldEtleWZyYW1lcyhvcHRpb25zKTtcbiAgICBfcmVmID0gdGhpcy5rZXlzO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAga2V5ID0gX3JlZltfaV07XG4gICAgICBtYXRyaXggPSBrZXlmcmFtZXNba2V5XTtcbiAgICAgIHRyYW5zZm9ybVN0cmluZyA9IFwibWF0cml4M2RcIiArIG1hdHJpeDtcbiAgICAgIHRyYW5zZm9ybXMgPSBbXTtcbiAgICAgIF9yZWYxID0gcHJlZml4ZXMudHJhbnNmb3JtO1xuICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjEubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgIHByZWZpeCA9IF9yZWYxW19qXTtcbiAgICAgICAgdHJhbnNmb3Jtcy5wdXNoKFwiXCIgKyBwcmVmaXggKyBcInRyYW5zZm9ybTogXCIgKyB0cmFuc2Zvcm1TdHJpbmcgKyBcIjtcIik7XG4gICAgICB9XG4gICAgICBrZXlmcmFtZUxpc3QucHVzaChcIlwiICsgKE1hdGgucm91bmQoa2V5ICogMTAwICogMTAwKSAvIDEwMCkgKyBcIiUgeyBcIiArICh0cmFuc2Zvcm1zLmpvaW4oXCIgXCIpKSArIFwiIH1cIik7XG4gICAgfVxuICAgIGFuaW1hdGlvbnMgPSBbXTtcbiAgICBfcmVmMiA9IHByZWZpeGVzLmFuaW1hdGlvbjtcbiAgICBmb3IgKF9rID0gMCwgX2xlbjIgPSBfcmVmMi5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgIHByZWZpeCA9IF9yZWYyW19rXTtcbiAgICAgIGFuaW1hdGlvbnMucHVzaChcIkBcIiArIHByZWZpeCArIFwia2V5ZnJhbWVzIFwiICsgdGhpcy5uYW1lICsgXCIgeyBcXG4gIFwiICsgKGtleWZyYW1lTGlzdC5qb2luKFwiXFxuICBcIikpICsgXCIgXFxufVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGFuaW1hdGlvbnMuam9pbihcIlxcblxcblwiKTtcbiAgfTtcblxuICBCb3VuY2UucHJvdG90eXBlLmdldEtleWZyYW1lcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgY29tcG9uZW50LCBjb21wb25lbnRLZXlzLCBjdXJyZW50VGltZSwgZnJhbWVzLCBpLCBrZXksIGtleWZyYW1lcywga2V5cywgbWF0cml4LCByYXRpbywgX2ksIF9qLCBfaywgX2wsIF9sZW4sIF9sZW4xLCBfbGVuMiwgX3JlZiwgX3JlZjE7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBrZXlzID0gWzAsIDFdO1xuICAgIGlmIChvcHRpb25zLm9wdGltaXplZCkge1xuICAgICAgX3JlZiA9IHRoaXMuY29tcG9uZW50cztcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBjb21wb25lbnQgPSBfcmVmW19pXTtcbiAgICAgICAgY29tcG9uZW50S2V5cyA9IGNvbXBvbmVudC5lYXNpbmdPYmplY3QuZmluZE9wdGltYWxLZXlQb2ludHMoKS5tYXAoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIChrZXkgKiBjb21wb25lbnQuZHVyYXRpb24gLyBfdGhpcy5kdXJhdGlvbikgKyAoY29tcG9uZW50LmRlbGF5IC8gX3RoaXMuZHVyYXRpb24pO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5kZWxheSkge1xuICAgICAgICAgIGNvbXBvbmVudEtleXMucHVzaCgoY29tcG9uZW50LmRlbGF5IC8gdGhpcy5kdXJhdGlvbikgLSAwLjAwMSk7XG4gICAgICAgIH1cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGNvbXBvbmVudEtleXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmcmFtZXMgPSBNYXRoLnJvdW5kKCh0aGlzLmR1cmF0aW9uIC8gMTAwMCkgKiBCb3VuY2UuRlBTKTtcbiAgICAgIGZvciAoaSA9IF9qID0gMDsgMCA8PSBmcmFtZXMgPyBfaiA8PSBmcmFtZXMgOiBfaiA+PSBmcmFtZXM7IGkgPSAwIDw9IGZyYW1lcyA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICAgIGtleXMucHVzaChpIC8gZnJhbWVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAga2V5cyA9IGtleXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG4gICAgdGhpcy5rZXlzID0gW107XG4gICAga2V5ZnJhbWVzID0ge307XG4gICAgZm9yIChfayA9IDAsIF9sZW4xID0ga2V5cy5sZW5ndGg7IF9rIDwgX2xlbjE7IF9rKyspIHtcbiAgICAgIGtleSA9IGtleXNbX2tdO1xuICAgICAgaWYgKGtleWZyYW1lc1trZXldKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbWF0cml4ID0gbmV3IE1hdHJpeDREKCkuaWRlbnRpdHkoKTtcbiAgICAgIF9yZWYxID0gdGhpcy5jb21wb25lbnRzO1xuICAgICAgZm9yIChfbCA9IDAsIF9sZW4yID0gX3JlZjEubGVuZ3RoOyBfbCA8IF9sZW4yOyBfbCsrKSB7XG4gICAgICAgIGNvbXBvbmVudCA9IF9yZWYxW19sXTtcbiAgICAgICAgY3VycmVudFRpbWUgPSBrZXkgKiB0aGlzLmR1cmF0aW9uO1xuICAgICAgICBpZiAoKGNvbXBvbmVudC5kZWxheSAtIGN1cnJlbnRUaW1lKSA+IDFlLTgpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByYXRpbyA9IChrZXkgLSBjb21wb25lbnQuZGVsYXkgLyB0aGlzLmR1cmF0aW9uKSAvIChjb21wb25lbnQuZHVyYXRpb24gLyB0aGlzLmR1cmF0aW9uKTtcbiAgICAgICAgbWF0cml4Lm11bHRpcGx5KGNvbXBvbmVudC5nZXRFYXNlZE1hdHJpeChyYXRpbykpO1xuICAgICAgfVxuICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KTtcbiAgICAgIGtleWZyYW1lc1trZXldID0gbWF0cml4LnRyYW5zcG9zZSgpLnRvRml4ZWQoMyk7XG4gICAgfVxuICAgIHJldHVybiBrZXlmcmFtZXM7XG4gIH07XG5cbiAgQm91bmNlLmdlbmVyYXRlTmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcImFuaW1hdGlvbi1cIiArIChCb3VuY2UuY291bnRlcisrKTtcbiAgfTtcblxuICBCb3VuY2UuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvcGVydHksIHByb3BlcnR5SXNTdXBwb3J0ZWQsIHByb3BlcnR5TGlzdCwgcHJvcGVydHlMaXN0cywgc3R5bGUsIF9pLCBfaiwgX2xlbiwgX2xlbjE7XG4gICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZHVtbXlcIikuc3R5bGU7XG4gICAgcHJvcGVydHlMaXN0cyA9IFtbXCJ0cmFuc2Zvcm1cIiwgXCJ3ZWJraXRUcmFuc2Zvcm1cIl0sIFtcImFuaW1hdGlvblwiLCBcIndlYmtpdEFuaW1hdGlvblwiXV07XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBwcm9wZXJ0eUxpc3RzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBwcm9wZXJ0eUxpc3QgPSBwcm9wZXJ0eUxpc3RzW19pXTtcbiAgICAgIHByb3BlcnR5SXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IHByb3BlcnR5TGlzdC5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eUxpc3RbX2pdO1xuICAgICAgICBwcm9wZXJ0eUlzU3VwcG9ydGVkIHx8IChwcm9wZXJ0eUlzU3VwcG9ydGVkID0gcHJvcGVydHkgaW4gc3R5bGUpO1xuICAgICAgfVxuICAgICAgaWYgKCFwcm9wZXJ0eUlzU3VwcG9ydGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIEJvdW5jZTtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCb3VuY2U7XG5cblxufSx7XCIuL2NvbXBvbmVudHMvcm90YXRlXCI6MixcIi4vY29tcG9uZW50cy9zY2FsZVwiOjMsXCIuL2NvbXBvbmVudHMvc2tld1wiOjQsXCIuL2NvbXBvbmVudHMvdHJhbnNsYXRlXCI6NSxcIi4vbWF0aC9tYXRyaXg0ZFwiOjEzfV0sMTI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIE1hdGhIZWxwZXJzO1xuXG5NYXRoSGVscGVycyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gTWF0aEhlbHBlcnMoKSB7fVxuXG4gIE1hdGhIZWxwZXJzLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9O1xuXG4gIE1hdGhIZWxwZXJzLnByb3RvdHlwZS5maW5kVHVybmluZ1BvaW50cyA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIHZhciBpLCBzaWduQSwgc2lnbkIsIHR1cm5pbmdQb2ludHMsIF9pLCBfcmVmO1xuICAgIHR1cm5pbmdQb2ludHMgPSBbXTtcbiAgICBmb3IgKGkgPSBfaSA9IDEsIF9yZWYgPSB2YWx1ZXMubGVuZ3RoIC0gMTsgMSA8PSBfcmVmID8gX2kgPCBfcmVmIDogX2kgPiBfcmVmOyBpID0gMSA8PSBfcmVmID8gKytfaSA6IC0tX2kpIHtcbiAgICAgIHNpZ25BID0gdGhpcy5zaWduKHZhbHVlc1tpXSAtIHZhbHVlc1tpIC0gMV0pO1xuICAgICAgc2lnbkIgPSB0aGlzLnNpZ24odmFsdWVzW2kgKyAxXSAtIHZhbHVlc1tpXSk7XG4gICAgICBpZiAoc2lnbkEgIT09IHNpZ25CKSB7XG4gICAgICAgIHR1cm5pbmdQb2ludHMucHVzaChpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHR1cm5pbmdQb2ludHM7XG4gIH07XG5cbiAgTWF0aEhlbHBlcnMucHJvdG90eXBlLmFyZWFCZXR3ZWVuTGluZUFuZEN1cnZlID0gZnVuY3Rpb24odmFsdWVzLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIGFyZWEsIGN1cnZlVmFsdWUsIGksIGxlbmd0aCwgbGluZVZhbHVlLCB5RW5kLCB5U3RhcnQsIF9pO1xuICAgIGxlbmd0aCA9IGVuZCAtIHN0YXJ0O1xuICAgIHlTdGFydCA9IHZhbHVlc1tzdGFydF07XG4gICAgeUVuZCA9IHZhbHVlc1tlbmRdO1xuICAgIGFyZWEgPSAwO1xuICAgIGZvciAoaSA9IF9pID0gMDsgMCA8PSBsZW5ndGggPyBfaSA8PSBsZW5ndGggOiBfaSA+PSBsZW5ndGg7IGkgPSAwIDw9IGxlbmd0aCA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICBjdXJ2ZVZhbHVlID0gdmFsdWVzW3N0YXJ0ICsgaV07XG4gICAgICBsaW5lVmFsdWUgPSB5U3RhcnQgKyAoaSAvIGxlbmd0aCkgKiAoeUVuZCAtIHlTdGFydCk7XG4gICAgICBhcmVhICs9IE1hdGguYWJzKGxpbmVWYWx1ZSAtIGN1cnZlVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gYXJlYTtcbiAgfTtcblxuICByZXR1cm4gTWF0aEhlbHBlcnM7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IE1hdGhIZWxwZXJzO1xuXG5cbn0se31dLDEzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBNYXRyaXg0RDtcblxuTWF0cml4NEQgPSAoZnVuY3Rpb24oKSB7XG4gIE1hdHJpeDRELnByb3RvdHlwZS5fYXJyYXkgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIE1hdHJpeDREKGFycmF5KSB7XG4gICAgdGhpcy5fYXJyYXkgPSAoYXJyYXkgIT0gbnVsbCA/IGFycmF5LnNsaWNlKDApIDogdm9pZCAwKSB8fCBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gIH1cblxuICBNYXRyaXg0RC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24obWF0cml4KSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKSA9PT0gbWF0cml4LnRvU3RyaW5nKCk7XG4gIH07XG5cbiAgTWF0cml4NEQucHJvdG90eXBlLmlkZW50aXR5ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBcnJheShbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIE1hdHJpeDRELnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgIHZhciBpLCBqLCBrLCByZXMsIHZhbHVlLCBfaSwgX2osIF9rO1xuICAgIHJlcyA9IG5ldyBNYXRyaXg0RDtcbiAgICBmb3IgKGkgPSBfaSA9IDA7IF9pIDwgNDsgaSA9ICsrX2kpIHtcbiAgICAgIGZvciAoaiA9IF9qID0gMDsgX2ogPCA0OyBqID0gKytfaikge1xuICAgICAgICBmb3IgKGsgPSBfayA9IDA7IF9rIDwgNDsgayA9ICsrX2spIHtcbiAgICAgICAgICB2YWx1ZSA9IHJlcy5nZXQoaSwgaikgKyB0aGlzLmdldChpLCBrKSAqIG1hdHJpeC5nZXQoaywgaik7XG4gICAgICAgICAgcmVzLnNldChpLCBqLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29weShyZXMpO1xuICB9O1xuXG4gIE1hdHJpeDRELnByb3RvdHlwZS50cmFuc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYTtcbiAgICBhID0gdGhpcy5nZXRBcnJheSgpO1xuICAgIHRoaXMuc2V0QXJyYXkoW2FbMF0sIGFbNF0sIGFbOF0sIGFbMTJdLCBhWzFdLCBhWzVdLCBhWzldLCBhWzEzXSwgYVsyXSwgYVs2XSwgYVsxMF0sIGFbMTRdLCBhWzNdLCBhWzddLCBhWzExXSwgYVsxNV1dKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBNYXRyaXg0RC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24ocm93LCBjb2x1bW4pIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBcnJheSgpW3JvdyAqIDQgKyBjb2x1bW5dO1xuICB9O1xuXG4gIE1hdHJpeDRELnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihyb3csIGNvbHVtbiwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbcm93ICogNCArIGNvbHVtbl0gPSB2YWx1ZTtcbiAgfTtcblxuICBNYXRyaXg0RC5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgIHRoaXMuX2FycmF5ID0gbWF0cml4LmdldEFycmF5KCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTWF0cml4NEQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0RCh0aGlzLmdldEFycmF5KCkpO1xuICB9O1xuXG4gIE1hdHJpeDRELnByb3RvdHlwZS5nZXRBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheS5zbGljZSgwKTtcbiAgfTtcblxuICBNYXRyaXg0RC5wcm90b3R5cGUuc2V0QXJyYXkgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHRoaXMuX2FycmF5ID0gYXJyYXk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgTWF0cml4NEQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiKFwiICsgKHRoaXMuZ2V0QXJyYXkoKS5qb2luKFwiLCBcIikpICsgXCIpXCI7XG4gIH07XG5cbiAgTWF0cml4NEQucHJvdG90eXBlLnRvRml4ZWQgPSBmdW5jdGlvbihuKSB7XG4gICAgdmFyIHZhbHVlO1xuICAgIHRoaXMuX2FycmF5ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9pLCBfbGVuLCBfcmVmLCBfcmVzdWx0cztcbiAgICAgIF9yZWYgPSB0aGlzLl9hcnJheTtcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgdmFsdWUgPSBfcmVmW19pXTtcbiAgICAgICAgX3Jlc3VsdHMucHVzaChwYXJzZUZsb2F0KHZhbHVlLnRvRml4ZWQobikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9KS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBNYXRyaXg0RDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXRyaXg0RDtcblxuXG59LHt9XSwxNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgVmVjdG9yMkQ7XG5cblZlY3RvcjJEID0gKGZ1bmN0aW9uKCkge1xuICBWZWN0b3IyRC5wcm90b3R5cGUueCA9IDA7XG5cbiAgVmVjdG9yMkQucHJvdG90eXBlLnkgPSAwO1xuXG4gIGZ1bmN0aW9uIFZlY3RvcjJEKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4ICE9IG51bGwgPyB4IDogMDtcbiAgICB0aGlzLnkgPSB5ICE9IG51bGwgPyB5IDogMDtcbiAgfVxuXG4gIFZlY3RvcjJELnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbih2ZWN0b3IpIHtcbiAgICBpZiAoIVZlY3RvcjJELmlzVmVjdG9yMkQodmVjdG9yKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZFNjYWxhcih2ZWN0b3IpO1xuICAgIH1cbiAgICB0aGlzLnggKz0gdmVjdG9yLng7XG4gICAgdGhpcy55ICs9IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFZlY3RvcjJELnByb3RvdHlwZS5fYWRkU2NhbGFyID0gZnVuY3Rpb24obikge1xuICAgIHRoaXMueCArPSBuO1xuICAgIHRoaXMueSArPSBuO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFZlY3RvcjJELnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uKHZlY3Rvcikge1xuICAgIGlmICghVmVjdG9yMkQuaXNWZWN0b3IyRCh2ZWN0b3IpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3VidHJhY3RTY2FsYXIodmVjdG9yKTtcbiAgICB9XG4gICAgdGhpcy54IC09IHZlY3Rvci54O1xuICAgIHRoaXMueSAtPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBWZWN0b3IyRC5wcm90b3R5cGUuX3N1YnRyYWN0U2NhbGFyID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiB0aGlzLl9hZGRTY2FsYXIoLW4pO1xuICB9O1xuXG4gIFZlY3RvcjJELnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uKHZlY3Rvcikge1xuICAgIGlmICghVmVjdG9yMkQuaXNWZWN0b3IyRCh2ZWN0b3IpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbXVsdGlwbHlTY2FsYXIodmVjdG9yKTtcbiAgICB9XG4gICAgdGhpcy54ICo9IHZlY3Rvci54O1xuICAgIHRoaXMueSAqPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBWZWN0b3IyRC5wcm90b3R5cGUuX211bHRpcGx5U2NhbGFyID0gZnVuY3Rpb24obikge1xuICAgIHRoaXMueCAqPSBuO1xuICAgIHRoaXMueSAqPSBuO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFZlY3RvcjJELnByb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbih2ZWN0b3IpIHtcbiAgICBpZiAoIVZlY3RvcjJELmlzVmVjdG9yMkQodmVjdG9yKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RpdmlkZVNjYWxhcih2ZWN0b3IpO1xuICAgIH1cbiAgICB0aGlzLnggLz0gdmVjdG9yLng7XG4gICAgdGhpcy55IC89IHZlY3Rvci55O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFZlY3RvcjJELnByb3RvdHlwZS5fZGl2aWRlU2NhbGFyID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBseVNjYWxhcigxIC8gbik7XG4gIH07XG5cbiAgVmVjdG9yMkQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSk7XG4gIH07XG5cbiAgVmVjdG9yMkQucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbih2ZWN0b3IpIHtcbiAgICB0aGlzLnggPSB2ZWN0b3IueDtcbiAgICB0aGlzLnkgPSB2ZWN0b3IueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBWZWN0b3IyRC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24odmVjdG9yKSB7XG4gICAgcmV0dXJuIHZlY3Rvci54ID09PSB0aGlzLnggJiYgdmVjdG9yLnkgPT09IHRoaXMueTtcbiAgfTtcblxuICBWZWN0b3IyRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCIoXCIgKyB0aGlzLnggKyBcIiwgXCIgKyB0aGlzLnkgKyBcIilcIjtcbiAgfTtcblxuICBWZWN0b3IyRC5wcm90b3R5cGUudG9GaXhlZCA9IGZ1bmN0aW9uKG4pIHtcbiAgICB0aGlzLnggPSBwYXJzZUZsb2F0KHRoaXMueC50b0ZpeGVkKG4pKTtcbiAgICB0aGlzLnkgPSBwYXJzZUZsb2F0KHRoaXMueS50b0ZpeGVkKG4pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBWZWN0b3IyRC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnldO1xuICB9O1xuXG4gIFZlY3RvcjJELmlzVmVjdG9yMkQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0gaW5zdGFuY2VvZiBWZWN0b3IyRDtcbiAgfTtcblxuICByZXR1cm4gVmVjdG9yMkQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yMkQ7XG5cblxufSx7fV19LHt9LFsxMV0pXG4oMTEpXG59KTsiLCJpbXBvcnQgQm91bmNlIGZyb20gJ2JvdW5jZS5qcyc7XG5cbi8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVkZWQpIGFuZCBtYXggKGV4Y2x1ZGVkKVxuLy8gVXNpbmcgTWF0aC5yb3VuZCgpIHdpbGwgZ2l2ZSB5b3UgYSBub24tdW5pZm9ybSBkaXN0cmlidXRpb24hXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxuZnVuY3Rpb24gc2t1cnRMb2dvKCkge1xuICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgbGV0IHNrdXJ0ID0gbmV3IEJvdW5jZSgpXG4gICAgLnNrZXcoe1xuICAgICAgZnJvbTogeyB4OiAwIH0sXG4gICAgICB0bzogeyB4OiAyMCB9XG4gICAgfSkudHJhbnNsYXRlKHtcbiAgICAgIGZyb206IHsgeDogMCB9LFxuICAgICAgdG86IHsgeDogd2lkdGggfSxcbiAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICBib3VuY2VzOiA0XG4gICAgfSkudHJhbnNsYXRlKHtcbiAgICAgIGZyb206IHsgeDogMCB9LFxuICAgICAgdG86IHsgeDogd2lkdGggKiAtMiB9LFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBkZWxheTogNTAwXG4gICAgfSkudHJhbnNsYXRlKHtcbiAgICAgIGZyb206IHsgeDogMCB9LFxuICAgICAgdG86IHsgeDogd2lkdGggfSxcbiAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICBkZWxheTogNTAxXG4gICAgfSkuc2tldyh7XG4gICAgICBmcm9tOiB7IHg6IDB9LFxuICAgICAgdG86IHsgeDogLTIwIH0sXG4gICAgICBkZWxheTogNzAyLFxuICAgICAgYm91bmNlczogNVxuICAgIH0pO1xuXG4gIHJldHVybiBza3VydDtcbn1cblxuZnVuY3Rpb24gZ3JhbmRUd2lybCgpIHtcbiAgbGV0IHR3aXJsID0gbmV3IEJvdW5jZSgpO1xuICB0d2lybC5zY2FsZSh7XG4gICAgZnJvbTogeyB4OiAwLjEsIHk6IDAuMSB9LFxuICAgIHRvOiB7IHg6IDEsIHk6IDEgfSxcbiAgICBzdGlmZm5lc3M6IDEsXG4gICAgYm91bmNlczogNCxcbiAgICBkdXJhdGlvbjogMTUwMCxcbiAgICBkZWxheTogMTAwXG4gIH0pLnJvdGF0ZSh7XG4gICAgZnJvbTogMCxcbiAgICB0bzogMzYwLFxuICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgIGRlbGF5OiAyMDAsXG4gICAgYm91bmNlczogMlxuICB9KTtcblxuICByZXR1cm4gdHdpcmw7XG59XG5cbmxldCBhbmltYXRpb25zID0gW1xuICBza3VydExvZ28sXG4gIGdyYW5kVHdpcmxcbl07XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIGxldCBhbmltYXRpb24gPSBhbmltYXRpb25zW2dldFJhbmRvbUludCgwLCBhbmltYXRpb25zLmxlbmd0aCldO1xuICBhbmltYXRpb24oKS5hcHBseVRvKGUudGFyZ2V0KTtcbn0pO1xuXG5cblxuXG4iXX0=
