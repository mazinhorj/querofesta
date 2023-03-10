import './Form.css';
import partyFetch from '../axios/config';

import useToast from '../hook/useToast';


import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateParty = () => {
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState("");
  const [partyServices, setPartyServices] = useState([]);

  const navigate = useNavigate();

  //load services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get('/services');
      //console.log(res);
      setServices(res.data);
    };
    loadServices();
  }, []);

  // add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    if (checked) {

      setPartyServices((services) => [...services, filteredService[0]])

    } else {

      setPartyServices((services) => services.filter((s) => s._id !== value));

    };

    console.log(partyServices);

  };


  // nova festa
  const createParty = async (e) => {
    e.preventDefault();

    try {
      
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      };
      console.log(party);

      const res = await partyFetch.post('/parties', party);

      if (res.status === 201) {
        navigate('/');
        useToast(res.data.msg)
      }

    } catch (error) {
      useToast(error.response.data.msg, "error");
    }

  };

  return (
    <div className='form_page'>
      <h2>Crie sua próxima Festa</h2>
      <p>Defina seu orçamento e escolha os serviços.</p>
      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span>Nome da Festa:</span>
          <input
            type="text"
            placeholder='Vai ser o que?'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Big Boss:</span>
          <input
            type="text"
            placeholder='Quem banca?'
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder='Conta como vai ser...'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </label>
        <label>
          <span>Investimento: R$</span>
          <input
            type="number"
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
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
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required
          />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className="services_container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 && services.map((service) => {
              return (
                <div className='service' key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service_name">{service.name}</p>
                  <p className="service_price">R${service.price}</p>
                  <div className="checkbox_container">
                    <input type="checkbox" value={service._id} onChange={(e) => handleServices(e)} />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <input type="submit" value="Criar Festa" className="btn" />
      </form>
    </div>
  )
}

export default CreateParty