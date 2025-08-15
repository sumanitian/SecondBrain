import { Document, Schema, model } from "mongoose";

interface ShareBrain extends Document {
    hash: String;
    userId: Schema.Types.ObjectId;
}

const shareBrainSchema = new Schema<ShareBrain>(
    {
        hash:{
            type: String,
            unique: true,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

const ShareBrainModel = model("shareBrain", shareBrainSchema);

export default ShareBrainModel;