
module.exports=(sequelize,DataType)=>{
    const condidats=sequelize.define("user",{
    naissance:{
        type:DataType.DATE,
        allowNull:false
    },
    ville_naissance:{
        type:DataType.STRING,
        allowNull:false
    },
    gouvernorat:{
        type:DataType.STRING,
        allowNull:false
    },
    pays:{
        type:DataType.STRING,
        allowNull:false
    },

})
 
condidats.associate=module=>{
    condidats.belongsTo(models.user,{
        onDelete:"cascade"
     })
}
return condidats

}