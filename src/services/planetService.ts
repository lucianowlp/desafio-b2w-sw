import { Request, Response, Router } from 'express';
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
    } else if (err.message) {
        errors.push(err.message)
    }

    return errors;
}

function customizeError(errors, err) {
    
    if (err.message) {
        errors.push(err.message)
    }
}

export default new PlanetRouter().router;