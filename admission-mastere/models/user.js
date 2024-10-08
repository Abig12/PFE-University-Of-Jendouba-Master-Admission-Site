
module.exports=(sequelize,DataType)=>{
    const user=sequelize.define("user",{
    nom:{
        type:DataType.STRING,
        allowNull:false
    },
    prenom:{
        type:DataType.STRING,
        allowNull:false
    },
    email:{
        type:DataType.STRING,
        allowNull:false
    },
    password:{
        type:DataType.STRING,
        allowNull:false
    },
    telephone:{
        type:DataType.INTEGER,
        allowNull:false
    },
    passport_cin:{
        type:DataType.STRING,
        allowNull:false
    },
    sexe:{
        type:DataType.STRING,
        allowNull:false
    },

})
 
user.associate=module=>{
     user.hasOne(models.condidats,{
        onDelete:"cascade"
     })
     user.hasOne(models.agents,{
        onDelete:"cascade"
     })
}
return user

}

