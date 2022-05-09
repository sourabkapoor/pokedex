import React from "react"
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Pokemons from "./components/pokemons/pokemons";

function App() {
  return (
    <div className="App">
      {/* Header section */}
      <Header />

      {/* Pokemons list */}
      <Pokemons />

      {/* footer area */}
      <Footer />
    </div>
  );
}

export default App;
