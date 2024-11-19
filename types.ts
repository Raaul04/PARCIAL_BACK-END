import { ObjectId } from "mongodb";
import { OptionalId } from "mongodb";

// Tipo para el modelo de Persona en MongoDB
export type PersonaModel = OptionalId<{
    name: string;          // Nombre de la persona
    email: string;         // Email único
    telefono: string;      // Teléfono único
    amigos: ObjectId[];    // Array de IDs de amigos (referencia a otras personas)
}>;

// Tipo para la estructura de datos Persona que utilizará la API
export type Persona = {
    id:string,
    name: string;
    email: string;
    telefono: string;
    amigos: Amigo[];   
};

// Tipo para la estructura de datos Amigo que utilizará la API
export type Amigo = {
    id:string,
    name: string;
    email: string;
    telefono: string;
};
