# Modern Gulp 4.x ES6 Markup Boilerplate

Modern Gulp 4.x ES6 Markup Boilerplate is a modern professional front-end template for building fast, robust and modern web sites.

<!-- _Read this in other languages: [English](README.md), [Русский](README.ru.md)._ -->

## Getting started

### Quick start

1. Open terminal/bash in your project directory.
2. Run `npm install` to install required files and dependencies.
3. When it's done installing, run `npm run dev` to run gulp file watcher.
4. Now gulp watches all your files in `./src` directory and it will automatically open browser window with your website.

### Adding additional packages

- To add additional `.js` packages, add them in gulpfile's `config.paths.scrips.src` array.
- To add additional `.css` or `.scss` files add them in `./src/scss/vendors/_libs.scss` file with import.

### Build for production

When you will need ready for production files, run `npm run build` and `./dist` folder will be created.

### SVG sprite

#### Adding icons to the sprite

To add `.svg` icons to the sprite, you should add them to `./src/images/icon-svg` folder while running `npm run dev` command, and it will automatically add them to the sprite.

#### Adding SVG sprite icons in your `.pug` files

- Use `+svg(id, width, height)(additionalClassName)` pug mixin.

#### Adding SVG sprite icons in your `.scss` files

- Use `@include svg-icon(id, width, height);` Sass mixin.

### Updating this boilerplate

1. Run `npm i -g npm-check-updates` to install `npm-check-updates` package.
2. Run `ncu` to check updates for installed packages (dependencies).
3. Run `ncu -u` to update dependencies your `package.json` file.
4. Run `npm install` to install updated dependencies.

### Checking for vulnerabilities

Run `npm audit` to check current vulnerabilities.

## Browser support

Support browserslist's default browsers (> 0.5%, last 2 versions, Firefox ESR, not dead).

## License

The code is available under the MIT license.

<hr>

## Helping Front-end Checklist

### HTML

- [x] Theme color
- [ ] W3C compliant
- [ ] Pages & Elements
  - [ ] 404
  - [ ] 5xx
  - [ ] Form validation errors
  - [ ] Success message
  - [ ] Failure message
- [ ] Semantics
- [ ] AdBlocker test
- [ ] Noopener `target="\_blank" && rel="noopener"`
      ^ Noopener: In case you are using external links with target="\_blank", your link should have a rel="noopener" attribute to prevent tab nabbing. If you need to support older versions of Firefox, use rel="noopener noreferrer"
- [ ] Микроразметка (optional)
  - [ ] контакты (для каждого сайта на всех страницах должны быть указаны контакты, название компании, время работы)
  - [ ] товары (для интернет-магазинов)
  - [ ] хлебные крошки
  - [ ] отзывы

### CSS

- [ ] Print version (optional)
- [ ] Stylelint
- [ ] Browser Compability
  - [ ] Desktop
  - [ ] Mobile

### Images

- [ ] Alt tag for all images
- [ ] Width and height attributes

### Accessibility

- [ ] Use label or aria-label for inputs
- [ ] Keyboard navigation
- [ ] Focus states
  - [ ] Screen reader check

### Perfomance

- [ ] Checking Services
  - [ ] PageSpeed Insights >= 90
  - [ ] Lighthouse
  - [ ] Test a website's performance - https://www.webpagetest.org/
  - [ ] What Does My Site Cost? - https://whatdoesmysitecost.com/
- [ ] Rules of thumb
  - [ ] Page weight is less than 500 KB
  - [x] Reduce number of requests
  - [x] Minify & concatenate things
  - [ ] Lazy load
- [ ] Fonts
  - [x] Use "font-display: swap;"
  - [x] Use .ttf/.woff/.woff2 only
    - [ ] Reduce amount of font files

## Todo

- [ ] Add Russian README.md
- [ ] Reduce `.scss` mixins
- [ ] Enhance documentation
- [ ] Add updating from gulp 3.x utility
- [ ] Add optional `.pug` usage
- [ ] Add optional StyleLint
- [ ] Add optional ESlint
- [ ] Refine `reboot.scss`
- [ ] Add features section in README.md
