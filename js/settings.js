// BSD License Disclaimer
// This code based on https://github.com/orbitbot/chrome-extensions-examples
// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var store = chrome.storage;

var activated;

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
  if (activated) {
    $('source_checking').checked = false;
  } else {
    $('source_checking').checked = true;
  }
}

/*
 * Initializes the UI.
 */
function init() {
  activated = true;
  store.sync.get(['source_checking'], initUI);

  $('source_checking').addEventListener('click', function () {
    setPrefValue('source_checking', this.checked);
    activated = !activated;
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
