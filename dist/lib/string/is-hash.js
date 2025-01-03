"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHash = void 0;
function isHash(password) {
    const bcryptHashRegex = /^\$2[aby]\$.{56}$/;
    return bcryptHashRegex.test(password);
}
exports.isHash = isHash;
//# sourceMappingURL=is-hash.js.map