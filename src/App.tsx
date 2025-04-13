import LayoutProvider from "./components/LayoutProvider";
import Home from "./pages/Home";

function App(): JSX.Element {
  return (
    <LayoutProvider>
      <Home />
    </LayoutProvider>
  );
}

export default App;