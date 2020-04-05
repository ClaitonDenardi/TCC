const express = require('express');
const ProfessorController = require('./controllers/ProfessorController');
const ProjectController = require('./controllers/ProjectController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/professors', ProfessorController.index);   
routes.post('/professors', ProfessorController.create);

routes.get('/profile', ProfileController.index);

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.create);
routes.delete('/projects/:id', ProjectController.delete);

module.exports= routes;