#!/bin/bash
sudo apt install lcdf-typetools
otfinfo -u LinZi-1.otf > _glyphs.txt
node _generate_page.js
