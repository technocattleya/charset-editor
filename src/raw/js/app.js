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
      var utf8str, codeDecimal, codeString;
      var string = this.input;
      var type = "16";
      var digit = 2;

      utf8str = Encoding.convert(string, 'UTF8');
      codeDecimal = Encoding.stringToCode(utf8str);

      if (type !== "url") {
        codeString = codeDecimal
          .map((decimal) => (
            Array(digit + 1).join("0") + decimal.toString(type)
          ).slice(-digit))
          .join("");
      } else {
        codeString = Encoding.urlEncode(codeDecimal);
      }

      return codeString;
    }
  }
});
