# vue-linkify

> A simple Vue directive to turn URL's and emails into clickable links. Based on SoapBox's [Linkify](https://github.com/SoapBox/linkifyjs).

## Install

This directive can be installed as a module:

``` bash
$ npm install vue-linkify
```

or, if you're not in a module environment, just include it as a `<script>`.

## Basic Usage

In a browser environment, you should now have a `v-linkified` directive set up for free. If you're in a module environment, just `import` and register it as you please:

``` js
import linkify from 'vue-linkify'

Vue.directive('linkified', linkify)
```

And then you use it away:

``` html
<template>
  <div id="app">
    <div v-html="raw" v-linkified />
  </div>
</template>
<script>
export default {
  data () {
    return {
      raw: 'Hello from vuejs.org'
    }
  }
}
</script>
```

The above snippet will yield:

``` html
Hello from <a href="http://vuejs.org" class="linkified" target="_blank">vuejs.org</a>
```

## ~~Advanced~~ Slightly Less Basic Usage

You can also pass an `options` argument, which takes an `Object`, into the directive to control its behavior. For example, modifying the above template into something like this:

``` html
<template>
  <div id="app">
    <div v-html="raw" v-linkified:options="{ className: 'foo' }" />
  </div>
</template>
```

will yield a slightly different HTML:

``` html
Hello from <a href="http://vuejs.org" class="foo" target="_blank">vuejs.org</a>
```

A list of available options is available [here](http://soapbox.github.io/linkifyjs/docs/options.html).

## License

MIT &copy; [Phan An](http://phanan.net)
