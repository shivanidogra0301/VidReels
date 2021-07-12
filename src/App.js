import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
function App() {
  return (
    <AuthProvider>
      {/* <SignUp/> */}
      <Login/>
    </AuthProvider>
  );
}

export default App;
