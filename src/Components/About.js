import { Link } from "react-router-dom";
import { ImPacman } from "react-icons/im";
const About = () => {
  return (
    <>
      <h4>
        Creado por Francisco Montenegro
        <ImPacman />
      </h4>
      <h4> Version 1.0.0 </h4>
      <Link to="/"> Go back! </Link>
    </>
  );
};

export default About;
