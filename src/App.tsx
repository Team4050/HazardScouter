import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <div>
              <h1>Hello World!</h1>
              <Link to="/test">TEST</Link>
            </div>
          }
        />
        <Route
          path="/test"
          element={
            <div>
              <h1>Test!</h1>
              <Link to="/">HOME</Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
