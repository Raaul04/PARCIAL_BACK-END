import { MongoClient, ObjectId } from 'mongodb';
import  type { PersonaModel} from './types.ts'
import {fromModelPersona, checkFriendsExist } from "./utils.ts";



const MONGO_URL =Deno.env.get("MONGO_URL");
if(!MONGO_URL){
  console.log("Error de conexion");
  Deno.exit(1);
}
const client = new MongoClient(MONGO_URL);


await client.connect();
console.log('Connected successfully to server');

const db = client.db("baseDatos");
const userCollection = db.collection<PersonaModel>("users");


const handler= async(req:Request):Promise<Response> => {
  const method=req.method;
  const url= new URL(req.url);
  const path=url.pathname;

  if(method==="GET"){
    if(path==="personas"){
      const name=url.searchParams.get("name")

      if(!name){return new Response("No hay nombre",{status:400})}

      const personadb= await userCollection.find({name}).toArray();
      
      /*
      la u es simplemente una variable que 
      representa cada elemento (o documento) en el arreglo personadb 
      al usar el método .map().
      */
      const persona=await Promise.all(personadb.map((u)=>{fromModelPersona(u,userCollection)}))

      return new Response(JSON.stringify(persona),{status:200});  
    } else if(path==="persona"){

        const email=url.searchParams.get("email");
        if(!email){return new Response("No hay email",{status:400})}

        const userDb= await userCollection.findOne({
          email,
        })

        if(!userDb){return new Response("No se encontro el usuario",{status:404})}
    

        const user= await fromModelPersona(userDb,userCollection);
        return new Response(JSON.stringify(user),{status:200});
      }
  }
  else if(method==="POST"){
    if(path==="personas"){
      const personadb= req.body;

     
    }

  }
  else if(method==="PUT"){
    if(path==="persona"){
      const personadb=req.body;

    }else if(path==="persona/amigo"){
      const personadb= req.body;

    }

  }else if(method==="DELETE"){
    const email=url.searchParams.get("email");
    

    
  }

  return new Response("Endpoint not found",{status:404});

}
Deno.serve({port:3000},handler);