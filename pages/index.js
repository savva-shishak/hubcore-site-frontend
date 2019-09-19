import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Nav from '../components/nav';
import Counter from '../components/counter';

const Home = ({ image }) => (
  <div>
    <Head>
      <title>Home | Hubcore</title>
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to Hubcore!</h1>
      <p className="description">
        To get started, edit&nbsp;
        <code>pages/index.js</code>
        &nbsp;and save to reload.
      </p>

      <div className="row">
        <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Learn more about Next.js in the documentation.</p>
        </a>
        <div className="card counter" align="center">
          <Counter />
        </div>
        <div className="card">
          <img src={image} alt="" className="card-image" />
        </div>
      </div>
    </div>
  </div>
);

Home.getInitialProps = async () => {
  const res = await fetch('https://cataas.com/cat/says/hello%20world!');
  return {
    image: res.url,
  };
};

Home.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Home;
