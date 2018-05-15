import { Request, Response, Router } from 'express';
import Planet from '../schemas/planetSchema';
import searchMessage from '../common/customMessage';
import { IPlanet } from '../interfaces/IPlanet';
import { environment } from '../common/environment';
import * as requestPromise from "request-promise";

export class PlanetRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
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

    all = (req: Request, res: Response): void => {
        Planet.find()
            .then((data) => {
                let promises = [];

                for (let index = 0; index < data.length; index++) {
                    var options = this.createUrlSearchPlanet(data[index].name);
                    promises.push(requestPromise.get(options)
                        .then(function (planetSW) {
                            return {
                                name: data[index].name,
                                climate: data[index].climate,
                                terrain: data[index].terrain,
                                createdAt: data[index].createdAt,
                                modifiedAt: data[index].modifiedAt,
                                films: planetSW.results[0].films.length
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
    }

    public create(req, res) {
        Planet.create({
            name: req.body.name,
            climate: req.body.climate,
            terrain: req.body.terrain
        }, (err, planet) => {
            if (err) {
                return res.status(500).json({ errors: parseErrors(err) });
            }
            res.status(200).send(planet);
        });
    }

    public put(req, res) {
        Planet.findOneAndUpdate({ name: req.body.name }, {
            climate: req.body.climate,
            terrain: req.body.terrain,
            modifiedAt: new Date()
        }, { new: true }, (err, planet) => {
            if (err) {
                return res.status(500).json({ errors: parseErrors(err) });
            }
            res.status(200).send(planet);
        });
    }

    public delete(req, res) {
        Planet.findOneAndRemove({ name: req.body.name },
            (err) => {
                if (err) {
                    return res.status(500).json({ errors: parseErrors(err) });
                }
                res.status(200).send('Registro excluído com sucesso.');
            })
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.post('/', this.create);
        this.router.put('/', this.put);
        this.router.delete('/', this.delete);
    }
}

function parseErrors(err) {
    const errors = [];
    if (err.errors) {
        Object.keys(err.errors).forEach(function (field) {
            var eObj = err.errors[field];
            errors.push(eObj.message);
        });
    } else {
        customizeError(errors, err);
    }

    return errors;
}

function customizeError(errors, err) {
    if (err.code) {
        if (searchMessage[err.code]) {
            errors.push(searchMessage[err.code])
        }
    } else if (err.message) {
        errors.push(err.message)
    }
}

export default new PlanetRouter().router;