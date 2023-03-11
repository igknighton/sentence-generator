import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import RandomSentence from "./components/RandomSentence";
import SearchSentences from "./components/SearchSentences";

function App() {
  return (
      <div className="App">
        <header>
          <h3>Random Sentence Generator</h3>
          <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/search'}>Search</Link>
          </nav>
        </header>
        <div className="container">
          <Routes>
            <Route path={'/'} element={<RandomSentence/>}/>
            <Route path={'/search'} element={<SearchSentences/>}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
