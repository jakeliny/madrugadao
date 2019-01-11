import * as mongoose from 'mongoose';


const CrushSchema = new mongoose.Schema({

    nome: { type: String, required: true },
    apelido: { type: String, unique: true, required: true },
    whatsapp: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now }

});

const model = mongoose.model('Crush', CrushSchema);


class Controller {

    constructor() { }

    //create
    create(data, res) {
        this.InsertCrush(JSON.parse(data).result)
            .then(crush => res.status(200).json({ 'result': 'dados inseridos' }))
            .catch(err => res.status(400).json({ 'result': 'dados atualizados' }));
    }

    InsertCrush(data) {
        return model.create(data);
    }

    //select
    select(req, res) {
        this.getCrushs()
            .then(crushs => res.status(200).json({ 'result': crushs }))
            .catch(err => res.status(400).json({ 'result': err }));
    }

    getCrushs() {
        return model.find({});
    }

    //selectOne
    selectOne(req, res) {
        const id = { _id: req.params.id }

        this.getCrushsByID(id)
            .then(crush => res.status(200).json({ 'result': crush }))
            .catch(err => res.status(400).json({ 'result': err }));
    }

    getCrushsByID(id) {
        return model.find(id);
    }

    //delete
    deleteOne(req, res) {
        const id = { _id: req.params.id }

        this.deleteByID(id)
            .then(crush => res.status(200).json({ 'result': crush }))
            .catch(err => res.status(400).json({ 'result': err }));
    }

    deleteByID(id) {
        return model.deleteOne(id);
    }


    //update
    update(req, res) {
        const id = { _id: req.params.id }
        const crush = req.body;
 
        this.updateCrush(id, crush)
            .then(crush => res.status(200).json({ 'result': crush }))
            .catch(err => res.status(400).json({ 'result': err }));
    }

    updateCrush(id, data) {
        return model.findOneAndReplace(id, data);
    }
}

export default Controller