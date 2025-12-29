import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Tailwind is Working!
        </h1>
      </div>
    </Router>
  );
}

export default App;