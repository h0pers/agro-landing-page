
# HTML-CODING TEMPLATE

Here is my interpretation of template for doing html-coding. I would like to use gulp versus webpack. I see webpack much heavy than gulp, that is reason why I choosed gulp.

## Installation
You are required to install [node](https://nodejs.org/).

Super. When our node installed we can start to install requirement components of template.

The first one is Gulp --> [Read more](https://gulpjs.com/docs/en/getting-started/quick-start).

Lets install it. From gulp documentation 'quick start' we should use the command to install gulp on global level

```bash
  npm install --global gulp-cli
```
Install included libraries from package.json
```bash
  npm install --save-dev
```
```bash
  gulp
```

Super. We ready to work. Good luck

## Deployment

By default gulp starts in watch mode, it means the dist folder will generate automatically but if you would like to build the app using command do

```bash
  gulp clean
```
```bash
  gulp build
```

To see more deployment command use
```bash
  gulp --tasks
```



## Authors

- [@h0pers](https://github.com/h0pers)

