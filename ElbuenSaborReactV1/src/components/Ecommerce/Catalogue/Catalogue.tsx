import { useDispatch } from "react-redux";
import CatalogueTabs from "./CatalogueTabs";
import Landing from "./LandingPhoto/LandingPhoto";
import NewClientModal from "components/Users/UsersPersonalData/NewClientModal";
import { useEffect } from "react";
import { startLoading } from "@features/Loading/LoadingSlice";

export default function Catalogue() {

    return (
        <>
            <Landing />
            <CatalogueTabs />
            <NewClientModal />
        </>
    )
}
