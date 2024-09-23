import { useReducer } from "react";

const initialState = {
  count: 0,
  hasTooMany: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "incr":
      return {
        count: (state.count += 1),
        hasTooMany: state.count > 3 && true,
      };
    default:
      throw new Error();
  }
}

export default function Render() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Render");

  return <button onClick={() => dispatch({ type: "incr" })}>Click</button>;
}
