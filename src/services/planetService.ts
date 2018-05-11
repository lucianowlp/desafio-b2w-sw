import { Request, Response, Router } from 'express';
import _ from 'lodash';
import Planet from '../schemas/planetSchema';

export class PlanetRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public all(req: Request, res: Response): void {
        Planet.find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    public parseErrors(nodeRestfulErrors) {
        const errors = []
        _.forIn(nodeRestfulErrors, error => errors.push(error))
        console.log(errors);
        return errors
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

    public routes() {
        this.router.get('/', this.all);
        this.router.post('/', this.create);
    }
}

function parseErrors(err) {
    const errors = [];

    Object.keys(err.errors).forEach(function (field) {
        var eObj = err.errors[field];
        errors.push(eObj.message);
    });

    return errors
}

export default new PlanetRouter().router;