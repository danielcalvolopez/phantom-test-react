import classes from "./App.module.css";
import UrlList from "./components/UrlList/UrlList";
import AddUrl from "./components/AddUrl/AddUrl";
import UrlContextProvider from "./context/UrlContext";

const App = () => {
  return (
    <UrlContextProvider>
      <div className={classes.container}>
        <AddUrl />
        <UrlList />
      </div>
    </UrlContextProvider>
  );
};

export default App;
