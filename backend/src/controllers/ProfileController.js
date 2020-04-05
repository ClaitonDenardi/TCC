const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const professor_id = request.headers.authorization;

        const projects =  await connection('projects')
            .where('professor_id', professor_id)
            .select('*');

        return response.json(projects);
    }
};