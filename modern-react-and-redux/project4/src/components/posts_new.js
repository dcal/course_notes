import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  'title': {
    'type': 'input',
    'label': 'Title'
  },
  'categories': {
    'type': 'input',
    'label': 'Categories'
  },
  'content': {
    'type': 'textarea',
    'label': 'Content'
  }
}

class PostsNew extends Component {

  inDanger(field){
    return field.touched && field.invalid ? 'has-danger' :''
  }

  // React interprets this whenever a new PostsNew is created.
  // It backs up all the way the ancestor chain until it finds a context property called "router"
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() =>{
        //blog post created, navigate user to index
        this.context.router.push("/")
      });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];
    return(
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} key={fieldConfig.label}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="form-control-feedback">
          { fieldHelper.touched ? fieldHelper.error : '' }
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        {_.map(FIELDS, this.renderField.bind(this))}

        <button type="submit" className="btn btn-primary"> Submit </button>
        <Link to="/" className="btn btn-danger"> Cancel </Link>
      </form>
    );
  };
}

function validate(values) {
  const errors = {};
  _.each(FIELDS, (conf, field) => {
    if (!values[field]){
      errors[field] = `please enter a ${field}`;
    }

  });
  return errors;
}

// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm 1st config, 2nd mapStateToProps, 3rd mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, { createPost })(PostsNew);
