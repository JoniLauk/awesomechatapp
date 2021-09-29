import "./App.css";

function App() {
  return (
    <div className="App">
      <form>
        <label>
          Username
          <input type="text" name="name" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
