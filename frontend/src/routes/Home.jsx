import partyFetch from "../axios/config";

import './Home.css';

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  const [parties, setParties] = useState(null);

  // load parties
  useEffect(() => {
    const loadParties = async () => {
      const res = await partyFetch.get('/parties');
      // console.log(res);
      setParties(res.data);
    };
    loadParties();
  }, [])

  if (!parties) return <p>Carregando...</p>;

  return (
    <div className="home">
      {/* <small>Home</small> */}
      <h2>Suas Festas</h2>
      <div className="parties_container">
        {parties.length === 0 && <p>Não tem festa ainda!</p>}
        {parties.map((party) => {
          return (
            <div className="party" key={party._id}>
              <img src={party.image} alt={party.title} />
              <h3>{party.title}</h3>
              <Link to={`/party/${party._id}`} className="btn_secondary">Detalhes</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home