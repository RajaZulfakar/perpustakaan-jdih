import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
