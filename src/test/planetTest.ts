import { IPlanet } from "../interfaces/IPlanet";
import PlanetSchema from '../schemas/planetSchema';
import * as mongoose from 'mongoose';
import { assert, expect } from './test-utils';
import { environment } from '../common/environment';
const request = require('supertest');

mongoose.connect(`${environment.db.url}-test`);

describe("Test API", function () {
    describe("Planets", function () {
        it("Search all the planets", function (done) {
            request(environment.serverTest.url)
                .get('/api/v1/planets')
                .expect(200)
                .end(done);
        })

        it("Create a new planet", function (done) {
            // Cria um objeto do planeta
            let planet: IPlanet = {
                name: "Yavin IV",
                climate: "temperate, tropical",
                terrain: "jungle, rainforests"
            };

            request(environment.serverTest.url)
                .post('/api/v1/planets')
                .send({
                    name: "Yavin IV",
                    climate: "temperate, tropical",
                    terrain: "jungle, rainforests"
                })
                .expect(200)
                .end(function (err, result) {
                    //Verificar se existe a propriedade _id
                    expect(result.body._id).to.exist;

                    //Verificar se é o mesmo nome que foi gravado
                    assert.equal(planet.name, result.body.name);

                    //Verificar se é o mesmo clima que foi gravado
                    assert.equal(planet.climate, result.body.climate);

                    //Verificar se é o mesmo terreno que foi gravado
                    assert.equal(planet.terrain, result.body.terrain);

                    //Verificar se existe a propriedade de data de criação
                    expect(result.body.createdAt).to.exist;

                    //Verificar se não existe a propriedade de data de alteração,
                    //pois se o registro ainda não foi alterado a mesma ficará vazia.
                    expect(result.body.modifiedAt).to.be.not.exist;

                    done();
                })
        })
    })
})