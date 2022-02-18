const Request = require('../models/Requests')

const index = async (req, res) => {
  const request = await Request.find();
  res.json(request)
}

const show = async (req, res) => {
  try {
    const idUser = req.params.id;
    const requestByUser = await Request.findOne({ idUser }).populate('idRequest')
    if (!requestByUser) return res.status(201).json({ message: 'Sin solicitudes' })
    res.status(201).json(requestByUser)
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
}

const store = async (req, res) => {
  try {
    const { idUser, idRequest } = req.body;
    if (!idUser || !idRequest) return res.status(404).json({ message: 'Data required incomplete' })
    const requestFindOne = await Request.findOne({ idUser: idUser });
    
    if (requestFindOne) {
      const request = await Request.findOneAndUpdate({ idUser }, { idRequest: idRequest }, { new: true })
      res.status(201).json(request)
    } else {
      console.log("Solictud no exixtente")
      const request = new Request({ idUser, idRequest });
      await request.save()
      res.status(201).json({ message: 'Request sent' })
    }
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })    
  }
}

const update = async (req, res) => {
  try {
    const idUser = req.params.id
    const { idRequest } = req.body;
    const request = await Request.updateOne({ idUser: idUser }, { $pull: { idRequest: { $in: [idRequest] }} }) 
    res.status(201).json(request)
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
}

const deleted = (req, res) => {
  res.send('delete')
}

module.exports = {
  index,
  show,
  store,
  update,
  deleted
}