"use strict";

const video = document.getElementById("video-preview");
const canvas = document.getElementById("image-preview");
const emptyCanvas = document.getElementById("image-empty-check");
const captureBtn = document.getElementById("capture-btn");
const downloadBtn = document.getElementById("download-btn");

const constraints = {
  audio: true,
  video: true
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    alert("Error occured!");
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
let canvasContext = canvas.getContext("2d");
captureBtn.addEventListener("click", function() {
  canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// download image

downloadBtn.addEventListener("click", function() {
  if (canvas.toDataURL() != emptyCanvas.toDataURL()) {
    // check, if canvas is empty.
    let image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    var link = document.createElement("a");
    link.download = "my-image.png";
    link.href = image;
    link.click();
  } else alert("First click the photo to save it!");
});
