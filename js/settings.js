// BSD License Disclaimer
// This code based on https://github.com/orbitbot/chrome-extensions-examples
// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var store = chrome.storage;

function $(id) {
  return document.getElementById(id);
}

/**
 * Updates the UI to reflect the state of the preference.
 *
 * @param settings{object} A settings object, as returned from |get()| or the
 * |onchanged| event.
 */

function initUI(settings) {
  if (settings['show_generic_filetypes']) {
    $('show_generic_filetypes').checked = settings['show_generic_filetypes'];
  } else {
    $('show_generic_filetypes').checked = false;
  }
}

/*
 * Initializes the UI.
 */
function init() {
  store.sync.get(['show_generic_filetypes'], initUI);

  $('show_generic_filetypes').addEventListener('click', function () {
    setPrefValue('show_generic_filetypes', this.checked);
  });
}

/**
 * Called from the UI to change the preference value.
 *
 * @param enabled{boolean} The new preference value.
 */
function setPrefValue(key, value) {
  var package = {};
  package[key] = value;
  store.sync.set(package);
}

// Call `init` to kick things off.
document.addEventListener('DOMContentLoaded', init);
