const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo");

router.post("/", async (req, res) => {
    const { email, password } = req.body; // Cambio de "username" a "email"

    if (!email || !password) { // Cambio de "!!username" a "!email"
        return res.status(400).json(jsonResponse(400, {
            error: "Todos los campos son requeridos"
        }));
    }

    // Autenticar usuario

    const user = await User.findOne({ email }); // Cambio de "username" a "email"

    if (user) {
        const correctPassword = await user.comparePassword(password, user.password);

        if (correctPassword) {
            const accessToken = user.createAccessToken();
            const refreshToken = await user.createRefreshToken();

            res.status(200).json(jsonResponse(200, {
                user: getUserInfo(user),
                accessToken,
                refreshToken
            }));
        } else {
            res.status(400).json(jsonResponse(400, {
                error: "Usuario o contraseña incorrectos"
            }));
        }
    } else {
        res.status(400).json(jsonResponse(400, {
            error: "Usuario no encontrado"
        }));
    }
});

module.exports = router;
