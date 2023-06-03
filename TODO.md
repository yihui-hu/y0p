## Features

- [x] Ability to add own images
- [x] Ability to add custom text
- [x] Select styling of text (transparent, complementary, reverse)
- [x] Export as static HTML file

## Functionality

- [x] Compose HTML file
- [x] Landscape vs portrait fit / variable scale
- [x] Dropdown menu to choose visibility of text (transparent, complementary, reverse)
- [x] Resize text block based on image ratio to fit on screen
- [x] Loading / done indicator in modal
- [x] Downsize images
- [x] Map each text as its own span
- [x] Attach custom styles to each span corresponding to pixel value
- [x] Get rid of duplicate pixel values

## Documentation
- [x] ```interfaces/index.ts```
- [x] ```utils/*```

## Experimentation

- [ ] State management with [Jōtai](https://jotai.org/)

## Bugs

- [x] Fix loading component (doesn't show when text is entered into input)
- [x] Sliding image scale messes up text with truncation / ellipses

## Would be nice

- [x] 🎉 Do away with Update button and have text + image + options update live  
        - Might have to set delay on text input for better performance, something about ```debouncing```?
- [ ] Gifs support?
- [ ] Slider to adjust padding, position, etc.