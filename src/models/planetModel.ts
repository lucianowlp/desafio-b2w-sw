import { Document } from "mongoose";
import { IPlanet } from "../interfaces/IPlanet";

export interface IPlanetModel extends IPlanet, Document {
}