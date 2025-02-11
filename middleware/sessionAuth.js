import mongoose from "mongoose";
import signature from "cookie-signature";
export const sessionAuthChecker = async (req, res, next) => {
    try {
        // Ensure cookies are present
        console.log("cookies",req.cookies.user_sID);
        if (!req.cookies || !req.cookies.user_sID) {
            return res.status(401).json({ message: "No session found", success: false });
        }
          let sessionID=req.cookies.user_sID;
         sessionID = signature.unsign(sessionID.substring(2), "apple");
          console.log("Sesion_id",sessionID)
        // Fetch session from MongoDB manually
        const session = await mongoose.connection.db.collection("session").findOne({ _id: sessionID });
        console.log(session);

        if (!session) {
            return res.status(401).json({ message: "Invalid or expired session", success: false });
        }

        

        next(); 
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
};
