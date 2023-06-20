import { useState } from "react";
import "./LandingPhoto.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "@app/Hooks";
import { setSearchValue } from "@features/SearchProduct/Search";

library.add(faMagnifyingGlass);

export default function Landing() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleButtonClick = () => {
    dispatch(setSearchValue(search));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearchValue(search));
  };

  return (
    <>
      <div className="imageHomePage">
        <div className="search_container">
          <p className="best_burgers">Las mejores hamburguesas de Mendoza</p>
          <form className="input-container" onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Buscar" className="food_search" value={search} onChange={handleSearchChange}></input>
            <span className="icon" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }} onClick={handleButtonClick}></FontAwesomeIcon></span>
          </form>
        </div>
      </div>
    </>
  )
}
