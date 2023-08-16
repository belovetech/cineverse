"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnknownRoute {
    static handler(req, res, next) {
        try {
            return res.status(400).json({ message: `Can't find ${req.originalUrl} on this server.` });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = UnknownRoute;
//# sourceMappingURL=unknownRoute.controller.js.map