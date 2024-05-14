import { Outlet } from "react-router-dom";

function RootLayout() {
  // A layout page wasn't necessary due to the size of this particular project, but I still consider it good practice to include it.
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;
