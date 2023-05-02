import dbConnect from "../../../../../db/connect";
import Patch from "../../../../../db/models/Patch";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PATCH") {
    const patchToUpdate = await Patch.findByIdAndUpdate(id, {
      $set: request.body,
    });

    response.status(200).json(patchToUpdate);
    // If successful, you'll receive an OK status code.
  }

  if (request.method === "DELETE") {
    const patchToDelete = await Patch.findByIdAndDelete(id);

    // This line handles the entire deletion process.
    response.status(200).json(patchToDelete);
  }
}
