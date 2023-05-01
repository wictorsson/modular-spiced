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
}
