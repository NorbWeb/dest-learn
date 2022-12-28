import { Outlet, Route } from '@solidjs/router';
import { DrugCard } from './Content/DrugCard';

const Drogenkunde = () => {
    return (
        <>
            <Outlet />
        </>
    )
};

const Routes = () => {
    return (
        <>
            <Route path="drogen" element={DrugCard} />
        </>
    )
}
export { Drogenkunde };
export { Routes as Routes_Drogenkunde }