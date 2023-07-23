import './App.css';
import Nav from './components/Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Discover from './components/Discover/Discover';
import Collections from './components/Collections/Collections';
import Journal from './components/Journal/Journal';
import EmptyState from './components/EmptyState/EmptyState';

function App() {
  return (
    <>
      <h1>SOUND STASH</h1>
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
