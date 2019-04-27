PATH := ./node_modules/.bin:$(PATH)

all: clean dist/mac.zip dist/linux.zip dist/windows.zip

clean:
	rm -rf dist

mac: dist/mac.zip
linux: dist/linux.zip
windows: dist/windows.zip

.PHONY: all clean mac linux windows


node_modules:
	npm install

dist/mac:
	mkdir -p dist/mac/

dist/linux:
	mkdir -p dist/linux/

dist/windows:
	mkdir -p dist/windows/


dist/mac/inkscape-svgo: node_modules dist/mac
	pkg src/inkscape-svgo.js --targets node8-osx-x64 --out-path=dist/mac

dist/linux/inkscape-svgo: node_modules dist/linux
	pkg src/inkscape-svgo.js --targets node8-linux-x64 --out-path=dist/linux

dist/windows/inkscape-svgo.exe: node_modules dist/windows
	pkg src/inkscape-svgo.js --targets node8-win-x64 --out-path=dist/windows


dist/mac/inkscape-svgo.inx: dist/mac
	cp inkscape-svgo.inx dist/mac/inkscape-svgo.inx

dist/linux/inkscape-svgo.inx: dist/linux
	cp inkscape-svgo.inx dist/linux/inkscape-svgo.inx

dist/windows/inkscape-svgo.inx: dist/windows
	sed 's/<command reldir="extensions">inkscape-svgo/<command reldir="extensions">inkscape-svgo.exe/g' inkscape-svgo.inx > dist/windows/inkscape-svgo.inx


dist/mac.zip: dist/mac/inkscape-svgo dist/mac/inkscape-svgo.inx
	cd dist/mac && zip ../mac.zip *

dist/linux.zip: dist/linux/inkscape-svgo dist/linux/inkscape-svgo.inx
	cd dist/linux && zip ../linux.zip *

dist/windows.zip: dist/windows/inkscape-svgo.exe dist/windows/inkscape-svgo.inx
	cd dist/windows && zip ../windows.zip *
