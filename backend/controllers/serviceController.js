const { Service: ServiceModel } = require('../models/Service');

const serviceController = {

  // inserir dados no banco
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };
      const response = await ServiceModel.create(service);
      res.status(201).json({ response, msg: "Serviço registrado com sucesso!" });
    } catch (error) {
      console.log(`Xiiii... Não foi dessa vez: ${error}`);
    };
  },

  // resgatar todos os dados
  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();
      res.json(services);
    } catch (error) {
      console.log(`Xiiii... Não sei de nada: ${error}`)
    };
  },

  // resgatar com filtro
  get: async (req, res) => {
    try {
      // id => URL === GET
      const id = req.params.id
      const service = await ServiceModel.findById(id);
      if (!service) {
        res.status(404).json({ msg: "Não achei o que você procura" });
        return;
      };
      res.json(service);
    } catch (error) {
      console.log(`Xiiii... Tem certeza: ${error}`)
    };
  },

  // deletar do banco
  delete: async (req, res) => {
    try {
      const id = req.params.id
      const service = await ServiceModel.findById(id);
      if (!service) {
        res.status(404).json({ msg: "Não achei o que você procura para deletar" });
        return;
      };
      const deleteService = await ServiceModel.findByIdAndDelete(id);
      res.status(200).json({deleteService, msg: "Serviço excluído com sucesso"});
    } catch (error) {
      console.log(`Xiiii... Não apagou: ${error}`)
    };
  },

  // atualizar registro
  update: async (req, res) => {
    const id = req.params.id
    const service = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    };
    const updatedService = await ServiceModel.findByIdAndUpdate(id, service);
    if (!updatedService) {
      res.status(404).json({ msg: "Não achei o que você procura para editar" });
      return;
    };
    res.status(200).json({service, msg: "Atualizado com sucesso"});
  }
};

module.exports = serviceController;