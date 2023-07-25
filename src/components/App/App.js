import './App.css';
import Nav from '../Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Discover from '../Discover/Discover';
import Collections from '../Collections/Collections';
import Journal from '../Journal/Journal';
import EmptyState from '../EmptyState/EmptyState';
import Search from '../Search/Search'
import Results from '../Results/Results'
import Album from '../Album/Album'

function App() {
  return (
    <>
      <Nav />
      <Search/>
      <main className="App">
        <Routes>
          <Route path="/" />
          <Route path="/journal" element={<Journal />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/discover" element={<Discover />} />
          <Route path='/search/:query/:page' element={<Results/>}/>
          <Route path='/albums/:id' element={<Album/>}/>
          <Route path="*" element={<EmptyState />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
