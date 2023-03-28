import './App.css';
import AppRoutes from './AppRoutes';
import Header from './components/common/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}
export default App;
