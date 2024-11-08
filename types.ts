import { ObjectId } from "mongodb";
import { OptionalId } from "mongodb";

export type  PersonaModel=OptionalId<{
    name:string,
    email:string,
    telefono:number,
    Amigos:[ObjectId]
}>

export type AmigoModel=OptionalId<{
    name:string,
    email:string,
    telefono:number,
}>

export type Persona={
    name:string,
    email:string,
    telefono:number,
    Amigos:[]
}
export type Amigo={
    name:string,
    email:string,
    telefono:string,
}