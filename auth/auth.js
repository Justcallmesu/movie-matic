exports.isAdmin = (req, res, next) => {
    const { cookies: { userToken } } = req;

    if (!userToken) return next();
}