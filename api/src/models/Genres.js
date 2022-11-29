const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    name: { //COMPLETE
        // Nombre de nuestro genero
        type: DataTypes.STRING,
        allowNull: false
    },
    id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
},{timestamps : false});
}

   
