import { DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";
import { AddressType } from "../types/addressType";


export interface PhraseInstance extends Model {
    id: number,
    author: string,
    txt:string,
};

export const AddressModel = sequelize.define<PhraseInstance>("endereco",{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
    },
    complemento: {
        type: DataTypes.STRING,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uf: {
        type: DataTypes.STRING,
        allowNull: false

    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    tableName: 'endereco',
    timestamps: false,
});
sequelize.sync()
  .then(() => {
    console.log('Tabela Endereco Criada com Sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao criar as tabela:', error);
  });