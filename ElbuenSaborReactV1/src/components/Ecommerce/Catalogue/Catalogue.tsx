import CatalogueTabs from "./CatalogueTabs";
import Landing from "./LandingPhoto/LandingPhoto";
import NewClientModal from "components/Users/UsersPersonalData/NewClientModal";
import PersonalDataModal from "components/Users/UsersPersonalData/PersonalDataModal";

export default function Catalogue() {
    return (
        <>
            <Landing />
            <CatalogueTabs />
            <NewClientModal />
            <PersonalDataModal />
        </>
    )
}
