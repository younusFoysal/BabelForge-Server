const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' });
        }
        req.user = decoded;
        next();
    });
};

const verifyAdmin = async (req, res, next) => {
    const user = req.user;
    const usersCollection = req.app.locals.db.collection('users');
    const result = await usersCollection.findOne({ email: user?.email });
    if (!result || result?.role !== 'admin') {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    next();
};

const verifyHost = async (req, res, next) => {
    const user = req.user;
    const usersCollection = req.app.locals.db.collection('users');
    const result = await usersCollection.findOne({ email: user?.email });
    if (!result || result?.role !== 'host') {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin, verifyHost };
