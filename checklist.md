# Front-end Checklist

## HTML
- Theme color
- W3C compliant
- Pages & Elements
    - 404
    - 5xx
    - Form validation errors
    - Success message
    - Failure Message
- Semantics
- Adblocker test
- Noopener (target="_blank" && rel="noopener")
    ^ Noopener: In case you are using external links with target="_blank", your link should have a rel="noopener" attribute to prevent tab nabbing. If you need to support older versions of Firefox, use rel="noopener noreferrer"
- Микроразметка
    - контакты (для каждого сайта на всех страницах должны быть указаны контакты, название компании, время работы)
    - товары (для интернет-магазинов)
    - хлебные крошки
    - отзывы

## CSS
- Print version
- Stylelint
- Browser Compability
    ~ Desktop
    ~ Mobile

## Images
- Alt tag for all images
- Width and height attributes

## Accessibility
- Use label or aria-label for inputs
- Keyboard navigation
- Focus states
~ Screen reader check

## Perfomance
- Page weight is less than 500 KB
- Google Page Speed >= 90