# Scraping the web with Puppeteer

Required:
- `node` - at least v10.15.3

- `youtube-dl` - to download the videos

## Before starting

- `youtube-dl` requires [ffmpeg](https://www.ffmpeg.org) or [avconv](https://libav.org/avconv.html) to merge the audio and video files into one. I used **ffmpeg** while doing this, so here's a tiny tutorial on how to use it:

  1. After you download and extract it, open the folder on the terminal and type `./configure` to create the configuration file. If you want to change something, a list of configure options is printed by running `configure --help`.

  2. Then type `make` to build FFmpeg. GNU Make 3.81 or later is required. It will take a while. Go have a coffee and make sure your cat is far from your keyboard.

  3. Type `make install` to install all binaries and libraries you built. Et voilá, c'est finit.

## Steps

Run these on your command line:

- `npm i` to download all the dependencies (actually, only puppeteer for now). It might take a while because it downloads Chromium too.

- `node index.js category topic` to run our script with Node. The `category` is the type of the course you want to download and the `topic` is... the topic. :) This is the list of possible categories and topics (the array name is the category, and the items are the topics inside that category):

```js
{
  "frameworks": ["react", "gatsby", "angular", "react-native", "svelte", "vue", "rails", "flutter", "express", "angularjs", "nativescript", "electron", "cycle", "hapi", "ember", "asp-net", "jekyll"]
  "libraries":  ["greensock", "postgres", "rxjs", "redux", "redux-observable", "ramda", "ionic", "node", "apollo", "jest", "next", "mobx", "flow", "react-router", "jq", "ngrx-store", "nuxt", "puppeteer", "recompose", "tailwind", "webgl", "d3", "angular-material", "loopback", "immutable", "natural", "mocha", "polymer", "lodash", "protractor", "twit", "sequelize", "jasmine", "xray", "mongoose", "leaflet", "reactfire", "nightmare", "pm2", "most", "tweenmax", "jquery", "riot", "glamorous", "reflux", "radium", "chai", "requirejs", "p5", "angularfire", "tweenlite", "nwjs", "aphrodite", "canvas", "glmatrix", "flux", "xstream", "realm", "axios", "tachyons", "neo4j"]
  "tools": ["graphql", "git", "figma", "aws", "chrome-devtools", "react-storybook", "eslint", "cypress", "docker", "flexbox", "webpack", "npm", "jwt", "vim", "http", "grep", "svgo", "tmux", "openapi", "nginx", "zeit-now", "flux-architecture", "aria", "gulp", "scikit-learn", "webstorm", "yarn", "babel", "netlify", "grunt", "karma", "angular-cli", "browserify", "edge", "bower", "jspm", "screen-reader", "nvda"]
  "languages": ["javascript", "css", "bash", "typescript", "dart", "html", "scss", "python", "elm", "reason", "rust", "purescript", "ruby", "elixir", "clojurescript", "clojure"]
  "platforms": ["mac", "algolia", "node", "chrome", "ios", "github", "android", "egghead", "elasticsearch", "mongodb", "firebase", "linux", "microsoft", "firefox", "particle", "safari"]
}
```

  The script will generate a `courses` folder containing a `framework-name` subfolder with lots of .txt files with the links for all the lessons.
  
- `cd` into the `courses/framework-name` folder.

- `find . -maxdepth 1 -type d \( ! -name . \) -exec bash -c "cd '{}' && youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]' -o '%(id)s-%(title)s.%(ext)s' -a *.txt" \;` **within our `courses/framework-name` folder** to navigate on our subfolders and download all the videos, keeping them into their respective course folder, and with the following name structure: `id`-`lesson-title`.`file-extension`.
