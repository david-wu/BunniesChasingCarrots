(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/ace/david/game/src/app.js":[function(require,module,exports){


var BaseUnit = require('./units/_baseUnit.js');

// console.log('yea',a)

},{"./units/_baseUnit.js":"/Users/ace/david/game/src/units/_baseUnit.js"}],"/Users/ace/david/game/src/units/_baseUnit.js":[function(require,module,exports){


function BaseUnit() {}

BaseUnit.prototype.tick = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.vel[0] -= this.vel[0] * friction;
    this.vel[1] -= this.vel[1] * friction;
};

},{}]},{},["/Users/ace/david/game/src/app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL3VuaXRzL19iYXNlVW5pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUEsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDOzs7QUFBQTs7OztBQ0U5QyxTQUFTLFFBQVEsR0FBRSxFQUVsQjs7QUFFRCxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFVO0FBQ2hDLFFBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQixRQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTNCLFFBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxRQUFRLEFBQUMsQ0FBQztBQUN0QyxRQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsUUFBUSxBQUFDLENBQUM7Q0FFekMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblxudmFyIEJhc2VVbml0ID0gcmVxdWlyZSgnLi91bml0cy9fYmFzZVVuaXQuanMnKVxuXG5cblxuXG4vLyBjb25zb2xlLmxvZygneWVhJyxhKVxuXG5cblxuIiwiXG5cblxuXG5mdW5jdGlvbiBCYXNlVW5pdCgpe1xuXG59XG5cbkJhc2VVbml0LnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24oKXtcbiAgICB0aGlzLnBvc1swXSArPSB0aGlzLnZlbFswXTtcbiAgICB0aGlzLnBvc1sxXSArPSB0aGlzLnZlbFsxXTtcblxuICAgIHRoaXMudmVsWzBdIC09ICh0aGlzLnZlbFswXSpmcmljdGlvbik7XG4gICAgdGhpcy52ZWxbMV0gLT0gKHRoaXMudmVsWzFdKmZyaWN0aW9uKTtcblxufSJdfQ==
