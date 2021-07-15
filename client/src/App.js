import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar'



function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
