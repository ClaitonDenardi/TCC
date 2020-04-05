const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('projects')
            .count();

        const projects = await connection('projects')
            .join('professors', 'professors.id', '=', 'projects.professor_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['projects.*', 
                    'professors.name', 
                    'professors.email', 
                    'professors.siape'
            ]);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(projects);
    },

    async create(request, response){
        const {title, description, holder} = request.body;
        const professor_id = request.headers.authorization;

        const [id] = await connection('projects').insert({
            title,
            description,
            holder,
            professor_id,
        });

        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const professor_id = request.headers.authorization;

        const project = await connection('projects')
            .where('id', id)
            .select('professor_id')
            .first();

        if(project.professor_id !== professor_id){
            return response.status(401).json({ error: 'Operação não permitida!'});
        }

        await connection('projects').where('id', id).delete();

        return response.status(204).send();
    }
};