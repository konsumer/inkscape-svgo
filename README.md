# inkscape-svgo

Optimize your SVGs with the awesome [svgo](https://github.com/svg/svgo).

## installation

Grab the latest zip-file for your platform [here](https://github.com/konsumer/inkscape-svgo/releases) and extract it to your plugins directory. On my system, I went to "preferences" and it showed this as "User extensions" under "System":

```
$HOME/Library/Application Support/org.inkscape.Inkscape/inkscape/extensions
```

So, I used that path.

## usage

Find the option `SVGO Optimized SVG File (*.svg)` under File/Save As.

<img src="https://github.com/konsumer/inkscape-svgo/blob/master/screen1.png?raw=true" width="50%" /><img src="https://github.com/konsumer/inkscape-svgo/blob/master/screen2.png?raw=true" width="50%" />


## development

I use [pkg](https://github.com/zeit/pkg) to compile a ready-made runtime so it's a bit easier to install.

Run `make` to build these.