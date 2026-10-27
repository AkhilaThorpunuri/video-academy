
export function playVideo(video, playerElement) {
  // Accept standard 11-character YouTube video IDs.
  if (!/^[a-zA-Z0-9_-]{11}$/.test(video.youtubeId)) {
    throw new Error("Invalid YouTube video ID.");
  }

  playerElement.innerHTML = "";

  const iframe = document.createElement("iframe");

  iframe.src =
    `https://www.youtube-nocookie.com/embed/${video.youtubeId}`;

  iframe.title = video.title;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; " +
    "encrypted-media; gyroscope; picture-in-picture; web-share";

  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  playerElement.appendChild(iframe);
}
