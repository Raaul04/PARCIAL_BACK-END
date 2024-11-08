import { MongoClient, ObjectId } from 'mongodb';
//import{ type } from '/types.ts'
//import { isDataView } from "util/types";


const MONGO_URL =Deno.env.get("MONGO_URL");
if(!MONGO_URL){
  console.log("Error de conexion");
  Deno.exit(1);
}
const client = new MongoClient(MONGO_URL);


await client.connect();
console.log('Connected successfully to server');

const db = client.db("baseDatos");

const PersonaCollection = db.collection('persona');
const Amigoscollection = db.collection('amigo');


const handler= async(req:Request):Promise<Response> => {
  const method=req.method;
  const url= new URL(req.url);
  const path=url.pathname;

  if(method==="GET"){
    if(path==="personas"){
      const name=url.searchParams.get("name")
         if(!name){
        return new Response ("Persona no encontrada",{status:402});
      }
      const personadb= await PersonaCollection.find({name}).toArray();
      const persona= personadb.map((b) => {
        name : b.name;
      })

      return new Response(JSON.stringify(persona),{status:404});
    }
    else{
      const personadb=await PersonaCollection.find().toArray();
      const persona=personadb.map(((b)=>{
        //fromModelPersona
      }));

      return new Response(JSON.stringify(persona),{status:404});
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