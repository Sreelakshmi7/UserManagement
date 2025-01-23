import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const VegetableSchema = new mongoose.Schema({
    vegetableId: { type: String, unique: true, required: true, default: uuidv4 },  
    name: { type: String, required: true },
    color: { 
        type: String, 
        required: true, 
        match: /^#([0-9A-Fa-f]{3}){1,2}$/ 
    },
    price: { type: Number, required: true, min: 0 }, 
});

const Vegetable = mongoose.model('Vegetable', VegetableSchema);

export default Vegetable;
