# yop

A small, silly experiment in text highlighting, recreation of [https://fichtre.net/yop.html](https://fichtre.net/yop.html).  
Font in use is the unlicensed, trial version of [Pantasia](https://counter-forms.com/typefaces/pantasia) by [Wei Huang](https://weiweihuanghuang.github.io/).

## Usage

- Visit the [website](https://y0p.vercel.app) and highlight the sample text to reveal the source image. 
- Alternatively, you can provide your own and play around with the text styling / scale of text and image, and subsequently download the entire page as a standalone HTML page, with its own internal CSS stylesheet.

## Development

```bash
# clone project
git clone https://github.com/yihui-hu/yop
cd yop

# install dependencies
npm install

# run project
npm run dev
```

## Resources

1. [Importing text file](https://stackoverflow.com/questions/50539756/how-to-import-a-txt-file-from-my-source)
2. [Parsing params with onChange event](https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event)
3. [Passing functions as props in React + TypeScript](https://stackoverflow.com/questions/68895112/how-to-pass-function-as-a-prop-in-react-typescript)
4. [Client components and ```"use client"``` directive in Next.js](https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp)
5. [Showing leading and trailing whitespace in HTML](https://stackoverflow.com/questions/38051561/show-white-space-at-the-beginning-of-a-text-in-html)
6. [Converting callbacks to promises](https://zellwk.com/blog/converting-callbacks-to-promises/)
7. [Using async functions within useEffect](https://devtrium.com/posts/async-functions-useeffect)
8. [Destructuring first few items from an array](https://www.freecodecamp.org/news/how-to-destructure-an-array-in-javascript/)
9. [Customizing file upload button / ```<input type="file" />```](https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8)
10. [How and when to debounce / throttle](https://blog.logrocket.com/how-and-when-to-debounce-or-throttle-in-react/)
    - *Debouncing* – delaying the first process for a given amount of time to see if user performs another action; if they do, cancel first action and work on second one
    - *Throttling* – preventing second process from happening by making sure function can only run once in a given interval
11. [Lodash debouncing with text input](https://stackoverflow.com/questions/36294134/lodash-debounce-with-react-input)