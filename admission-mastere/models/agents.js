
module.exports=(sequelize,DataType)=>{
    const agents=sequelize.define("user",{
    etablissement:{
        type:DataType.DATE,
        allowNull:false
    },

})
 
agents.associate=module=>{
    agents.belongsTo(models.user,{
        onDelete:"cascade"
     })
}
return agents

}