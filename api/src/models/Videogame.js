const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{
      type:  DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING
    },
    rating:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: { // esto es por si tengo que llamar a los videogames que son de la base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  });
};
