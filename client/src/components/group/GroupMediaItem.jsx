import React from 'react';

function GroupMediaItem({ media }) {
  return media.type === "image" || media.type === "gif" ? (
    <img src={media.src} alt={media.name} />
  ) : media.type === "video" ? (
    <video src={media.src} alt={media.name} controls />
  ) : null
}

export default GroupMediaItem;
