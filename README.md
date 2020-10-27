# Conway's Game of Life

English [简体中文](README.zh.md)

Probably one of the most fantastic but pratical demo of Conway's Game of Life, based on Javascript, Canvas and dat.GUI.

[DEMO](https://futrime.github.io/Game-of-Life/)

Warning: This DEMO is only available out of Mainland China, if you are currently in Mainland China, please refer to [Chinese README](README.zh.md).

#### Description

Conway's Game of Life is a computer game based on a kind of Cellular Automatons invented by the British mathematician John Horton Conway in 1970, and proved Turing complete. It originally appeared in Martin Gordon's "Math Game" column in Scientific American in October 1970. The principle is very simple, that is, there are several cells living on a two-dimensional plane, and its surviving or not at the next moment depends on the existence of cells in the surrounding 8 grids. The specific rules are as follows:

* If 2 cells surrounded, keep the latest status.
* If 3 cells surrounded, the cell comes to live (or keep alive).
* If equals to or less than 1 cell or equals to or more than 4 cells, it dies.

The plane is theoretically infinity, but due to the device restrictions, it can only be large as possible. This repo is a Web program of Conway's Game of Life, based on pure Canvas and dat.GUI.

#### Instructions

* Not interested in configurate the repo manually, you can straighly open [the online DEMO](https://futrime.github.io/Game-of-Life/).

1. Modify the parameters beginning with *const* in `script.js`.
1. Run `index.html`, adjust on the panel top-right.
1. Choose a pattern and place it on the map.

#### Customized Collection HOW TO

Collection is a collection of patterns, which can be loaded when starting this game and placed on the map.

You can follow the instructions in `collection.js` to create your own Collection, and insert it in `index.html` following its guide and modified parameter `collection` in `script.js`.

You can also follow the instructions in `translator.py`, create your own Plaintext files(.cells) and use `translator.py` to transfer it to Collection script.

Please don't try opening `all.js`, it might be too large for your device to handle.

#### Contribution

1.  Fork the repository
2.  Create feature/xxx branch
3.  Commit your code
4.  Create Pull Request
