import {useState} from "react";
import "./LandingPhoto.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSearch from "../LandingPhoto/useSearch";

library.add(faMagnifyingGlass);

export default function Landing() {
  
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleButtonClick = () => {
    useSearch(search);
  };

  return (
    <>
      <div className="imageHomePage">
        <div className="search_container">
          <p className="best_burgers">Mejores hamburguesas de Mendoza</p>
          <div className="input-container">
            <input type="text" placeholder="Buscar" className="food_search" value={search} onChange={handleSearchChange}></input>
            <span className="icon" style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }} onClick={handleButtonClick}></FontAwesomeIcon></span>
          </div>
        </div>
      </div>
    </>
  )
}
