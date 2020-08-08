# SoJobs Chrome Extension [![Build Status](https://secure.travis-ci.org/itsazzad/SOJobs-ChromeExtension.svg?branch=master)](http://travis-ci.org/itsazzad/SOJobs-ChromeExtension)

Generator: [Chrome Extension generator](https://github.com/yeoman/generator-chrome-extension)

## Getting Started

```sh
# Transform updated source written by ES2015 (default option)
gulp babel

# or Using watch to update source continuously
gulp watch

# Make a production version extension
gulp build
```

## Test Chrome Extension

To test, go to: chrome://extensions, enable Developer mode and load app as an unpacked extension.

Need more information about Chrome Extension? Please visit [Google Chrome Extension Development](http://developer.chrome.com/extensions/devguide.html)


### Build and Package

It will build your app as a result you can have a distribution version of the app in `dist`. Run this command to build your Chrome Extension app.

```bash
gulp build
```

You can also distribute your project with compressed file using the Chrome Developer Dashboard at Chrome Web Store. This command will compress your app built by `gulp build` command.

```bash
gulp package
```

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)

