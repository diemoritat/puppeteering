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
  "frameworks": ["React", "Gatsby", "Angular", "React Native", "svelte", "Vue.js", "Ruby on Rails", "Flutter", "Express", "AngularJS", "NativeScript", "Electron", "Cycle.js", "hapi.js", "Ember.js", "ASP.NET", "Jekyll"]
  "libraries":  ["GreenSock", "PostgreSQL", "RxJS", "Redux", "redux-observable", "Ramda", "Ionic", "Node.js", "Apollo", "Jest", "Next.js", "MobX", "Flow", "React Router", "jq", "@ngrx/store", "Nuxt.js", "Puppeteer", "Recompose", "Tailwind", "WebGL", "D3", "Angular Material", "Loopback", "Immutable.js", "Natural", "Mocha", "Polymer", "Lodash", "Protractor", "twit", "Sequelize", "Jasmine", "X-ray", "Mongoose", "Leaflet", "ReactFire", "Nightmare", "PM2", "Most.js", "TweenMax", "jQuery", "Riot.js", "glamorous", "RefluxJS", "Radium", "Chai", "RequireJS", "p5.js", "AngularFire", "TweenLite", "NW.js", "Aphrodite", "Canvas", "glMatrix", "flux", "xstream", "Realm", "axios", "Tachyons", "Neo4j"]
  "tools": ["GraphQL", "git", "Figma", "AWS", "Chrome DevTools", "React Storybook", "ESLint", "Cypress", "Docker", "Flexbox", "webpack", "npm", "JWT", "Vim", "HTTP", "grep", "SVG", "tmux", "OpenAPI", "NGINX", "now", "Flux", "ARIA", "Gulp", "Scikit-Learn", "WebStorm", "Yarn", "Babel", "Netlify", "Grunt", "Karma", "Angular CLI", "Browserify", "Edge", "Bower", "jspm", "Screen Reader", "NVDA"]
  "languages": ["JavaScript", "CSS", "Bash", "TypeScript", "Dart", "HTML 5", "SCSS", "python", "Elm", "Reason", "Rust", "PureScript", "Ruby", "Elixir", "ClojureScript", "Clojure"]
  "platforms": ["mac", "Algolia", "Node.js", "Chrome", "iOS", "GitHub", "Android", "egghead", "elasticsearch", "mongodb", "firebase", "linux", "Microsoft", "Firefox", "Particle", "safari"]
}
```

  The script will generate a `courses` folder containing a `framework-name` subfolder with lots of .txt files with the links for all the lessons.
  
- `cd` into the `courses/framework-name` folder.

- `find . -maxdepth 1 -type d \( ! -name . \) -exec bash -c "cd '{}' && youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]' -o '%(id)s-%(title)s.%(ext)s' -a *.txt" \;` **within our `courses/framework-name` folder** to navigate on our subfolders and download all the videos, keeping them into their respective course folder, and with the following name structure: `id`-`lesson-title`.`file-extension`.
