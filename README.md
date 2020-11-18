# Album Cover Mosaic Generator

## TODO

### Mosaic

- Add option that balance rows vs columns 
    (e.g. 10,10 -> sqrt(20).ceil() -> 5,5,5,5) 
    (e.g. 15,15 -> 6,6,6,6,6)
    (e.g. 15,1 -> 4,4,4,4)
    (e.g. 15,3 -> 5,5,5,3)
    numberOfColumns = sqrt(total of covers).ceil()
    Or maybe having options for cover size and layout and let user handle this. `--layout 4x5 --cover-size 200`
- Center with margin as option instead of by default
- Add option that scales down covers instead of truncating list
- Add support for multiple lists 
- Add option: limit cover nb (useful with --scale-to-fit)
- Add option: fill empty tiles with random covers / repeat from start
- Add option: ordering and shuffling
- Add custom processor script (usage through eval())
- Add tiling effects (shadow, inner white glow, radius) maybe as a processor script
- Add caching by source/resource/id number

### Sources

- Spotify
    - playlists
    - Artist albums
- local files (`--cover-size` would be required)
    - `-i path/to/file-full-of-image-urls.txt` (http urls too?)
    - `-i path/to/folder-containing-images`

### Code Quality

- Unit tests
- Make my own eslint and tsconfig configs
- Use a logger
- Extract process.env as interface
- Separate in multiple packages (core, cli, ...)
- Add a tsconfig path alias @new-repo-name/package-name
- Give a try to fp-ts

### UX

- Documentation
- Examples along with their config file
- Generate from config file (TOML). Same options. `mos my-mosaic.toml`
    - cmd line options override file ones
    - Options like `-o` and `-i` (not implemented yet) would be relative to the config
      file (if paths are not absolute) 
- Make executable for global install

### Others

- Rename repo
- output file in the cli layer
- .env
