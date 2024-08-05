// models/ImageModel.ts
import { model, Schema, Document } from 'mongoose';

export interface ImageDocument extends Document {
    accountId: string;
    imageData: Buffer; // Campo para armazenar o binário da imagem
}

const ImageSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
    imageData: { type: Buffer, required: true }
});

const ImageModel = model<ImageDocument>('Image', ImageSchema);

export default ImageModel;
