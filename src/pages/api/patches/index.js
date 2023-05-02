import dbConnect from "../../../../db/connect";
//import Node from "../../../../db/models/Node.js";
import Patch from "../../../../db/models/Patch";

export default async function handler(request, response) {
  await dbConnect();

  // if (request.method === "GET") {
  //   const nodes = await Node.find();
  //   return response.status(200).json(nodes);
  // } else {
  //   return response.status(405).json({ message: "Method not allowed" });
  // }

  if (request.method === "GET") {
    const patches = await Patch.find();

    return response.status(200).json(patches);
  }

  if (request.method === "POST") {
    try {
      const patchData = request.body;
      const patch = new Patch(patchData);
      await patch.save();
      return response.status(201).json({ status: "Patch created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
