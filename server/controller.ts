import * as mongoose from 'mongoose';


const CrushSchema = new mongoose.Schema({

    nome: {type: String, required: true},
    apelido: {type: String, unique: true, required: true},
    whatsapp: {type: String, unique: true, required: true},
    createdAt: {type: Date, default: Date.now}
    
});

const model = mongoose.model('Crush', CrushSchema);


class Controller {

    constructor() { }

    // getAll() {
    //     return Crush.find({});
    // }

    
    create(data, res) {       
        // console.log(JSON.parse(data).result);

        this.InsertCrush(JSON.parse(data).result)
        .then(crush => res.status(200).json({'result' : 'dados inseridos'}))
        .catch(err => res.status(400).json({'result' : 'dados atualizados'}));
    }

    InsertCrush(data){
        return model.create(data);
    }

    select(req, res){        
        this.getCrushs()
        .then(crushs => res.status(200).json({'result' : crushs}))
        .catch(err => res.status(400).json({'result' : err}));
    }

    getCrushs(){
        return model.find({});
    }
}

export default Controller