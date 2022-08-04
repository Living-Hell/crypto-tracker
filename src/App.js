import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

const useStyles = makeStyles(() =>({

  App: {
    backgroundColor: "#05445e",
    color: "white",
    minHeight: "100vh"
  }

}));

function App() {

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className = {classes.App}>
        <Header />
        <Routes>
          <Route path='/crypto-tracker' element={<Homepage/>} exact/>
          <Route path='/crypto-tracker/coins/:id' element={<CoinPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
