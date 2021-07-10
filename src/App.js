import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp/SignUp';
function App() {
  return (
    <AuthProvider>
      <SignUp/>
    </AuthProvider>
  );
}

export default App;
