/*global Vimeo */

document.addEventListener("DOMContentLoaded", function() {
  "use strict";

  var videoBtn = document.querySelector(".header__video-btn"),
    videoPlayer = document.querySelector(".header__video-player"),
    modalBg = document.querySelector(".modal-background"),
    vimeo = new Vimeo.Player(videoPlayer);

  function hideVideo() {
    modalBg.classList.add("modal-background--hide");
    videoPlayer.classList.remove("header__video-player--show");
    vimeo.pause();
  }

  function showVideo() {
    modalBg.classList.remove("modal-background--hide");
    videoPlayer.classList.add("header__video-player--show");
    vimeo.play();
  }

  videoBtn.onclick = showVideo;

  modalBg.onclick = hideVideo;
});
