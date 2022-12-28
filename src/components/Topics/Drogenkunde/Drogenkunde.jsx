import { Outlet, Route } from '@solidjs/router';
import { DrugOverview } from './Content/DrugOverview';

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
            <Route path="drogen" element={DrugOverview} />
        </>
    )
}
export { Drogenkunde };
export { Routes as Routes_Drogenkunde }