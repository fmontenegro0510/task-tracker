import { useLocation, Link } from "react-router-dom";
const Footer = () => {
  const Location = useLocation();
  return (
    <footer>
      <p> Copyright &copy; 2021 </p>
      {Location.pathname !== "/about" && <Link to="/about"> About... </Link>}
    </footer>
  );
};
export default Footer;
