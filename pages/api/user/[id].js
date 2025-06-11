import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();  

  const { query: { id }, method } = req;

  if (method === "GET") {
    try {
      const user = await User.findById(id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
