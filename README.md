# pixel_to_svg_lines
creating SVG lines from an image

This repository contains a script that converts an image into an SVG file using lines and Bezier curves.
Getting Started

To use this script, simply include it in your HTML file and add an HTML canvas element with an ID of "canvas" and an SVG container with an ID of "svg-container".

html

<!DOCTYPE html>
<html>
  <head>
    <title>Image to SVG</title>
  </head>
  <body>
    <canvas id="canvas"></canvas>
    <svg id="svg-container"></svg>

    <script src="image-to-svg.js"></script>
  </body>
</html>

Usage

The script loads an image and converts it into a series of lines and Bezier curves in an SVG file. The SVG file is displayed in the SVG container.

javascript

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './public/portraitW.jpg';
img.onload = function () {
  // ...
}

Customization

The number of lines and the spacing between lines can be customized by changing the numLines and lineSpacing variables.

javascript

const lineSpacing = 2; // Spacing between lines
const numLines = 50; // Number of lines

The parameters of the Bezier curves for black and white pixels can be customized by changing the bezierParams object.

javascript

const bezierParams = {
  black: { dx1: -2, dy1: 1, dx2: -2, dy2: -20 },
  white: { dx1: 0, dy1: 0, dx2: 0, dy2: 0 }
}; // Bezier curve parameters for black and white pixels

Authors

This script was created by Raphael Dettori.
