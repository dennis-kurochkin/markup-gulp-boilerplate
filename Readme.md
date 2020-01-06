Стартовый шаблон построен на сборщике gulp.
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


Запуск проекта

Перед запуском, обновить компоненты:
ncu    --- проверка обновления компонентов;
ncu -u --- обновление

Установка компонентов:
npm i

Слежение за изменениями:
gulp


Файлы js сторонних библиотек подключаются в gulpfile.js до подключение основных файлов. Стили в vendors/_libs.scss
Основные компоненты, которые приходится устанавливать:

Tabby js - js tabs
https://github.com/cferdinandi/tabby
npm install tabbyjs
'node_modules/tabbyjs/dist/js/tabby.min.js',

imaskjs - input mask
https://github.com/uNmAnNeR/imaskjs
npm install imask
'node_modules/node_modules/imask/dist/imask.min.js',

AIR DATEPICKER - js datepicker
http://t1m0n.name/air-datepicker/docs/index-ru.html
npm i --save air-datepicker
'node_modules/air-datepicker/dist/js/datepicker.min.js',

Ion.RangeSlider - flexible and responsive range slider with skin support
http://ionden.com/a/plugins/ion.rangeSlider/index.html
npm i --save ion-rangeslider
'node_modules/ion-rangeslider/dist/js/ion.rangeSlider.min.js',
'node_modules/ion-rangeslider/dist/css/ion.rangeSlider.min.css',
@import "ion-range";


Сборка растрового спрайта:
gulp sprite
все иконки лежат в папке icons (без префикса icon-). Вставка иконки в scss файле @extend .icon-name;

Сборка векторного спрайта:
gulp svgSpriteBuild
Все иконки лежат в папке icons-svg. Вставка иконки в html файле

<svg class="icon-svg">
    <use xlink:href="images/sprite.svg#name"></use>
</svg>

Для emmet:
svg.icon-svg>use[xlink:href="images/sprite.svg#name"]

(name - название иконки)
Генерируется символьный спрайт, т.е. иконкой можно управлять через font-size и color
При этом вырезаются все внутренние стили svg. Если нужно вставить через фон или иконка имеет несколько цветов, тогда используем миксин @mixin svg-icon, в components/_icons.scss


Сборка для продакшена:
gulp build
Заменить .html подключение сжатых стилей style.min.css



To Do:
* Add More Media Queries