export const notFound = (err, req, res, next) => {
    if (err && err.status === 400) {
        res
            .status(400)
            .send({ message: err.message || "I Not found!", errors: err.errors || []})
    }
    next()
}

export const forbidden = (err, req, res, next) => {
    if (err && err.status === 403) {
        res.status(403).send({ message: err.message || "Forbidden. I'm calling the police!!" })
    }
    next()
}

export const catchAllErrorHander = (err, req, res, next) => {
    if (err) {
        if (!req.headersSent) {
            res.status(err.status || 500).send({ message: err.message || "Something went wrong!" })
        }
    }
    next()
}