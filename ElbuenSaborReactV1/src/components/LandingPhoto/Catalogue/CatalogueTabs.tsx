import React from "react";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap"; 
import "./Catalogue.scss";
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiFrenchFries, GiSodaCan } from 'react-icons/gi';
import { MdFastfood } from 'react-icons/md';



const CatalogueTabs = () => {
    const [key, setKey] = useState('burgers');

    return (
        <Tabs
            id="catalogue-tabs"
            activeKey={key}
            //onSelect={(k) => setKey(k)}
            className="catalogue"
            justify
        >
            <Tab eventKey="" title="Categorías" disabled className="categories-tab"></Tab>
            <Tab eventKey="burgers" title={<FaHamburger size={26} />} ></Tab>
            <Tab eventKey="pizzas" title={<FaPizzaSlice size={26}/>}></Tab>
            <Tab eventKey="fries" title={<GiFrenchFries size={26}/>}></Tab>
            <Tab eventKey="drinks" title={<GiSodaCan size={26}/>}></Tab>
            <Tab eventKey="combos" title={<MdFastfood size={26}/>}></Tab>
        </Tabs>
        
    )
}

export default CatalogueTabs;