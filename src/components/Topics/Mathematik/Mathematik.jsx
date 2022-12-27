import { Outlet, Route } from '@solidjs/router';
import { Einheiten } from './Content/Einheiten';

const Mathematik = () => {
    return (
        <>
            <Outlet />
        </>
    )
};

const Routes = () => {
    return (
      <>
        <Route path="einheiten" element={Einheiten} />
      </>
    )
  }
  
  export { Mathematik };
  export {Routes as Routes_Mathematik}