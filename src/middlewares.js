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

    res.setHeader('Access-Control-Allow-Origin', 'http://www.gga-sh.xyz,https://code.jquery.com,https://cdn.jsdelivr.net,https://stackpath.bootstrapcdn.com,https://apis.google.com,https://cdn.jsdelivr.net,https://cdnjs.cloudflare.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Security-Policy', "script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com https://apis.google.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://fonts.googleapis.com 'unsafe-eval' 'unsafe-inline';img-src 'self'; style-src 'self' https://stackpath.bootstrapcdn.com https://unpkg.com https://fonts.googleapis.com https://cdn.jsdelivr.net 'unsafe-inline';base-uri 'self';form-action 'self';font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com");
    next();
}

module.exports = {
    notFound,
    errorHandler,
    setHeader
};