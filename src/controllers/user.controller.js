const User = require('../models/user.model');

exports.findAll = (req, res) => {
    const data = User.findAll();
    res.status(200).json(data);
}

exports.findById = (req, res) => {
    //const user = User.findById(req.params.id); //path params
    // return user ? res.status(200).json(user) : res.status(404).json({message: "Usuario no encontrado"});

    const id = req.params.id;
    const data = User.findById(id);
    
    if(!data)
        return res.status(404).json({message: "Usuario no encontrado"});
    
    res.status(200).json(data);
}

exports.addUser = (req, res) => {
    // const newUser = User.addUser(req.body);
    // res.status(201).json(newUser);
    
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const data = User.addUser(name, email, age);

    res.status(201).json(data);
}

exports.updateUser = (req, res) => {
    // const updateUser = User.updateUser(req.params.id, req.body);
    // return updateUser ? res.status(200).json(updateUser) : res.status(404).json({message: "Usuario no encontrado"});

    const id = req.params.id;
    const body = req.body;
    const data = User.updateUser(id, body);

    if(!data)
        return res.status(404).json({message: "Usuario no encontrado"});
    
    res.status(200).json(data);
}
