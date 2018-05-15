export interface IPlanet {
    name: String,
    climate: String,
    terrain: String,
    createdAt?: Date,
    modifiedAt?: Date,
    films?: Array<String>
};