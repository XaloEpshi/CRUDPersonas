import pool from '../database.js';

// Mostrar formulario para agregar persona
export const showAddForm = (req, res) => {
    res.render('personas/add');
};

// Agregar nueva persona
export const addPersona = async (req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const newPersona = { name, lastname, age };
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Listar todas las personas
export const listPersonas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM personas');
        res.render('personas/list', { personas: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mostrar formulario para editar persona
export const showEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ?', [id]);
        if (persona.length === 0) {
            return res.status(404).json({ message: "Persona no encontrada" });
        }
        res.render('personas/edit', { persona: persona[0] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Editar persona
export const editPersona = async (req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const { id } = req.params;
        const editPersona = { name, lastname, age };
        await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Eliminar persona
export const deletePersona = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
