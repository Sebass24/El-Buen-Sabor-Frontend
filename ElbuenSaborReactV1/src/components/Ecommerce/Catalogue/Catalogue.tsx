import PersonalDataModal from "components/Users/UsersPersonalData/PersonalDataModal";
import CatalogueTabs from "./CatalogueTabs";
import Landing from "./LandingPhoto/LandingPhoto";

export default function Catalogue() {
    return (
        <>
            <Landing />
            <CatalogueTabs />
            <PersonalDataModal />
        </>
    )
}
