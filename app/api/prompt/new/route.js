import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDb();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {status: 200});
  } catch (error) {
    return new Response(JSON.stringify({msg: error.message}), {status: 500});
  }
};
