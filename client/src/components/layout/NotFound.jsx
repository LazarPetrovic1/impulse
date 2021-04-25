import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeContext } from "../../contexts/ThemeContext";
import NotFoundContainer from "../../styled/NotFoundContainer";
// import LongLogo from '../../styled/Logo/LongLogo';
import BrokenLogo from "../../styled/Logo/BrokenLogo2";
// import RickRoll from "../utils/RickRoll";

// function NotFound ({auth: {isAuthenticated}}) {
//   const { isDarkTheme } = useContext(ThemeContext)
//
//   return (
//     <div style={{ height: "calc(100vh - 86px)" }} className={`${isDarkTheme && 'bg-overlay'} d-flex justify-content-center align-items-center`}>
//       <NotFoundContainer isDarkTheme={isDarkTheme} className='container'>
//         <div className='not-found-border'>
//           <div className='text-center'><LongLogo /></div>
//           <h1 className='display-3 text-primary text-center'>Oops! Your search came out empty-handed...</h1>
//           <p className='display-4 text-secondary text-center'>Well, isn't this embarrassing...</p>
//           <p className='display-4 text-info text-center'>What were you searching for again?</p>
//           <Link to={isAuthenticated ? '/' : '/login'} className='btn btn-block btn-lg btn-outline-primary'>Go back</Link>
//         </div>
//       </NotFoundContainer>
//     </div>
//   )
// }

function NotFound({ auth: { isAuthenticated } }) {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      style={{ height: "calc(100vh - 86px)" }}
      className={`${
        isDarkTheme && "bg-overlay"
      } d-flex justify-content-center align-items-center`}
    >
      <NotFoundContainer isDarkTheme={isDarkTheme} className="container">
        <h1 className="display-3 text-primary text-center">
          Oops, you broke it!
        </h1>
        <div>
          <div className="text-center p-5">
            <BrokenLogo height="200px" />
          </div>
          {/*<RickRoll />*/}
          <p className="display-4 text-secondary text-center">
            Well, isn't this embarrassing...
          </p>
          <p className="display-4 text-info text-center">
            What were you searching for again?
          </p>
          {/*<Link
            to={isAuthenticated ? "/" : "/login"}
            className="btn btn-block btn-lg btn-outline-primary"
          >
            Go back instead
          </Link>*/}

          <h3 className="mt-4 text-center">
            Maybe you should go <Link to="/chat">chat</Link>,{" "}
            <Link to="/videos-all">watch videos</Link> or{" "}
            <Link to="/">home</Link>.
          </h3>
        </div>
      </NotFoundContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, null)(NotFound);
