import { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./Catalogue.scss";
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiFrenchFries, GiSodaCan } from 'react-icons/gi';
import { MdFastfood } from 'react-icons/md';
import CategoryProducts from "./CategoryProducts";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setSearchValue } from '@features/SearchProduct/Search';

const CatalogueTabs = () => {
    const dispatch = useAppDispatch();
    const { search } = useAppSelector((state) => state.search);
    const CATEGORY = "category";

    const [activeTab, setActiveTab] = useState<string | null>('Hamburguesas');

    const handleTabSelect = (key: string | null) => {
        setActiveTab(key);
        dispatch(setSearchValue(""));
    };

    useEffect(() => {
        if (search !== "") {
            setActiveTab("Hamburguesas");
        }
    }, [search])

    return (
        <>
            <Tabs
                activeKey={activeTab!}
                onSelect={handleTabSelect}
                id="uncontrolled-tab-example"
                className="catalogue"
                justify
            >
                <Tab eventKey="categories" title="Categorías" disabled className="categories-tab" />
                <Tab eventKey="Hamburguesas" title={<FaHamburger size={26} style={{ color: activeTab === 'Hamburguesas' && search === '' ? ' #EC5800' : 'black' }} />} >
                    {search !== "" ?
                        (<CategoryProducts args={[search, "name"]} />) :
                        (<CategoryProducts args={["Hamburguesas", "category"]} />)}
                    {/* <CategoryProducts args={["Hamburguesas", CATEGORY]}/> */} </Tab>
                <Tab eventKey="Pizza" title={<FaPizzaSlice size={26} />} >
                    <CategoryProducts args={["Pizza", CATEGORY]} /></Tab>
                <Tab eventKey="Papas fritas" title={<GiFrenchFries size={26} />} >
                    <CategoryProducts args={["Papas fritas", CATEGORY]} /></Tab>
                <Tab eventKey="Bebidas" title={<GiSodaCan size={26} />} >
                    <CategoryProducts args={["Bebidas", CATEGORY]} /></Tab>
                <Tab eventKey="Combos" title={<MdFastfood size={26} />} >
                    <CategoryProducts args={["Combos", CATEGORY]} /></Tab>
            </Tabs >
            {/* {search !== "" && (<CategoryProducts args={[search, "name"]} />)} */}
        </>
    );
}

export default CatalogueTabs;
