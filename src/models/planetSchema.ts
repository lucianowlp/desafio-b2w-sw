import * as restful from 'node-restful';

const mongoose = restful.mongoose;

const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: [true, "O campo nome é obrigatório."]
    },
    climate: {
        type: String,
        default: '',
        required: [true, "O campo clima é obrigatório."]
    },
    ground: {
        type: String,
        default: '',
        required: [true, "O campo terreno é obrigatório."]
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
});

export default restful.model('Planet', planetSchema);