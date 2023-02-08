import classes from "./App.module.css";
import UrlDisplayList from "./components/UrlDisplayList/UrlDisplayList";
import UrlForm from "./components/UrlInputForm/UrlForm";
import UrlContextProvider from "./context/UrlContext";

const App = () => {
  return (
    <UrlContextProvider>
      <div className={classes.container}>
        <UrlForm />
        <UrlDisplayList />
      </div>
    </UrlContextProvider>
  );
};

export default App;
