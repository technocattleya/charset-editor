// require the encoding[.min].js
// https://github.com/polygonplanet/encoding.js

var vm = new Vue({
  el: '#app',
  data: {
    type: "16",
    cnvTypes: [
      {
        label: "2進数表記",
        value: "2"
      },
      {
        label: "8進数表記",
        value: "8"
      },
      {
        label: "16進数表記",
        value: "16"
      },
      {
        label: "URLエンコード",
        value: "url"
      }
    ],
    input: "",
    mode: "STRING_TO_CODE",
    placeholder: "ここに変換したいテキストを入力"
  },
  computed: {
    output: function () {
      if (this.mode === "STRING_TO_CODE") {
        return this.stringToCodeString();
      } else {
        return this.codeStringToString();
      }
    },
    digit: function () {
      // use == to allow number type
      if (this.type == "16") {
        return 2;
      } else if (this.type == "8") {
        return 3;
      } else if (this.type == "2") {
        return 8;
      }
      return NaN;
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300),
    toggleMode: function () {
      this.input = this.output;
      if (this.mode === "STRING_TO_CODE") {
        this.mode = "CODE_TO_STRING";
        this.placeholder = "ここに変換したいUTF-8コードを入力";
      } else {
        this.mode = "STRING_TO_CODE";
        this.placeholder = "ここに変換したいテキストを入力";
      }
    },
    stringToCodeString: function () {
      var utf8str, codeDecimal, codeString;
      var string = this.input;
      var type = this.type;
      var digit = this.digit;

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
    },
    codeStringToString: function () {
      return this.input; // TODO
    }
  }
});
