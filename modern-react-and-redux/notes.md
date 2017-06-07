# Modern React + Redux
## Rules
1. Don't have conversations while taking this class - in Adium, Slack, Facebook, etc.
2. Make notes on how to improve your nvim config. Only stop to fix it if it's critical.

## Intro
Webpack and babel transpile JSX + ES6 into something browsers can run (vanilla javascript and html), since browsers can't run JS2016 yet.
They transpile all the files into bundle.js.


## 6—11: Build First Component
A Component is Javascript that renders HTML

`const` is ES6 syntax. It declares a constant (variable that cannot be changed).

JSX is a subset of javascript that allows us to write what "looks" like html, but it's actually javascript.

Core React knows how to build components relative to each other. ReactDOM knows how to push rendered React code into the DOM.

### About Components
The component function()
```
const App = function(){
  return <div>Hi!</div>; // this is JSX!!!!
}
```
Is a component, not an _instance_ of a component.
Using <div> inside of jsx means, render an instance of the "div" component class.
"App" is a class. If we want an instance of "App", we need to tell JSX to give us an instance of it:

```
<App />
```

## 12—16: Rendering Targets

ALWAYS ONE COMPONENT PER FILE

### Functional vs. Class-based components
Functional components encapsulate isoalted functionality.

A class component is a javascript class - it has methods and state.
You can add react component functionality to it by extending React.component:


```
class SearchBar extends React.component {}
```

Every class component must return something from a render() method.
In general, start with a functional component and then refactor it to a class component as you get farther along.


### Event Handlers
These can be written as separate methods inside the component class or they can be written with arrow syntax inside the event on the element (see ReduxSimpleStarter/components/search_bar.js).

## 18-20: Stateful Components
State is a plain javascript object that is used to record and react to user events. Whenever a component state is changed, the component re-renders and forces its child components to re-render as well.

Functional components do not have state.

We set the state to a pojo inside the classes constructor method.
The following initializes state in a class-based component.
You have to call super with the props when you extend Component.

```
constructor(props) {
  super(props);
  this.state = { key: '' }
}
```

Only inside of the constructor do we use "this.state = blah blah blah". From then on, we  use "this.setState".

You need to inform React of state changes.

### Controlled Componenets
Two ways to set the state - the element can change the state, or the state can change the element.
Ideally, the state should tell the element what it should be. This is a controlled component.
This allows us to do things like set starting values. It also guarantees that "this.state.term"

The logic flows thusly:
1. User interacts with component
2. Component updates state
3. Component re-renders
4. Component displays new state.

Refresher: Class based are required when we need state around a component. Functional components are for static jsx.

## 21-28: Downward Data Flow
The uppermost parent component that cares about data should be responsible for fetching the data used by its child componenets. 

Data passed from parent to child components is called passing 'props.'

In a class component, 'props' is available as `this.props` inside the class. In a const (functional) component, it is an argument passed into the function.

When rendering an array, you need to pass a unique "key" to identify each array item. The key gets passed in as a property:

```
const videoItems = props.videos.map((video) => {
  return <VideoListItem key={video.etag} video={video} />
});
```

> ES6 syntax hint: putting a paramater for a function in curly braces looks for that property on the object inside the parameter passed to the function and sets it to a constant.

Below, the parameter is 'props' with a 'props.video' property. ({video}) pulls the video property and makes it available inside the function scope:

```
const VideoListItem = ({video}) => {
  console.log(video);
};
```

This also works with setting state on the parent component.

BEFORE starting a new component, ask yourself, 'will this need to maintain state?'

> I'm noticing that when this starts to get confusing, I need to remember one thing: React re-renders the DOM when the state is changed. The event handlers, everything, are usually simply changing the state, which causes things to re-render in the appropriate way. When asking if something cares about state, you are really asking if it needs to ever re-render itself or something inside itself. On that note, the `render()` function is what React looks for in a component to know how to re-render it. You can plug other stuff onto the component, but it needs to call `render()` in order for React to use it.

## 29-30 Styling with CSS
It's good practice to give your top-level component a className that corresponds with your component name. That way you can have multiple CSS files that are named for the components they affect.

## 31-? More callbacks

## Wrapping Up React
Class vs. functional components - Class based components need to worry about state. Functional components only display things.

Gotcha: In a class constructor, `this.state = X`, vs anywhere else in the class `this.setState()`.

In basic React, state is a component-level thing. In Redux, it's an application-level state.

## REDUX
### Introduction
A predictable state container for Javascript applications. WTF does this mean????

At a basic level, we need to imagine that an application is separated into data and views to display the data. What Redux as a state container means is ALL the data that describes the app...not just the static data, but the metadata such as which X is selected, etc.

In Redux, all the applications data is centralized in a single object: the `STATE`

