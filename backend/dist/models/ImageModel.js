"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/ImageModel.ts
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    accountId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Account' },
    imageData: { type: Buffer, required: true }
});
const ImageModel = (0, mongoose_1.model)('Image', ImageSchema);
exports.default = ImageModel;
