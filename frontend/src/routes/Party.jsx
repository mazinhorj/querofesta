import partyFetch from "../axios/config";
import { useEffect, useState } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import useToast from '../hook/useToast';

import './Party.css';


const Party = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [party, setParty] = useState(null);

  //load party
  useEffect(() => {
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);
      setParty(res.data);
    };
    loadParty()
  }, []);

  //delete this party
  const handleDelete = async () => {
    const res = await partyFetch.delete(`/parties/${id}`);
    if (res.status === 200) {
      navigate('/');
      useToast(res.data.msg);
    }
  }


  if (!party) return <p>Carregando...</p>;


  return (
    <div className="party">
      <h2>{party.title}</h2>
      <div className="actions_container">
        <button className="btn" onClick={navigate(`/party/edit/${party._id}`)}>Editar</button>
        <Link to={`/party/edit/${party._id}`} className="btn">Editar</Link>
        <button className="btn" onClick={handleDelete}>Excluir</button>
      </div>
      <p className="desc">{party.description}</p>
      <p>Orçamento: R${party.budget}</p>
      <h3>Serviços contratados:</h3>
      <div className="services_container">
        {party.services.map((service) => (
          <div className="service" key={service._id}>
            <img src={service.image} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Party