### REDUCERS
A reducer is a function that returns a piece of the application state. They are solely concerned about the value of the state. They are matched by key-value pairs typically. Key of state (key), value of state (reducer).

Reducers are a two-step process: creating the function, and wiring it up to the application so that the views can use them. Redux and React are two separate entities - you connect them with React-redux library.

### Containers
A container is a React component that has a direct connection to the state managed by Redux. Containers are what we can inject the state into from Redux (smart vs. dumb components).

> When to use a container? In general, we want the most parent component that cares about a particular piece of state to be a container. In turn, only the most parent component related to a piece of state needs to be connected to Redux. The component __becomes__ a container when it gets connected to Redux.


Whenever our application state changes, our container will re-render instantly with the new state.

Also, whenever the application state changes, the object in the mapStateToProps function will be passed as props to the component.

> GOTCHA: When importing files and/or libraries, be careful about when to use `import {object} from 'library'` as opposed to no curly braces. If you use curly braces, you are importing a SPECIFIC, SINGLE, BY-NAME export from the file. By using no curly braces, you are assigning the default export of the file to a constant. This has ended up being the issue a couple of times when the app didn't seem to be working.

### Action Creators
Action creators are functions return an object. That object is automatically sent to all the reducers in the application. Reducers can choose depending on the action, to return a different piece of state, depending on what the action is. The new piece of state gets merged into the application state, which gets sent to the components.

A reducer doens't have to care about an action - it can return the current state.

Action creator creates an action > Action flows through the reducers > Reducers return altered state > State flows through components.

Actions usually have two values; a TYPE and a payload. The TYPE describes the purpose of the action. It doesn't always have a payload, but the TYPE is mandatory.

Types are usually pulled out into a separate file.

Application state and component state are totally separate. Components could still have their own state.

## MORE COMPLEXITY WITH REDUX

- Integrate third party components into our app
- Our react components will make no ajax requests - all that will be done byredux
- How to deal with significant state changes


_When making a component, ask yourself if it needs to talk to Redux / care about state_

Declartive vs. imperative: Boils down to hiding implementation.

"This" will have the incorrect context in a callback within a React component. It will be some mystery context. To use a callback in this fashion, you have to bind `this` (the component) to the callback:

```
   constructor(props) {
    super(props);
    this.state = { term: '' };

    // Bind the component's "this" to the onInputChange method, then overwrite the onInputChange method with the bound context
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    // The value of "this" is not the react component.
    this.setState({term: event.target.value})
  }
 
```

As a general rule, you need to bind the context when you are passing around a callback with a reference to "this."

Event.preventDefault() stops the natural action of the event from occurring. In the case of a form submission, it will prevent the browser from posting the web form and re-rendering the page.

### AJAX

#### Middlwares
Middlewares in Redux are functions that take an action and execute some task on it before it reaches a reducer.

REDUX-PROMISE looks specifically at the payload property. If it's a promise, it stops the action entirely, and then it dispatches a new action of the same type, but with a payload of the resolved request. It unwraps the promise for us.

### Redux State Mutations
We always need to return NEW state, not a modified version of the original state. NEVER manipulate the state and return it.

Old way:
```
return state.concat( action.payload.data )
```
ES6 way (destructuring):
```
return [ action.payload.data, ...state ]
```

### Container vs. Component, Class vs. Functional
When would you use a contianer vs a component? When the React component is the topmost component that cares about state, it should be a container. A container can then pass data into components that don't care about state.
What does it mean to "not care about state?" It probably refers to components that render multiple times with different data - they can have their data passed to them by their parent component, they don't need Redux to manage it for them.
When choosing between a class component and a functional component, the rule is, if you can use a functional component, DO. Class components are for managing COMPONENT state, not application state. An example of this in pracice is managing an input field, for example. Its state is dependent on what the user is doing at a given moment within the field. That data should be part of a component state, not a global redux state.

## 68 - ??? ROUTING, FORMS, MORE COOL STUFFS

We care a ton about the HISTORY of the url bar. There is a package that sits in front of React Router called "History" that keeps track of where you are and where you have been - it passes URL chagnes to React Router. 

React Router then changes the components of the application based on the URL. It makes the user *think* they are navigating to a new webpage, but what it is really doing is rendering a different set of components.

To hand responsibility to the router, we replace our "app" instance with React Router.

In the following code, `browserHistory` tells react router which part of the URL to care about. It is not the same as the History object that tracks browser URL, it is concerned with which part of the URL to care about. `browserHistory` keeps track of everything beyond the base URL.

```
....

import {Router, browserHistory} from 'react-router';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}
  </Provider>
  , document.querySelector('.container'));
```

The Route object maps routes to components.

### Nesting Routes
`App` needs to render its children. When we nest routes as in the code example below, we are creating a parent/child relationship between App and the components inside the base route:

