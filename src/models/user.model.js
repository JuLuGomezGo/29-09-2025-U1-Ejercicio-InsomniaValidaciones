const { randomUUID } = require('node:crypto');

let users = [
    { id: randomUUID, name: 'Luis', email: "julu@gmail.com", age: 23, active: true },
    { id: randomUUID, name: 'Jorge', email: "jorge@gmail.com", age: 25, active: false },
];

function findAll() {
    return users;
}

function findById(id) {
    return users.find(u => u.id === id || null);
}

function addUser(item) {
    const user = {
        id: randomUUID(),
        name: item.name,   //Obligatorio
        email: item.email, //Obligatorio
        age: item.age,     //Obligatorio
        active: true
    }
    users.push(user);
    return user
}

function updateUser(id, data) {
    const index = users.findIndex(user => user.id == id);

    if (index == -1) return null;

    users[index] = {
        ...users[index],  //Permite acceder a las propiedades del objeto original
        name: typeof data.name === "undefined" ? users[index].name : data.name,
        email: typeof data.email === "undefined" ? users[index].email : data.email,
        age: typeof data.age === "undefined" ? users[index].age : Number(data.age),
        active: typeof data.active === "undefined" ? users[index].active : Boolean(data.active)

    }
    return users[index];

}


module.exports = {
    findAll,
    findById,
    addUser,
    updateUser
}