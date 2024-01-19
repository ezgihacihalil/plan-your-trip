import Header from "./components/Header";
import Container from "./components/Container";
import Footer from "./components/Footer";

import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.mainContainer}>
      <Header />
      <Container />
      <Footer />
    </div>
  );
}
