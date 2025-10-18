import React, { useState } from "react";

export default function YouTubePlaylistPlayButton({embedUrl = "https://open.spotify.com/embed/playlist/0AmLRKyJ6FJConcteHjecR?utm_source=generator",
height = 400,width = 400
}) {

  return (
<div className="">
<iframe
data-testid="embed-iframe"
style={{ borderRadius: 12 }}
src={embedUrl}
// width="100%"
height={height}
width={width}
frameBorder="0"
allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
loading="lazy"
allowFullScreen
title="Spotify Playlist"
/>
</div>
);
}
