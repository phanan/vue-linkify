/*global define*/
import linkify from 'linkifyjs/html'

(function () {
  function surround (tagName, content) {
    return `<${tagName}>${content}</${tagName}>`
  }

  function traverse (vnode, binding) {
    const { text, tag, children } = vnode
    if (text) return linkify(text, binding)
    if (children) {
      const content = children.map(childVNode => traverse(childVNode, binding)).join('')
      return surround(tag, content)
    }
  }

  function install (el, binding, vnode) {
    el.innerHTML = traverse(vnode, binding)
  }

  if (typeof exports === 'object') {
    module.exports = install
  } else if (typeof define === 'function' && define.amd) {
    define([], function () { return install })
  } else if (window.Vue) {
    window.Vue.directive('linkified', install)
  }
})()
