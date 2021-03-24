/*global define*/
import linkify from 'linkifyjs/html'

(function () {
  function surround (tagName, content) {
    return `<${tagName}>${content}</${tagName}>`
  }

  function traverse (vnode, opts, isParent) {
    const { text, tag, children } = vnode
    if (text) return linkify(text, opts)
    if (children) {
      const content = children.map(childVNode => traverse(childVNode, opts, false)).join('')
      if (isParent) return content
      return surround(tag, content)
    }
  }

  function install (el, binding, vnode) {
    if (vnode.data.domProps && vnode.data.domProps.innerHTML) {
      // when v-html is used
      el.innerHTML = linkify(el.innerHTML, binding.value)
    } else {
      // when `{{}}` syntax is used
      const isParent = true
      el.innerHTML = traverse(vnode, binding.value, isParent)
    }
  }

  if (typeof exports === 'object') {
    module.exports = install
  } else if (typeof define === 'function' && define.amd) {
    define([], function () { return install })
  } else if (window.Vue) {
    window.Vue.directive('linkified', install)
  }
})()
