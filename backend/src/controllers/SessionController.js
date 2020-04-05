const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {id} = request.body;

        const professor = await connection('professors')
            .where('id', id)
            .select('name')
            .first();

        if(!professor){
            return response.status(400).json({error: 'Nenhum professor cadastrado com esse ID'});
        }

        return response.json(professor);
    }
}