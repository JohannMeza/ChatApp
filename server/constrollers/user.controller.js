const User = require('../models/User');
// const Message = require('../models/Message');
// const mongoose = require('mongoose');
const encryptPassword = require('../libs/EncryptPass');

/**
 * Get all users by his message
 */
const index = async (req, res) => {
  try {
    const { search } = req.body;
    const users = await User.find({ name: { $regex: `.*${search}.*` } }).limit(10);
    res.status(201).json(users)
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
}

// const index = async (req, res) => {
//   try {
//     let { id } = req.body;
//     const mensajesActivos = [];
//     id = mongoose.Types.ObjectId(id);
    
//     const users = await Message.aggregate([
//       { $sort: { updatedAt: -1 } },
//       { $match: { $or: [ { to: id }, { from: id } ] } },
//       { 
//         $group: { 
//           _id: "$to",
//           message: { $first: "$message" },
//           from: { $first: "$from" },
//           to: { $first: "$to" },
//           updatedAt: { $first: "$updatedAt" }
//         } 
//       }
//     ]);

//     let data = users[0];

//     console.log(users)

//     users.forEach(el => {
//       let arrId = [];
//       arrId.push(el._id[0], el.from)
//       let orderId = arrId.sort().join('');
//       el.unionId = orderId
//     })

//     users.sort((a, b) => {
//       if (a.updatedAt > b.updatedAt) {
//         return 1
//       }

//       if (a.updatedAt < b.updatedAt) {
//         return -1
//       }

//       return 0
//     })



    
      
//     users.forEach((el, index) => {
//       if (el.unionId === data.unionId) {
//         if (index === 0) {
//           mensajesActivos.push(el)
//         }

//         if (index !== 0) {
//           console.log(new Date(el.updatedAt).getTime())
//           console.log(new Date(data.updatedAt).getTime())
//             if (new Date(el.updatedAt).getTime() < new Date(data.updatedAt).getTime()) {
//               console.log("es menor")
//             } else {
//               console.log("es MAYOR")
//               mensajesActivos.push(el)
//             }
//         }
//       }

//       data = el
//     })

//     await Message.populate(mensajesActivos, { path: 'to' })
//     res.status(201).json(mensajesActivos)

//     // console.log(mensajesActivos)


//     // data.push(users[0]._id[0], users[0].from)
//     // let dataId = data.sort().join('')
//     // let orderId = ''
//     // // console.log(dataId)

//     // users.forEach(el => {
//     //   const arrId = []

//     //   if (arrId.length === 0) {
//     //     mensajesActivos.push(el)
//     //   } else {
//     //     arrId.push(el._id[0], el.from)
//     //     orderId = arrId.sort().join('');
//     //   }

//     //   console.log("data", dataId, "+")
//     //   console.log("order", orderId, "+")


//     //   if (dataId === orderId) {
//     //     console.log("Doble coincidencia")
//     //     console.log(new Date(el.updatedAt).getTime())
//     //     let coinId.push(el._id[0], el.from)
//     //   orderId = arrId.sort().join('');
//     //     const coincidence = users.findIndex((el, index) => {
//     //       if (el.)
//     //     })
//     //   }

//     //   arrId.push(el._id[0], el.from)
//     //   orderId = arrId.sort().join('');
//     //   dataId = orderId
//     // })

    
    
//   } catch (err) {
//     return res.status(500).json({ message: "Error not found " + err }) 
//   }
// }

const show = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (!user) res.status(404).json({ message: 'User not found' })
    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' })
  }
}

const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.json({ message: "Image not found" })
    const image = `${req.file.path.split('\\').pop()}`;
    const uploadImageToUser = await User.findByIdAndUpdate(req.params.id, { imgUrl: image }, { new: true })
    res.status(201).json(uploadImageToUser)
  } catch (err) {
    res.status(500).json({ message: 'Error not found' + err })
  }
}

const upload = async (req, res) => {
  try {
    let { password } = req.body;
    
    if (password) password = await encryptPassword(5, password)
    req.body.password = password
    
    const userUpload = await User.findOneAndUpdate(req.params.id, req.body, { new: true })
    if (!userUpload) return res.status(404).json({ message: 'User not found for update' })
    res.status(201).json(userUpload)
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' })
  }
}

const deleted = async (req, res) => {
  try {
    const userDelete = await User.findByIdAndDelete(req.params.id);
    if (!userDelete) return res.status(404).json({ message: "User not found for delete" })
    res.status(201).json({ message: "User delete" })
  } catch (err) {
    return res.status(500).json({ message: "Error not found" })
  }
}

module.exports = {
  index,
  show,
  upload,
  uploadImage,
  deleted
}