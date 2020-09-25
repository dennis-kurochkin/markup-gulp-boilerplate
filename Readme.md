# Стартовый шаблон на сборщике Gulp 4

Для написания стилей используется scss.

Что настроено:
- локальный сервер с автообновлением,
- компиляция из препроцессора,
- минификация и конкатенация стилей, автопрефиксы,
- конкатенация скриптов,
- минификация изображений,
- спрайт как растровых изображений, так и svg,
- создание woff2 и woff шрифтов из ttf
- деплой проекта

- В начале работы делаем 'npm i', тем самым устанавливаем необходимые зависимости.
- Затем запускаем проект коммандой 'gulp', начинается отслеживание изменений.
- Заполняем файл с переменными _variables.scss.
- Используем миксины
- Типографика _typography.scss - настраиваем по-умолчанию

- В папке blocks, каждый файл отвечает за свой блок
- Папка sprite, служебная, там ничего не трогаем
- Вспомагательный классы в папке utilities, добавляем свои, правим существующие
- Папка vendors - стили сторонних библиотек.
- Библиотеки подключаем через npm

## Запуск проекта

Перед запуском обновить компоненты:
```ncu``` - проверка обновления компонентов;
```ncu -u``` - обновление

### Установка компонентов:
```npm i```

### Слежение за изменениями:
```gulp```

Файлы js сторонних библиотек подключаются в gulpfile.js до подключение основных файлов. Стили в vendors/_libs.scss


Сборка растрового спрайта:
```gulp sprite```

все иконки лежат в папке icons (без префикса icon-). Вставка иконки в scss файле @extend .icon-name;

Сборка векторного спрайта:
gulp svgSpriteBuild
Все иконки лежат в папке icons-svg. Вставка иконки в html файле

```
<svg class="icon-svg" aria-hidden="true">
    <use xlink:href="images/sprite.svg#name"></use>
</svg>
```

Для emmet:


```svg.icon-svg>use[xlink:href="images/sprite.svg#name"]```

Генерируется символьный спрайт, т.е. иконкой можно управлять через font-size и color
При этом вырезаются все внутренние стили svg. Если нужно вставить через фон или иконка имеет несколько цветов, тогда используем миксин @mixin svg-icon, в components/_icons.scss


Сборка для продакшена:
gulp build
Заменить .html подключение сжатых стилей style.min.css

## Front-end Checklist

### HTML
- Theme color
- W3C compliant
- Pages & Elements
    - 404
    - 5xx
    - Form validation errors
    - Success message
    - Failure message
- Semantics
- Adblocker test
- Noopener (target="_blank" && rel="noopener")
    ^ Noopener: In case you are using external links with target="_blank", your link should have a rel="noopener" attribute to prevent tab nabbing. If you need to support older versions of Firefox, use rel="noopener noreferrer"
- Микроразметка
    - контакты (для каждого сайта на всех страницах должны быть указаны контакты, название компании, время работы)
    - товары (для интернет-магазинов)
    - хлебные крошки
    - отзывы

### CSS
- Print version
- Stylelint
- Browser Compability
    ~ Desktop
    ~ Mobile

### Images
- Alt tag for all images
- Width and height attributes

### Accessibility
- Use label or aria-label for inputs
- Keyboard navigation
- Focus states
~ Screen reader check

### Perfomance
- Checking Services
    - PageSpeed Insights >= 90
    - Lighthouse
    - Test a website's performance - https://www.webpagetest.org/
    - What Does My Site Cost? - https://whatdoesmysitecost.com/
- Rules of thumb
    - Page weight is less than 500 KB
    - Reduce number of requests
    - Minify & concatenate things
    - Lazy load
+ Fonts
    + Use "font-display: swap;"
    + Use .woff/.woff2
    ~ Reduce number of font files
