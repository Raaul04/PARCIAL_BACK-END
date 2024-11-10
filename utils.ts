import { Collection } from "mongodb"
import { Persona, Amigo, PersonaModel, AmigoModel } from "./types.ts";


export const fromModelPersona= async (
    //Parametros
    personaDB:PersonaModel,//Documento del mongoDB
    amigosCollecion:Collection<AmigoModel> // La coleccion de amigoModels en Mongo
):Promise<Persona> => {
    // 1. Busca los documentos de los amigos utilizando sus IDs en personaDB.amigos
    const amigos =await amigosCollecion
    .find({_id:{$in:personaDB.amigos}})
    .toArray();
    //2. Transformamos De AmigoModel a Amigo normal usando fromModelAmigo
    const amigoTransformado= amigos.map((amigoDB)=>fromModelAmigo(amigoDB)); 
    
      // 3. Crea y retorna el objeto Persona con todos los campos necesarios
      return {
        id:personaDB._id!.toString(),
        name:personaDB.name,
        email:personaDB.email,
        telefono:personaDB.telefono,
        amigos:amigoTransformado,
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

export const fromModelAmigo=(amigoDB:AmigoModel): Amigo=> ({

        id:amigoDB._id!.toString(),
        name:amigoDB.name,
        email:amigoDB.email,
        telefono:amigoDB.telefono,


})
