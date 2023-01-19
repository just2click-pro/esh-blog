# Dror Avidov esh-blog Home Assignment

## Description

This is a React based project that mimics the original [esh.com](http://esh.com) website

- This is a home assignment I've received.
- It includes alsmost all of the animations used in the original website
- It includes support for both English and Hebrew languages - also switching directions when needed
- It uses a .json file as it's "databse" for the content of the blog posts (which were copied both in English and in Hebrew)
- During development I used the .json file running it with ```json-server```

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This is a standard React Porject
In order to install it, you need to:
* Pull this repository
* Browse into the project folder and run `yarn`
* Then run `yarn start`
* You may need to install `json-server` first, do that by running: `npm install -g json-server`
* Open another terminal and and run `json-server --watch blogDB.json --port 3004`
* I have included the `.env` file although it is not recommended

## Usage

As requested, this project contains three pages:
* Home page - with some animations and a navigation bar
* Blog page - with the current posts that are available from the "database"
* Post page - that displays the current post only and is styled accordingly

## Notes

* I used the 'Monserrat' font as the original font 'Piloni' isn't a free font
* I didn't follow the animations to the exact same accuracy as the original
* I used React MUI library to style the website - due to the short time I was given I did't fully used feeatures like theming
* I used `useReducer` hook and state to handle both language changes (so I can swith directions) and for the current path (so I can control the different color schemes between the Home page and the rest of the pages)
* I used React `useContext` feature to wrap te app and "listen" to the state changes
* I treid to do something similar (using a context) in order to have one data featching module but since it got too buggy I'm just fetching data as needed using `axios`

## Credits

I've developed this project by myself. It took me about 12 hours all-in-all. I'm aware of the assignments reauirements but wht I did is first built some infrastructure components and spent much less time doing the actual styling and fine tunning for the 'esh-blog'
## License

[MIT License](https://choosealicense.com/licenses/mit/).
