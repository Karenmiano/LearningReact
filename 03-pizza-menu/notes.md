JSX - extension of Javascript that allows us to embed JavaScript, CSS and React components into HTML.

Babel eventually converts each JSX element into a React.createElement function call.

JSX is a declarative syntax - tells the page what we want to see based on the current data but not exactly how we want to achieve it.
React renders the components on the DOM.

Components = Data + Logic + Appearance
Modern apps => UI tightly coupled with Logic = Invent JSX

Props are read only because any change to the object will cause a change globally and could lead to side effects.

Functions in react are meant to be pure.
