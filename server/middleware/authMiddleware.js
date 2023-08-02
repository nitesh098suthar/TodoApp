import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        })
    }

    const isIdeal = jwt.verify(token, process.env.JWT_SECRET)

    if (!isIdeal) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        })
    }

    //passing in isIdeal.idOfLoggedInUser Because idIdeal.idOfLoggedInUser isn't accessable in other files

    //req.id is accessable in all files

    req.id = isIdeal.id;

    console.log(isIdeal)
    next();
}