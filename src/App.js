import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute'
import Main from './Components/Main/Main';
function App() {
  return (
    <Router>
        <AuthProvider>
          <Switch>
            {/* check before going to home page check that user is logged in */}
            <PrivateRoute path = '/' exact component={Main}/>
            <Route path = '/login'  component={Login}/>
            <Route path = '/signup'  component={SignUp}/>

          </Switch>
        </AuthProvider>
    </Router>
    
  );
}

export default App;
