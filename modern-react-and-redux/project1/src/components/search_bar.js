// Same thing as const Component = React.component
import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }
  // the user typing something doesn't change the input value, 
  // it triggers a state change which re-renders with a new input value
  render() {
    // good practice to give your top-level component a className that corresponds with your component name
    return (
      <div className="search-bar">
        <input onChange={ event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;
