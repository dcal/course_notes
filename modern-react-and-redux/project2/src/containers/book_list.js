import React, {Component} from 'react';
import {selectBook} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import BookDetail from '../containers/book_detail';

class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li 
          key={book.title} 
          className="list-group-item"
          onClick={() => this.props.selectBook(book)}>
          {book.title}
          </li>
      );
    });
  }
  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

// Takes application state as an argument.
function mapStateToProps(state) {
  // Whatever gets returned from here will be 'this.props' inside of our component.
  return {
    books: state.books
  };
}

// Anything returned from this function will end up as props on the BookList container
// This is sort of like passing callbacks.
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({selectBook: selectBook}, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method 'selectBook'. Make it available as a prop.
// Be sure to reference the React-Redux documentation for this.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
