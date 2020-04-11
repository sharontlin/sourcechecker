"use strict";

var store = chrome.storage;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function SourceChecker() {
  var _id = 'sc-container',
      _posBuffer = 3;

  function init() {
    document.body.addEventListener('mousemove', glide);
    document.body.addEventListener('mouseover', show);
    document.body.addEventListener('mouseleave', hide);
  }

  function hide(e) {
    document.getElementById(_id).style.display = 'none';
  }

  function show(e) {
    chrome.storage.sync.get(['source_checking'], function(result) {
      if (!result['source_checking'] && e.target.nodeName.toLowerCase() == "a") {
        var scContainer = document.getElementById(_id);
  
        if (!scContainer) {
          create();
          return;
        }
  
        if (scContainer.style.display !== 'block') {
          scContainer.style.display = 'block';
        }
      } else if (document.getElementById(_id)) {
        document.getElementById(_id).style.display = 'none';
      }
    });
  }

  function glide(e) {
    chrome.storage.sync.get(['source_checking'], function(result) {
      if (!result['source_checking'] && e.target.nodeName.toLowerCase() == "a") {
        var scContainer = document.getElementById(_id);
  
        if (!scContainer) {
          create();
          return;
        }
  
        var left = e.clientX + getScrollPos().left + _posBuffer;
  
        var top = e.clientY + getScrollPos().top + _posBuffer;
  
        scContainer.innerHTML = showAttributes(e.target);
  
        if (left + scContainer.offsetWidth > window.innerWidth) {
          scContainer.style.left = left - scContainer.offsetWidth + 'px';
        } else {
          scContainer.style.left = left + 'px';
        }
  
        scContainer.style.top = top + 'px';
  
      } else if (document.getElementById(_id)) {
          document.getElementById(_id).style.display = 'none';
      }
    });
  }

  function getScrollPos() {
    var ieEdge = document.all ? false : true;

    if (!ieEdge) {
      return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
      };
    } else {
      return {
        left: document.documentElement.scrollLeft,
        top: document.documentElement.scrollTop
      };
    }
  }

  function showAttributes(el) {
    var attrArr = Array.from(el.attributes);
    var attributes = attrArr.reduce(function (attrs, attr) {
      if (attr.nodeName == "href") {
        if (websites.some(v => attr.nodeValue.includes(v))) {
          attrs += "<span style=\"font-weight:bold;\">Legit</span><br/>";
        } else {
          attrs += "<span style=\"font-weight:bold;\">Inconclusive</span><br/>";
        }
        attrs += "<span style=\"color:#ffffcc;\">".concat(attr.nodeValue, "</span><br/>");
      }
      return attrs;
    }, '');
    return attributes;
  }

  function create() {
    var div = document.createElement('div');
    div.id = _id;
    div.setAttribute('style', "\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: auto;\n        height: auto;\n        padding: 10px;\n        box-sizing: border-box;\n        color: #fff;\n        background-color: #444;\n        z-index: 100000;\n        font-size: 12px;\n        border-radius: 5px;\n        line-height: 20px;\n        max-width: 45%;\n        ");
    document.body.appendChild(div);
  }

  init();
})();