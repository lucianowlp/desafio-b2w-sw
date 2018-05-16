import { Request, Response, Router } from 'express';
import Planet from '../schemas/planetSchema';
import { IPlanet } from '../interfaces/IPlanet';
import { environment } from '../common/environment';
import * as requestPromise from "request-promise";
import { isNumber } from 'util';
import { parseErrors } from '../common/util';

export class PlanetRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    all = (req: Request, res: Response): void => {
        const planet_id = req.param('id');
        const planet_name = req.param('name');
        const searchFor: any = {};

        if (planet_id) {
            searchFor._id = planet_id;
        }

        if (planet_name) {
            searchFor.name = planet_name;
        }

        if (!planet_id || this.planetIdIsValid(planet_id)) {
            Planet.find(searchFor)
                .then((data) => {
                    let promises = [];

                    for (let index = 0; index < data.length; index++) {
                        var options = this.createUrlSearchPlanet(data[index].name);
                        promises.push(requestPromise.get(options)
                            .then(function (planetSW) {
                                return {
                                    _id: data[index]._id,
                                    name: data[index].name,
                                    climate: data[index].climate,
                                    terrain: data[index].terrain,
                                    createdAt: data[index].createdAt,
                                    modifiedAt: data[index].modifiedAt,
                                    filmsQuantity: planetSW.results[0].films.length
                                };
                            })
                            .catch(function (err) {
                                return parseErrors(err);
                            }));
                    }

                    return Promise.all(promises)
                        .then((results) => {
                            return results;
                        })
                        .catch((err) => {
                            return parseErrors(err);
                        });
                })
                .then((planets: any) => {
                    res.status(200).json({ planets });
                })
                .catch((error) => {
                    res.json({ error });
                });
        } else {
            res.status(400).json({ planet: {} });
        }
    }

    create = (req, res) => {
        Planet.create({
            name: req.body.name,
            climate: req.body.climate,
            terrain: req.body.terrain
        }, (err, planet) => {
            if (err) {
                return res.status(400).json({ errors: parseErrors(err) });
            }
            res.status(201).send(planet);
        });
    }

    put = (req, res) => {
        const planet_id = req.param('id');
        const searchFor: any = {};
        if (planet_id) {
            searchFor._id = planet_id;
        }
        if (planet_id && this.planetIdIsValid(planet_id)) {
            Planet.findOneAndUpdate(searchFor, {
                climate: req.body.climate,
                terrain: req.body.terrain,
                modifiedAt: new Date()
            }, { new: true }, (err, planet) => {
                if (err) {
                    return res.status(400).json({ errors: parseErrors(err) });
                }
                res.status(200).send(planet);
            })
        } else {
            res.status(400).json({ errors: [] = 'Identificador inválido ou não informado.' });
        }
    }

    delete = (req, res) => {
        const planet_id = req.param('id');
        const searchFor: any = {};
        if (planet_id) {
            searchFor._id = planet_id;
        }
        if (planet_id && this.planetIdIsValid(planet_id)) {
            Planet.findOneAndRemove({ name: req.body.name },
                (err) => {
                    if (err) {
                        return res.status(400).json({ errors: parseErrors(err) });
                    }
                    res.status(200).send('Registro excluído com sucesso.');
                })
        } else {
            res.status(400).json({ errors: [] = 'Identificador inválido ou não informado.' });
        }
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.post('/', this.create);
        this.router.put('/', this.put);
        this.router.delete('/', this.delete);
    }

    createUrlSearchPlanet(name) {
        return {
            uri: `${environment.urlSWApi}planets/?search=${name}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
    }

    planetIdIsValid(planetId) {
        return planetId.match(/^[0-9a-fA-F]{24}$/);
    }
}

export default new PlanetRouter().router;