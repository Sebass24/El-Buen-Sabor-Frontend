import { useState } from "react";
import "./LandingPhoto.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSearch from "./useSearch";

library.add(faMagnifyingGlass);

export default function Landing() {

  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleButtonClick = () => {
    useSearch(search);
  };

  /* 
  const searchFood = (event: any) => {
    event.preventDefault();
    const {target} = event; 
    const searchValue = target.search.value; 
    target.search.value = ""; 
    store.dispatch({
      type:"foodSearch",
      searchValue
    })
  }
  */

  return (
    <>
      <div className="imageHomePage">
        <div className="search_container">
          <p className="best_burgers">Mejores hamburguesas de Mendoza</p>
          <form className="input-container">
            <input type="text" placeholder="Buscar" className="food_search" value={search} onChange={handleSearchChange}></input>
            <span className="icon" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }} onClick={handleButtonClick}></FontAwesomeIcon></span>
          </form>
          {/* <form className="input-container">
            <input type="text" name="search" placeholder="Buscar" className="food_search"></input>
            <span className="icon" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }} onClick={searchFood}></FontAwesomeIcon></span>
          </form> */}
        </div>
      </div>
    </>
  )
}
