import CatalogueTabs from "./CatalogueTabs";
import Landing from "./LandingPhoto/LandingPhoto";
import NewClientModal from "components/Users/UsersPersonalData/NewClientModal";

export default function Catalogue() {
    return (
        <>
            <Landing />
            <CatalogueTabs />
            <NewClientModal />
        </>
    )
}
