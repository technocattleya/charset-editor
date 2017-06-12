# charset-editor

## Description
The single-page application to edit text while converting it to character set. 

**DEMO:**

 [GitHub pages](https://technocattleya.github.io/charset-editor/)

## Features

* Convert text to UTF-8 character set code.
* Convert UTF-8 character set code to text.

## Requirement

* Modern browser (Edge, Firefox 28, Safari 9, Chrome 29, IE 11, Opera 12.1 or above)

### For developers

* Node.js
* See also devDependencies in package.json.

## Usage

1. Eenter the text you want to convert in the left or top textarea.
2. In response to the input, the result is displayed to the right or bottom textarea.
3. Top right button toggles conversion mode. (StringToCode / CodeToString)
4. Top left buttons change conversion type. (Binary, Octal, Hex, URL)

### For developers

1. Updated files in src are deployed to docs with below command.
~~~bash
$ npm start
~~~

2. For release, use below command.
~~~bash
$ npm run release
~~~

## Installation

### For developers

~~~bash
$ git clone https://github.com/technocattleya/charset-editor
$ npm install
~~~

## Anything Else

One day, I encountered a book on which has pages written in something like cipher. 
The book is NieR:Automata Strategy Guide. 

I noticed that they are utf-8 code and a tool to read and write quickly became necessary.

This is the motivation for creating this SPA.

I was really surprised that YOKO TARO wrote the code for the machine in the books that people read.

Let's share the utf-8 code strings like him!

I love NieR:Automata :)  
"I prepared this just for you."  
Thanks.

## Author

[@technocattleya](https://twitter.com/technocattleya)

## License

[MIT](http://b4b4r07.mit-license.org)
