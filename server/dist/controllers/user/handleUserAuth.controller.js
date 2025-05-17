"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const handleUserAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userName, name, password, userId } = req.body;
    const existingUser = yield prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!existingUser) {
        const newUser = yield prisma.user.create({
            data: {
                name,
                userName,
                email,
                hashedpassword: password,
                accessToken: '1234',
                refreshToken: '1234',
            },
        });
        res.status(200).json({
            success: true,
            message: 'User has been registered successfully.',
            data: newUser,
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: "User already exists.",
        data: existingUser
    });
});
exports.default = handleUserAuth;
