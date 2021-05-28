import PropTypes from "prop-types";
import Button from "./Button";
const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header>
      <h1> {title} </h1>
      <Button
        color={showAdd ? "Red" : "Green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

//If you have Default Props defined dont make control of Proptypes is useless
//Default Props for components
Header.defaultProps = {
  title: "Task Tracker"
};

//Define PropTypes for most robust codebase
Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
