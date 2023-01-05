const PartyModel = require('../models/Party');

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);
  console.log(priceSum, budget);
  if (priceSum > budget) {
    return false;
  }
  return true;
};

const partyController = {

  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      // budget < service price != new service
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "Tá sem grana? Sorry!" });
        return;
      };

      const response = await PartyModel.create(party);
      res.status(201).json({ response, msg: "Parabéns! Festa criada com sucesso." });

    } catch (error) {
      console.log(error);
    };
  },

  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();
      res.json(parties);
    } catch (error) {
      console.log(`Xiiii... Não sei de nada: ${error}`)
    };
  },

  get: async (req, res) => {
    try {
      // id => URL === GET
      const id = req.params.id
      const party = await PartyModel.findById(id);
      if (!party) {
        res.status(404).json({ msg: "Não achei o que você procura" });
        return;
      };
      res.json({party, msg: "Achei o que vc queria!"});
    } catch (error) {
      console.log(`Xiiii... Tem certeza: ${error}`)
    };
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id
      const party = await PartyModel.findById(id);
      if (!party) {
        res.status(404).json({ msg: "Não achei o que você procura para deletar" });
        return;
      };
      const deleteParty = await PartyModel.findByIdAndDelete(id);
      res.status(200).json({ deleteParty, msg: "Festa excluída com sucesso" });
    } catch (error) {
      console.log(`Xiiii... Não apagou: ${error}`)
    };
  },

  update: async (req, res) => {
    const id = req.params.id
    const party = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      budget: req.body.budget,
      image: req.body.image,
      services: req.body.services,
    };
    if (party.services && !checkPartyBudget(party.budget, party.services)) {
      res.status(406).json({ msg: "Tá sem grana? Sorry!" });
      return;
    };
    const updatedParty = await PartyModel.findByIdAndUpdate(id, party);
    if (!updatedParty) {
      res.status(404).json({ msg: "Não achei o que você procura para editar" });
      return;
    };
    res.status(200).json({ party, msg: "Atualizada com sucesso" });
  }


};

module.exports = partyController;