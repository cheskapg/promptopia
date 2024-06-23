import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { connect } from "mongoose";
//GET
export const GET = async (request, {params}) => {
    try {
        await connectToDb();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response(JSON.stringify({msg: 'Prompt not found'}), {status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 200});
    }
    catch (error) {
        return new Response(JSON.stringify({msg: error.message}), {status: 500});
    }
};

export const PATCH = async (request, {params}) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDb();

        const existingPrompt = await Prompt.findById(params.id);    
        if (!existingPrompt) {
            return new Response(JSON.stringify({msg: 'Prompt not found'}), {status: 404});
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.save();
       
        return new Response(JSON.stringify(existingPrompt), {status: 200});
    }
    catch (error) {
        return new Response(JSON.stringify({msg: error.message}), {status: 500});
    }
};
export const DELETE = async (request, {params}) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDb();

        const existingPrompt = await Prompt.findId(params.id);    
        if (!existingPrompt) {
            return new Response(JSON.stringify({msg: 'Prompt not found'}), {status: 404});
        }

        return new Response(JSON.stringify(existingPrompt), {status: 200});
    }
    catch (error) {
        return new Response(JSON.stringify({msg: error.message}), {status: 500});
    }
};
