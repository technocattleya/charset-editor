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
    },
    pattern: function () {
      // use == to allow number type
      if (this.type == "16") {
        return /^[0-9a-fA-F]+$/;
      } else if (this.type == "8") {
        return /^[0-7]+$/;
      } else if (this.type == "2") {
        return /^[01]+$/;
      }
      return /^$/;
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
      var code = [], num = [], string = "";
      var index = 0, offset, byte, byteCount;
      var isCode, isValid;
      var codeString = this.input;
      var len = codeString && codeString.length;
      var type = this.type;
      var digit = this.digit;
      var pattern = this.pattern;

      // convert code string to decimal code array
      if (!isNaN(digit)) {
        while (index < len) {
          byte = codeString.slice(index, index + digit);
          isCode = pattern.test(byte);
          if (isCode) {
            num = [];
            num[0] = parseInt(byte, type);
            // See RFC 3629 UTF-8, a transformation format of ISO 10646
            // (https://tools.ietf.org/html/rfc3629)
            // See also The Unicode Consortium (http://www.unicode.org/)
            if (num[0] >= 0x00 && num[0] <= 0x7F) {
              byteCount = 1;
            } else if (num[0] >= 0xC2 && num[0] <= 0xDF) {
              byteCount = 2;
            } else if (num[0] >= 0xE0 && num[0] <= 0xEF) {
              byteCount = 3;
            } else if (num[0] >= 0xF0 && num[0] <= 0xF7) {
              byteCount = 4;
            } else if (num[0] >= 0xF8 && num[0] <= 0xFB) {
              byteCount = 5;
            } else if (num[0] >= 0xFC && num[0] <= 0xFD) {
              byteCount = 6;
            } else {
              byteCount = NaN;
            }
            isValid = !isNaN(byteCount);
            if (isValid) {
              for (var i = 1; i < byteCount; i++) {
                offset = index + i * digit;
                byte = codeString.slice(offset, offset + digit);
                num[i] = parseInt(byte, type);
              }
              isValid = (byteCount == 1) ||
                (num.slice(1).every((i) => (i >= 0x80 && i <= 0xBF)));
              if (isValid) {
                code = Encoding.convert(num, "UNICODE");
                string += Encoding.codeToString(code);
                index += byteCount * digit;
                continue;
              }
            }
          }
          // Invalid Case
          //  num[0] : 0x80-0xC1, 0xFE-0xFF, ex char
          //  num[1, ..., N] : 0x00-0x7F, 0xC0-0xFF, ex char
          string += codeString.charAt(index);
          index++;
        }
      } else {
        code = Encoding.urlDecode(codeString);
        code = Encoding.convert(code, "UNICODE");
        string = Encoding.codeToString(code);
      }

      return string;
    }
  }
});
