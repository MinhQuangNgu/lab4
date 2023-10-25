import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {router} from './router/index';
function App() {
  return (
    <Router>
      <Routes>
          {router?.map((item,index) => {
            const Page = item?.element;
            return <Route key={index} path={item?.path} element={<Page />} />
          })}
      </Routes>
    </Router>
  );
}

export default App;
