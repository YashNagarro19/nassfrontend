import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import DisplayQuestions from './components/DisplayQuestion';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import ClientDetails from './components/clientDetails';

function App() {

  return (
    <div>
    {/* <Navbar title = "Text Utils" aboutText = "About Text"></Navbar> */}
    {/* <Login></Login> */}

    <Router>
      <Routes>
      <Route path="/" element={< Login />} />
      <Route path="/displayQuestions" element={<DisplayQuestions/>}/>
      <Route path="/clientdetails" element={<ClientDetails/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;