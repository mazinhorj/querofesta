import './EditParty.css';

import './Form.css';
import partyFetch from '../axios/config';

import useToast from '../hook/useToast';


import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';



const EditParty = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [party, setParty] = useState(null);
  const [services, setServices] = useState([]);


  //load services then party
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get(`/services`);
      //console.log(res.data);
      setServices(res.data);
      loadParty()
    };
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);
      setParty(res.data);
    };
    loadServices();
  }, []);

  // add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(checked, value);

    const filteredService = services.filter((s) => s._id === value);

    let partyServices = party.services;

    if (checked) {

      partyServices = [...partyServices, filteredService[0]];

    } else {

      partyServices = partyServices.filter((s) => s._id !== value);

    };

    setParty({ ...party, services: partyServices })
    
  };
  
  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const res = await partyFetch.put(`/parties/${party._id}`, party);
      if (res.status === 200) {
        navigate(`/party/${id}`);
        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
    
  }

  if (!party) return <p>Carregando festa...</p>;
  if (!services) return <p>Carregando serviços...</p>;


  return (
    <div className='form_page'>
      <h2>Editar: { party.title}</h2>
      <p>Redefinir informações.</p>
      <form onSubmit={(e) => updateParty(e)}>
        <label>
          <span>Nome da Festa:</span>
          <input
            type="text"
            placeholder='Vai ser o que?'
            onChange={(e) => setParty({...party, title: e.target.value})}
            value={party.title}
            required
          />
        </label>
        <label>
          <span>Big Boss:</span>
          <input
            type="text"
            placeholder='Quem banca?'
            onChange={(e) => setParty({ ...party, author: e.target.value })}
            value={party.author}
            required
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder='Conta como vai ser...'
            onChange={(e) => setParty({ ...party, description: e.target.value })}
            value={party.description}
            required
          ></textarea>
        </label>
        <label>
          <span>Investimento: R$</span>
          <input
            type="number"
            onChange={(e) => setParty({ ...party, budget: e.target.value })}
            value={party.budget}
            required
          />
          {/* <input
            type="range"
            min="1000"
            max="150000"
            step="5"
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
            required
          />
          <div className='range'><span>R$ 1.000,00</span> <span>R$ 150.000,00</span></div> */}
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder='Insira a URL da imagem'
            onChange={(e) => setParty({ ...party, image: e.target.value })}
            value={party.image}
            required
          />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className="services_container">
            {/* {party.services.length === 0 && <p>Carregando...</p>} */}
            {services.map((service) => {
              return (
                <div className='service' key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service_name">{service.name}</p>
                  <p className="service_price">R${service.price}</p>
                  <div className="checkbox_container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => handleServices(e)}
                      checked={party.services.find((partyService) => partyService._id === service._id) || ""}
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <input type="submit" value="Salvar Alterações" className="btn" />
      </form>
    </div>
  )
}

export default EditParty