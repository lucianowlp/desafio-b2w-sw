import * as mongoose from 'mongoose';
import { IPlanet } from '../interfaces/IPlanet';

const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: [true, "O campo nome é obrigatório."],
        unique: true
    },
    climate: {
        type: String,
        default: '',
        required: [true, "O campo clima é obrigatório."]
    },
    terrain: {
        type: String,
        default: '',
        required: [true, "O campo terreno é obrigatório."]
    },
    createdAt: {
        type: Date,
        required: false,
        update: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
});

planetSchema.pre('save', function (next) {
    const planet: IPlanet = this;
    if (this.isNew) {
        planet.createdAt = new Date;
    } else {
        planet.modifiedAt = new Date;
    }

    next();
});

export default mongoose.model('Planet', planetSchema);