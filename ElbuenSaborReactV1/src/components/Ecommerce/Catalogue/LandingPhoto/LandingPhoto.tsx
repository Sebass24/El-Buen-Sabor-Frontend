import { useState } from "react";
import "./LandingPhoto.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CatalogueTabs from "../CatalogueTabs";
import { useDispatch } from 'react-redux';
import { setSearchValue } from 'components/store';


library.add(faMagnifyingGlass);

export default function Landing() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleButtonClick = () => {
    dispatch(setSearchValue(search));
  };

  return (
    <>
      <div className="imageHomePage">
        <div className="search_container">
          <p className="best_burgers">Las mejores hamburguesas de Mendoza</p>
          <form className="input-container">
            <input type="text" placeholder="Buscar" className="food_search" value={search} onChange={handleSearchChange}></input>
            <span className="icon" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }} onClick={handleButtonClick}></FontAwesomeIcon></span>
          </form>
        </div>
      </div>
    </>
  )
}
