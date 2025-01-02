"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEnvironmentException = void 0;
class InvalidEnvironmentException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidEnvironmentException';
    }
}
exports.InvalidEnvironmentException = InvalidEnvironmentException;
//# sourceMappingURL=invalid-env.exception.js.map