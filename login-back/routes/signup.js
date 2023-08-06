const router = require("express").Router();

const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json(jsonResponse(400, {
            error: "Todos los campos son requeridos"
        }));
    }

    try {
        const user = new User();

        const exists = await user.emailExists(email);

        if (exists) {
            return res.status(400).json(jsonResponse(400, {
                error: "El correo electrónico ya está registrado"
            }));
        }

        const newUser = new User({ email, name, password });

        await newUser.save();

        res.status(200).json(jsonResponse(200, {
            message: "Usuario creado exitosamente"
        }));
    } catch (error) {
        res.status(500).json(jsonResponse(500, {
            error: "Error al crear el usuario"
        }));
    }
});

module.exports = router;