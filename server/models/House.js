import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const HouseSchema = new Schema(
    {
        footage: {type: Number, required: true},
        bedrooms: {type: Number, required: true},
        bathrooms: {type: Number, required: true},
        year: {type: Number, required: true},
        price: {type: Number, required: true, min: 1},
        imgUrl: {type: String, default: 'https://placehold.id/200x200'},
        description: {type: String},

        creatorId: {type: Schema.Types.ObjectId, ref: 'Account'}
    },
    {timestamps: true, toJSON: {virtuals: true}}
)