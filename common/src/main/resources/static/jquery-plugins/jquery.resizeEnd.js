(function($, window, document) {
  var ResizeEnd, defaults, plugin;
  plugin = 'resizeEnd';
  defaults = {
    delay: 250
  };
  ResizeEnd = function(element, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    callback = callback || null;
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = plugin;
    this._timeout = false;
    this._callback = callback;
    return this.init();
  };
  ResizeEnd.prototype = {
    init: function() {
      var $el, _this;
      _this = this;
      $el = $(this.element);
      return $el.on('resize', function() {
        return _this.initResize();
      });
    },
    getUTCDate: function(d) {
      var curdate;
      d = d || new Date();
      curdate = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
      return curdate;
    },
    initResize: function() {
      var _this;
      _this = this;
      _this.controlTime = _this.getUTCDate();
      if (_this._timeout === false) {
        _this._timeout = true;
        return setTimeout(function() {
          return _this.runCallback(_this);
        }, _this.settings.delay);
      }
    },
    runCallback: function(_this) {
      var nowTime;
      nowTime = _this.getUTCDate();
      if (nowTime - _this.controlTime < _this.settings.delay) {
        return setTimeout(function() {
          return _this.runCallback(_this);
        }, _this.settings.delay);
      } else {
        _this._timeout = false;
        return _this._callback();
      }
    }
  };
  return $.fn[plugin] = function(options, callback) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + plugin)) {
        return $.data(this, 'plugin_' + plugin, new ResizeEnd(this, options, callback));
      }
    });
  };
})(jQuery, window, document);
