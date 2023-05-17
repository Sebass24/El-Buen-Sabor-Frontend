import { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./Catalogue.scss";
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiFrenchFries, GiSodaCan } from 'react-icons/gi';
import { MdFastfood } from 'react-icons/md';
import CategoryProducts from "./CategoryProducts";
import { useSelector } from 'react-redux';
import { AppState } from "components/store";

const CatalogueTabs = () => {

    const search = useSelector((state: AppState) => state.search);
    console.log("Search:" + search);
    const CATEGORY = "category";

    const [searchValue, setSearchValue] = useState("");
    console.log("SearchValue: " + searchValue);

    useEffect(() => {
        setSearchValue(search);
    }, [search]);

    return (
        <>
            <Tabs
                defaultActiveKey="Hamburguesas"
                id="uncontrolled-tab-example"
                className="catalogue"
                justify
            >
                <Tab eventKey="categories" title="Categorías" disabled className="categories-tab"></Tab>
                <Tab eventKey="Hamburguesas" title={<FaHamburger size={26} />} >
                    <CategoryProducts args={["Hamburguesas", CATEGORY]} /></Tab>
                <Tab eventKey="Pizza" title={<FaPizzaSlice size={26} />} >
                    <CategoryProducts args={["Pizza", CATEGORY]} /></Tab>
                <Tab eventKey="Papas fritas" title={<GiFrenchFries size={26} />} >
                    <CategoryProducts args={["Papas fritas", CATEGORY]} /></Tab>
                <Tab eventKey="Bebidas" title={<GiSodaCan size={26} />} >
                    <CategoryProducts args={["Bebidas", CATEGORY]} /></Tab>
                <Tab eventKey="Combos" title={<MdFastfood size={26} />} >
                    <CategoryProducts args={["Combos", CATEGORY]} /></Tab>
            </Tabs>
            {searchValue !== "" && <CategoryProducts args={[searchValue, "name"]} />}
        </>
    );
}

export default CatalogueTabs;
