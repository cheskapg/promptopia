import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { connect } from "mongoose";

export const GET = async (request) => {
    try {
        await connectToDb();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 201});
    }
    catch (error) {
        return new Response(JSON.stringify({msg: error.message}), {status: 500});
    }
};
