import './App.css';
import Nav from '../Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Discover from '../Discover/Discover';
import Collections from '../Collections/Collections';
import Journal from '../Journal/Journal';
import EmptyState from '../EmptyState/EmptyState';

function App() {
  return (
    <>
      <Nav />
      <main className="App">
        <Routes>
          <Route path="/" />
          <Route path="/journal" element={<Journal />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="*" element={<EmptyState />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
