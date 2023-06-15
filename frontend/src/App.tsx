import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './presentation/screens/Home';
import Dashboard from './presentation/screens/Dashboard';
import MaterialData from './presentation/components/MaterialData';
import MaterialInventory from './presentation/components/MaterialInventory';
import MaterialOperations from './presentation/components/MaterialOperations';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} > 
        <Route path='material' element={<MaterialData/>} />
        <Route path='inventory' element={<MaterialInventory/>} />
        <Route path='operation' element={<MaterialOperations/>} />
      </Route>
    </Routes>
  </Router>
  )
}

export default App
