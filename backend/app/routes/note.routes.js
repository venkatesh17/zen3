module.exports = (app) => {
    
    const user = require("../controller/user.controller");
   
    // Product
    app.get('/users', user.getall)
    app.post('/user', user.create)
    app.delete("/delete", user.delete)
    app.delete("/deleteuser", user.deleteByid)

}