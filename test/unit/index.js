import Vue from 'vue'
import linkified from '../../dist/vue-linkify.min.js'

Vue.directive('linkified', linkified)

describe('vue-linkify', () => {
  it('should correctly linkify content', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      data: { raw: 'Hello from vuejs.org' },
      template: '<div v-html="raw" v-linkified />'
    }).$mount()

    expect(vm.$el.innerHTML).to.be
      .equal('Hello from <a href="http://vuejs.org" class="linkified" target="_blank">vuejs.org</a>')
  })

  it('should correctly linkify content with options', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      data: { raw: 'Hello from vuejs.org' },
      template: '<div v-html="raw" v-linkified:options="{ className: \'foo\' }" />'
    }).$mount()

    expect(vm.$el.innerHTML).to.be
      .equal('Hello from <a href="http://vuejs.org" class="foo" target="_blank">vuejs.org</a>')
  })

  it('should correctly linkify content with {{}} syntax', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      data: {
        msg: 'https://vuejs.org'
      },
      template: '<h v-linkified>Site url: {{ msg }}</h>'
    }).$mount()

    expect(vm.$el.innerHTML).to.be
      .equal('<h>Site url: <a href="https://vuejs.org" class="linkified" target="_blank">https://vuejs.org</a></h>')
  })

  it('should correctly linkify content with {{}} syntax and options', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      data: {
        msg: 'https://vuejs.org'
      },
      template: '<h v-linkified v-linkified:options="{ className: \'foo\' }">Site url: {{ msg }}</h>'
    }).$mount()

    expect(vm.$el.innerHTML).to.be
      .equal('<h>Site url: <a href="https://vuejs.org" class="foo" target="_blank">https://vuejs.org</a></h>')
  })

  it('should correctly linkify content with {{}} even after update', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      data: {
        msg: 'https://vuejs.org'
      },
      template: '<h v-linkified>Site url: {{ msg }}</h>'
    }).$mount()

    vm.msg = 'https://reactjs.org'
    Vue.nextTick(() => {
      expect(vm.$el.innerHTML).to.be
        .equal('<h>Site url: <a href="https://reactjs.org" class="linkified" target="_blank">https://reactjs.org</a></h>')
    })
  })
})
