import { Navbar } from "../components/Navbar";

export const AuthLayout: React.FC<any> = ({ children }:any) => {
  return (
    <>
      <Navbar />
      <div className="main">
      {children}
      </div>
    </>
  );
}