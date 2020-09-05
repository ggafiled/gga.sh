function notFound(req, res, next) {
    res.status(404);
    res.locals.pageData = {
        title: "🔍 - Not Found -"
    };
    next(res.render("error404"));
    // const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    // next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

function setHeader(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://gga-sh.xyz');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

module.exports = {
    notFound,
    errorHandler,
    setHeader
};