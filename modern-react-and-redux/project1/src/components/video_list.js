import React from 'react';
import VideoListItem from './video_list_item'

const VideoList = (props) => {

  const videoItems = props.videos.map(
        (video) => {
          // supply a unique key so react can update individual list item
          return <VideoListItem 
            onVideoSelect={props.onVideoSelect}
            key={video.etag} 
            video={video} 
            />
        });

  return(
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );

}

export default VideoList;
