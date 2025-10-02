const User = require('../models/user.model');

const UUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numRegex = /^[0-9]+$/;


exports.findAll = (req, res) => {
    const data = User.findAll();
    res.status(200).json(data);
}

exports.findById = (req, res) => {

    const id = (req.params.id).trim();
    if (!UUIDRegex.test(id)) return res.status(400).json({ message: "ID de usuario invalido" });

    const data = User.findById(id);

    if (!data) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(data);

    //************Método diferente
    //const user = User.findById(req.params.id); //path params
    // return user ? res.status(200).json(user) : res.status(404).json({message: "Usuario no encontrado"});
}

exports.addUser = (req, res) => {


    const name = req.body.name;
    if (!name || name.trim().length == 0) return res.status(400).json({ message: "Debe ingresar un nombre" });
    const hasNumbers = /\d/.test(name);

    if (hasNumbers)
        return res.status(400).json({ message: "El nombre no puede contener números." });
    else
        if (name.length < 3) return res.status(400).json({ message: "Nombre demasiado corto" });


    const email = req.body.email;
    if (!email || email.trim().length == 0) return res.status(400).json({ message: "Debe ingresar un correo" });
    else
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Correo invalido" });
        else {
            const emailExists = User.findAll().some(u => u.email === email);
            if (emailExists) return res.status(400).json({ message: "El correo ya existe" });
        }


    const age = req.body.age;

    if (!age) {
        const data = User.addUser({name, email, age: null});
        res.status(201).json(data);
        return;
    }
    let ageNum = Number(age);
    if (!Number.isInteger(ageNum) || (age < 0 || age > 150)) return res.status(400).json({ message: "Edad invalida" });

    const data = User.addUser({name, email, age});

    res.status(201).json(data);



    //************Método diferente
    // const newUser = User.addUser(req.body);
    // res.status(201).json(newUser);

}

exports.updateUser = (req, res) => {
  const id = req.params.id;
  if (!UUIDRegex.test(id)) {
    return res.status(400).json({ message: "ID de usuario invalido" });
  }

  const user = User.findById(id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const body = req.body || {};

  if (typeof body.name !== "undefined") {
    const nameTrim = String(body.name).trim();
    if (numRegex.test(nameTrim)) return res.status(400).json({ message: "Nombre invalido" });
    if (nameTrim.length < 3) return res.status(400).json({ message: "Nombre demasiado corto" });

    body.name = nameTrim;
  }

  if (typeof body.email !== "undefined") {
    const emailTrim = String(body.email).trim().toLowerCase();
    if (!emailRegex.test(emailTrim)) return res.status(400).json({ message: "Correo invalido" });

    const emailExists = User.findAll().some(u => (u.email || "").toLowerCase() === emailTrim && u.id !== id);
    if (emailExists) return res.status(400).json({ message: "El correo ya existe" });

    body.email = emailTrim;
  }

  if (typeof body.age !== "undefined") {
    const ageNum = Number(body.age);
    if (Number.isNaN(ageNum) || !Number.isInteger(ageNum)) {
      return res.status(400).json({ message: "Edad invalida" });
    }
    if (ageNum < 0 || ageNum > 150) {
      return res.status(400).json({ message: "Edad fuera de rango" });
    }
    body.age = ageNum;
  }

  const data = User.updateUser(id, body);

  if (!data) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.status(200).json(data);
};

