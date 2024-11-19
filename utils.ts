import { Collection , ObjectId} from "mongodb"
import { Persona,PersonaModel } from "./types.ts";


export const fromModelPersona= async (
    //Parametros
    personaDB:PersonaModel,//Documento del mongoDB
    amigosCollecion:Collection<PersonaModel > // La coleccion de amigoModels en Mongo
    
):Promise<Persona> => {
    // 1. Busca los documentos de los amigos utilizando sus IDs en personaDB.amigos
    const amigos =await amigosCollecion
    .find({_id:{$in:personaDB.amigos}})
    .toArray();

    
      // 3. Crea y retorna el objeto Persona con todos los campos necesarios
      return {
        id:personaDB._id!.toString(),
        name:personaDB.name,
        email:personaDB.email,
        telefono:personaDB.telefono,
        amigos:fromModelAmigo(amigos),
      };
      /*
        Es asincrónica (async) porque necesita realizar una búsqueda en la base de datos 
        para obtener los amigos de esa persona.
        Dado que es asincrónica, esperamos a que se complete 
        la búsqueda de amigos (await amigosCollection.find(...)).
        Además, luego de obtener los documentos de amigos y transformarlos, 
        retornamos el objeto Persona completo
      */
};

export const fromModelAmigo=(amigoDB:PersonaModel[])=> {
      return amigoDB.map((friend) => ({
        id:friend._id!.toString(),
        name:friend.name,
        email:friend.email,
        telefono:friend.telefono,
      }));
};

/*
    La función fromModelAmigo recibe un arreglo de documentos de amigos (amigoDB) 
    y retorna un arreglo de objetos Amigo. 
    Para cada documento de amigo, se crea un objeto Amigo con los campos id, name, email y telefono.
*/


export const checkFriendsExist = async (
  friends: string[],
  PersonCollection: Collection<PersonaModel>,
) => {
  const friendsDB = await PersonCollection.find({
    _id: { $in: friends.map((id) => new ObjectId(id)) },
  }).toArray();
  return friendsDB.length === friends.length;
};