```
const Greeting = () => {
  return (
    <div>Hey there!</div>
  );
}

export default (
  <Route path="/" component={App}>
    <Route path="greet" component={Greeting} />
    <Route path="greet2" component={Greeting} />
    <Route path="greet3" component={Greeting} />
  </Route>
);
```

We need to tell App to render its child components. The child compnents get passed to App by Router as `props.children`. So to render them, we do: 

```
export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}   
```

`IndexRoute` is a helper that behaves like a route...but it will be shown whenever the URL matches up with the path defined by the parent, but not the children. If the route only matches the parent, show this component.

### Lifecycle Methods
Lifecycle methods are methods in a component class that are automatically called by React.

`componentWillMount` is a lifecycle method that is only called once: when the component mounts for the first time, not on subsequent re-renders.

*Tidbit: methods on a class don't have the `function` keyword.*

### Link components
These provide links between your different routes in Redux.

### Redux-Form
Handles all the forms and form elements. You register it and then link the form to redux-form.

*Tidbit: When importing you can alias: import { member as alias } from 'module-name';*

The `reduxForm` function is nearly identical to the `connect` function of react-router.
In prior examples, we held the form data on the component state. Redux-form takes it to the application level.

The "Form" name here is critical, we linked it in the Store
```
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content']
})(PostsNew);
```
The state will look something like this:

```
state === {
  form: {
    PostsNewForm: {
      title: '----',
      categories: '----'
      content: '----'
    }
  }
}
```

You also get a `handleSubmit` function attached to `this.props`. `handleSubmit()` gets called when the form is submitted, and it passes the form props into whatever method you supply as the handleSubmit callback.

```
const { fields: {title, categories, content}, handleSubmit } = this.props;
```
The above snipped is the ES6 syntax shorthand for assigning variables. I get title, categories, content and handleSubmit from this, not a "fields".

These variables automatically have handlers for "onClick", "onBlur", etc. Completely manages the form as along as we pass the whole configuration into the input tags, via this syntax:
```
<input type="text" className="form-control" {...title} />

```
This means we want to destructure the object into the input tag. It's effectively applying all those properties individually to the input object. It's the same thing as individually applying them: 
```
<input type="text" className="form-control" onClick={title.onClick}... />
```

#### Validation
As in all things redux-form, it matches properties in your validation function to your form fields. If we return a propery in the errors object with a truthy value, the field will be considered valid or invalid depending on the value.

An invalid form will not be submitted.



_HOMEWORK: FIND OUT WHAT `connect()` IS ACTUALLY DOING._
_HOMEWORK: LEARN JSX's HTML SYNTAX_


### Context (lecture 89)
Context does not have to be passed deliberately from parent to child like props. You should avoid using context as much as possible. Specifically, only use with react-router. The context API is changing in React quite a bit.

Context can give you access to the router, which you can then use inside your components.
React interprets this whenever the component class is newly created.
It backs up all the way the ancestor chain until it finds a context property called "router" and assigns it to `this.context.router` inside of our our component.

```
  static contextTypes = {
    router: PropTypes.object
  };
```
[React documentation](https://facebook.github.io/react/docs/context.html)

### Route Parameters
If you define a route with a ":id", the following string will be passed to the component as "this.props.params.id". Obviously this will work with any text and multiple url parameters.

Not all actions require a reducer. Even so, it's a good idea to implement an action type and a no-op reducer in order to make the app consistent.

## REDUX-THUNK
Redux Thunk allows us to return a plain javascript function in our action creators. The function takes a "dispatch" parameter, and if it contains that dispatch, it will be sent off to all the reducers.

Dispatch is the first argument to the function you provide. Redux Thunk puts you in charge of when to invoke dispatch, rather than automatically invoking it when you call an action creator.

## Firebase
_HOMEWORK: CHECK THIS OUT MORE_
Firebase seems like a database that automatically pushes change events through the connector. This would typically change state and be incompatible with Redux, since Redux only wants to change state as the result of an action. However, by embedding Firebase connection inside function that then calls dispatch (via Redux Thunk) we can catch the push from Firebase and feed it through the typical Redux reducer channel.

## Reselect (Lecture 100)
Use this when you have to derive a calculated state from multiple pieces of state.
Reselect selector takes in pieces of state, does some combinations and then spits out a derived state. Essentially, if you want to combine two sets of data to display in a single context.
For example, if you have a list of IDs in one state object, and a corresponding list of objects that those id's represent, and you want to filter objects by the id's.
Whatever gets returned by the selector you can map to props (mapStateToProps).
Make a separate folder called "selectors" for these.

## Data Loading Methods
In this section, he argues that putting calls to action creators in componentWillMount is a bad practice, because then you can't reuse the component without it automatically loading data. Programs inflexibility into the system.
Instead, use React-Router's onEnter callback to call an action creator when a route is called rather than when a component is called.
