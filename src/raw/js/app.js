// require the encoding[.min].js
// https://github.com/polygonplanet/encoding.js

var vm = new Vue({
  el: '#app',
  data: {
    input: "",
    placeholder: "ここに変換したいテキストを入力"
  },
  computed: {
    output: function () {
        return this.stringToCodeString();
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300),
    stringToCodeString: function () {
      return this.input;
    }
  }
});
