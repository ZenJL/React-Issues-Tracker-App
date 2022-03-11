import './App.css';

//// Layout
import MainLayout from 'layout/MainLayout';

//// Components
import Issue from 'features/Issue/Issue';

function App() {
  return (
    <MainLayout>
      <Issue />
    </MainLayout>
  );
}

export default App;
