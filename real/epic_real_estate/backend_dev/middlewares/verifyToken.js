
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({msg: "Not Authorized. Token absent"})

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1] //fst from sec eg ["bearer", "hsgvgs"]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
            if(err) return res.status(403).json({msg: "wrong or expired token,"})
            else {
                req.user = data //data = {id: user._id}
                next()
            }
        })
    } 
}

module.exports = verifyToken


// const jwt = require("jsonwebtoken")

// const verifyToken = async(req, res, next) => {
//     if(!req.headers.authorization) return res.status(403).json({msg: 'Not authorized. No token'})

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
//         const token = req.headers.authorization.split(' ')[1]
//         jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
//             if(err) return res.status(403).json({msg: 'Wrong or expired token'})
//             else {
//                 req.user = data // data = {id: user._id}
//                 next()
//             }
//         })
//     }
// }

// module.exports = verifyToken