import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id).select("-password");
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
      } catch (error) {
        console.error("GET user error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
      }

    case "PUT":
      try {
        const { personal, education, professional } = req.body;

        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }

        // Merge updated fields
        if (personal) Object.assign(user, personal);
        if (education) user.education = education;
        if (professional) user.professional = professional;

        await user.save();

        return res.status(200).json({ success: true, user });
      } catch (error) {
        console.error("PUT user update error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
