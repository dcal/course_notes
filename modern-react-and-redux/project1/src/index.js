import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail'
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search'

const API_KEY = 'AIzaSyCeIe_dJZ1vYMrYURhCm7IhoByyhyu93Ok';


// Write the component using arrow function syntax.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('Rick and Morty');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      // this works when key and property are same variable name
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    // this puts a throttle on this function
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

// Put the component on the page
ReactDOM.render(<App />, document.querySelector('.container'));
