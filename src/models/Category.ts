import mongoose from 'mongoose';

interface CategoryModel {
    name: string;
    imageUrl: string;
}

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default CategoryModel;
