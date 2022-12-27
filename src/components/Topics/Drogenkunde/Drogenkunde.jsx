import { Outlet, Route } from '@solidjs/router';

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
            <Route path="drogen" element={<h1>Drogen</h1>} />
        </>
    )
}
export { Drogenkunde };
export { Routes as Routes_Drogenkunde }