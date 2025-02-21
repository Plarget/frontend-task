import Loading from "./components/loading";
import ViewerComponent from "./components/viewer-component";
import TreeWidget from "./components/TreeWidget";
import "./styles";

function App() {
  return (
    <>
      <ViewerComponent>
        <Loading />
        <TreeWidget />
      </ViewerComponent>
    </>
  );
}

export default App;
