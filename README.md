# webpack-lodash-template-loader
lodash template loader for webpack

## Installation

`npm install webpack-lodash-template-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("ejs!./file.ejs");
// => returns the template function compiled with undesrcore (lodash) templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```

You also should provide a global `_` variable with the lodash/underscore runtime. You can do it with the following webpack plugin: https://github.com/webpack/docs/wiki/list-of-plugins#provideplugin

```
plugins: [
    new webpack.ProvidePlugin({
        _: "lodash"
    })
]
```

### Options
[Lodash](https://lodash.com/docs#template) options can be passed in using the querystring or adding an ```lodashLoader``` options block to your configuration.

Config example using a querystring:
``` js
module.exports = {
  module: {
    loaders: [
      { test: /\.html$/, loader: 'webpack-lodash-template-loader?variable=data' },
    ]
  }
};
```
is equivalent to
``` js
var template = _.template('<%= template %>', { variable : 'data' });
```

``` js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.html$/, 
                loader: 'webpack-lodash-template-loader', 
                query: { 
                    variable: 'data', 
                    interpolate : '\\{\\{(.+?)\\}\\}', 
                    evaluate : '\\[\\[(.+?)\\]\\]' 
                }
            },
        ]
    }
};
```
is equivalent to
``` js
var template = _.template('<%= template %>', { variable: 'data', interpolate : '\\{\\{(.+?)\\}\\}', evaluate : '\\[\\[(.+?)\\]\\]' });
```

Config example using the ```lodashLoader``` config block:
``` js
module.exports = {
  module: {
    loaders: [
      { test: /\.html$/, loader: 'webpack-lodash-template-loader' }
    ]
  },
  lodashLoader : {
    variable    : 'data',
    interpolate : /\{\{(.+?)\}\}/g,
    evaluate    : /\[\[(.+?)\]\]/g
  }
};
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
