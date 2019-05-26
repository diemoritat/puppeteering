# Scraping the web with Puppeteer

Required:
`node` - at least v10.15.3
`youtube-dl` - to download the videos

## Before starting:

- `youtube-dl` requires [ffmpeg](https://www.ffmpeg.org) or [avconv](https://libav.org/avconv.html) to merge the audio and video files into one. I used **ffmpeg** while doing this, so here's a tiny tutorial on how to use it:

  1. After you download and extract it, open the folder on the terminal and type `./configure` to create the configuration file. If you want to change something, a list of configure options is printed by running `configure --help`.

  2. Then type `make` to build FFmpeg. GNU Make 3.81 or later is required. It will take a while. Go have a coffee and make sure your cat is far from your keyboard.

  3. Type `make install` to install all binaries and libraries you built. Et voilá, c'est finit.

## Steps:

- `npm i` to download all the dependencies (actually, only puppeteer for now). It might take a while because it downloads Chromium too.

- `node index.js react` to run our script with Node. `react` can be any of these framework names: 
  > [`react`, `gatsby`, `angular`, `react-native`, `svelte`, `vue`, `rails`, `flutter`, `express`, `angularjs`, `electron`, `nativescript`]

  The script will generate a `courses` folder containint a `framework-name` subfolder with lots of .txt files that contain the lessons.

- `find . -maxdepth 1 -type d \( ! -name . \) -exec bash -c "cd '{}' && youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]' -o '%(id)s-%(title)s.%(ext)s' -a *.txt" \;` from our `courses` folder to navigate on our subfolders and download all the videos, keeping them into their respective course folder, and with the following name structure: `id`-`lesson-title`.`file-extension`.