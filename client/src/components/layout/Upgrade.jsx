import React from "react";
import youaretheproduct from "../../assets/upgrade-assets/product.png";
import censorship from "../../assets/upgrade-assets/censorship.jpg";
import misinformation from "../../assets/upgrade-assets/misinformation.jpg";
import security from "../../assets/upgrade-assets/security.png";
import { connect } from "react-redux";
import { getFreeTrial, getPremiumAccount } from "../../actions/auth";
import PropTypes from "prop-types";

function Upgrade({ auth: { user }, getFreeTrial, getPremiumAccount, history }) {
  const upgradeToPremium = () => {
    if (
      user.trial &&
      user.trial.dateStarted &&
      new Date(user.trial.dateStarted).getDate() ===
        new Date(user.date).getDate() &&
      new Date(user.trial.dateStarted).getMonth() ===
        new Date(user.date).getMonth() &&
      new Date(user.trial.dateStarted).getFullYear() ===
        new Date(user.date).getFullYear()
    ) {
      getFreeTrial();
      history.push("/");
    } else {
      getPremiumAccount();
      history.push("/");
    }
  };
  return (
    <div
      className="container py-4 bg-overlay"
      style={{ pointerEvents: "all", marginBottom: "3rem" }}
    >
      <h1 className="display-3 text-primary font-weight-bold">
        Upgrade to Impulse Premium
      </h1>
      <hr />
      <p className="lead">
        Impulse
        <sup>
          <small>TM</small>
        </sup>{" "}
        is designed to be free like any other social network.
        <br />
        However, your wallet not incurring the cost{" "}
        <b>
          <u>does not mean that that is the case</u>
        </b>
        .
      </p>
      <figure className="figure">
        <img
          src={youaretheproduct}
          alt="If the service is free, you are the product"
          className="figure-img img-fluid rounded"
        />
        <figcaption className="figure-caption">
          How do these services operate?
          <br />
          What do they give you?
          <br />
          What do they take?
          <br />
          What do they do with which has been taken?
        </figcaption>
      </figure>
      <p className="lead">
        While this is an open secret, a lot of users are still oblivious to the
        fact that{" "}
        <b>
          <u>
            social networks farm users' data like crazy and sell them to
            advertisers
          </u>
        </b>
        , who, in turn, fuel the company with capital, making for a lucrative
        business model. But it doesn't have to be like this.
      </p>
      <h2 className="display-4 text-primary font-weight-bold">
        The harm that comes
      </h2>
      <p className="lead">
        While using free services feels like a "better deal" than paying for a
        social network, there are a lot of detrimental consequences that come
        with such an outlook.
        <br />
        Here are just a few:
      </p>
      <article>
        <h1 className="text-primary font-weight-bold">Censorship</h1>
        <div className="my-3">
          <img src={censorship} alt="Censorship" className="img-fluid" />
        </div>
        <p className="lead">
          The more information they gather about you, the more they know you (in
          extremely creepy details).
          <br />
          This makes it extremely easy to shut down any rhetoric not compatible
          with the company's vision.
          <br />
          These organisations are extremely powerful, with a massive global
          reach and can even{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://edition.cnn.com/2021/02/17/media/facebook-australia-news-ban/index.html"
          >
            sanction governments
          </a>{" "}
          if they don't "bend the knee".
        </p>
      </article>
      <article>
        <h1 className="text-primary font-weight-bold">Misinformation</h1>
        <div className="my-3">
          <img
            src={misinformation}
            alt="Misinformation"
            className="img-fluid"
          />
        </div>
        <p className="lead">
          Such powerful organisations will most definitely have a vision of how
          the world should look like and what people should think.
          <br />
          As such, they will promote a certain mindset they want their users to
          adopt and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.deseret.com/indepth/2021/1/12/22225290/parler-amazon-facebook-twitter-conservatives-social-media-free-speech"
          >
            annihilate any trace of "wrongthink"
          </a>
          .
        </p>
      </article>
      <article>
        <h1 className="text-primary font-weight-bold">
          The surveillance state
        </h1>
        <div className="my-3">
          <img src={security} alt="Security" className="img-fluid" />
        </div>
        <p className="lead">
          As powerful as they are, however, they are still beholden to laws of
          superpowers, and it just so happens that all of them have{" "}
          <u>state-sponsored terrorist organisations</u> called{" "}
          <b>national-level security agencies</b>.<br />
          To resume doing what they're doing, they are required to{" "}
          <a
            href="https://www.theguardian.com/world/2013/jun/12/microsoft-twitter-rivals-nsa-requests"
            rel="noopener noreferrer"
            target="_blank"
          >
            fork over most (or even all) of their collected data
          </a>{" "}
          to well-known few-letter agencies, such as the FBI, CIA, NSA, DIA, DHS
          and{" "}
          <a
            href="https://en.wikipedia.org/wiki/United_States_Intelligence_Community"
            rel="noopener noreferrer"
            target="_blank"
          >
            the rest of these I don't have the patience to list here
          </a>
          .<br />
          If you would like to keep your information and not give it to these
          parasites, then I'm afraid it's too late.
          <br />
          You can't stop them from possessing information about you, but you can
          make it significantly easier.
        </p>
      </article>
      <h2 className="display-4 text-primary font-weight-bold">
        There is another way
      </h2>
      <p className="lead">
        For just $10 a month, you can upgrade to Impulse
        <sup>
          <small>TM</small>
        </sup>{" "}
        Premium.
        <br />
        Impulse
        <sup>
          <small>TM</small>
        </sup>{" "}
        will use only the standard data required to maintain the account and
        will in turn stop advertising products to you <b>completely</b>.<br />
        The more people subscribe to Impulse, the less Impulse will rely on
        data-farming and marketing.
        <br />
        Thus, Impulse will be loyal exclusively to you, the subscribed user.
      </p>
      <h1 className="my-3 font-weight-bold">
        So, what are you waiting for? Call the shot already!
      </h1>
      <button
        onClick={upgradeToPremium}
        className="btn btn-lg btn-block btn-primary"
      >
        <i className="fas fa-dove pr-2" />
        {user.trial &&
        user.trial.dateStarted &&
        new Date(user.trial.dateStarted).getDate() ===
          new Date(user.date).getDate() &&
        new Date(user.trial.dateStarted).getMonth() ===
          new Date(user.date).getMonth() &&
        new Date(user.trial.dateStarted).getFullYear() ===
          new Date(user.date).getFullYear()
          ? "Start your free premium month"
          : "Get your one-way ticket to freedom"}
        <i className="fas fa-dove pl-2" />
      </button>
    </div>
  );
}

Upgrade.propTypes = {
  auth: PropTypes.object.isRequired,
  getFreeTrial: PropTypes.func.isRequired,
  getPremiumAccount: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getFreeTrial, getPremiumAccount })(
  Upgrade
);
