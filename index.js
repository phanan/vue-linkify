/*global define*/
import linkify from 'linkifyjs/html'

(function () {
  function install (el, binding) {
    el.innerHTML = linkify(el.innerHTML, binding.value)
  }

  if (typeof exports === 'object') {
    module.exports = install
  } else if (typeof define === 'function' && define.amd) {
    define([], function () { return install })
  } else if (window.Vue) {
    window.Vue.directive('linkified', install)
  }
})()
