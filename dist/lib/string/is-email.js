"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
function isEmail(str) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(str);
}
exports.isEmail = isEmail;
//# sourceMappingURL=is-email.js.map