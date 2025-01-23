import Vegetable from '../../models/mongo/vegetableSchema.js';
// Create a new vegetable
export async function createVegetable(req, res) {
    try {
        const name = req?.body?.name ?? null;
        const color = req?.body?.color ?? null;
        const price = req?.body?.price ?? null;
        
        const vegetable = new Vegetable({ color, price, name });
        await vegetable.save();
        res.status(201).json({
            message: 'Vegetable created successfully',
            vegetable,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while creating vegetable',
            error: err.message,
        });
    }
}

// Get all vegetables
export async function getAllVegetables(req, res) {
    try {
        const vegetables = await Vegetable.find();

        if (vegetables.length === 0) {
            return res.status(404).json({ message: 'No vegetables found' });
        }

        res.status(200).json(vegetables);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while fetching vegetables',
            error: err.message,
        });
    }
}

// Get a vegetable by ID
export async function getVegetableById(req, res) {
    try {
        const vegetableId = req.params.vegetable_id;
        const vegetable = await Vegetable.findOne({ vegetableId });  
        if (!vegetable) {
            return res.status(404).json({ message: 'Vegetable not found' });
        }

        res.status(200).json(vegetable);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while fetching vegetable',
            error: err.message,
        });
    }
}


// Update vegetable by ID
export async function updateVegetableById(req, res) {
    try {
        const vegetableId = req.params.vegetable_id;
        const name = req?.body?.name ?? null;
        const color = req?.body?.color ?? null;
        const price = req?.body?.price ?? null;
        const updateData = { name, color, price };
        const updatedVegetable = await Vegetable.findOneAndUpdate({ vegetableId: vegetableId }, updateData, { new: true });

        if (!updatedVegetable) {
            return res.status(404).json({ message: 'Vegetable not found' });
        }

        res.status(200).json(updatedVegetable);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while updating vegetable',
            error: err.message,
        });
    }
}


// Delete vegetable by ID
export async function deleteVegetableById(req, res) {
    try {
        const vegetableId = req.params.vegetable_id;
        const vegetable = await Vegetable.findOneAndDelete(vegetableId);

        if (!vegetable) {
            return res.status(404).json({ message: 'Vegetable not found' });
        }

        res.status(200).json({
            message: 'Vegetable deleted successfully',
            vegetable,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while deleting vegetable',
            error: err.message,
        });
    }
}


