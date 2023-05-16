import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./Catalogue.scss";
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiFrenchFries, GiSodaCan } from 'react-icons/gi';
import { MdFastfood } from 'react-icons/md';
import CategoryProducts from "./CategoryProducts";

const CatalogueTabs = () => {
    const [key, setKey] = useState<string>('Hamburguesas');

    return (
        <Tabs
            id="catalogue-tabs"
            activeKey={key ?? "hamburguesas"}
            onSelect={(k) => setKey(k ?? "Hamburguesas")}
            className="catalogue"
            justify
        >
            <Tab eventKey="categories" title="Categorías" disabled className="categories-tab"></Tab>
            <Tab eventKey="Hamburguesas" title={<FaHamburger size={26} />}><CategoryProducts args={key} /></Tab>
            <Tab eventKey="Pizza" title={<FaPizzaSlice size={26} />}><CategoryProducts args={key} /></Tab>
            <Tab eventKey="Papas fritas" title={<GiFrenchFries size={26} />}><CategoryProducts args={key} /></Tab>
            <Tab eventKey="Bebidas" title={<GiSodaCan size={26} />}><CategoryProducts args={key} /></Tab>
            <Tab eventKey="Combos" title={<MdFastfood size={26} />}><CategoryProducts args={key} /></Tab>
        </Tabs>
    )
}

export default CatalogueTabs;

//if search changes, render CategoryProducts with the products filtered by 