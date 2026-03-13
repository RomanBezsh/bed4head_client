import {NavLink} from "react-router";
import MapPinButton from "./MapPinButton.jsx";
import Filter from './Filter';

const FilterBar = () => {
    return (
        <div className="flex flex-col gap-8">
            <MapPinButton />
            <Filter />
        </div>
    );
}

export default FilterBar;