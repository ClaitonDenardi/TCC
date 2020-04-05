const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const professors = await connection('professors').select('*');
      
          return response.json(professors); 
      },

     async create(request, response){
        const {name, email, siape} = request.body;

        const id = crypto.randomBytes(5).toString('HEX');

        await connection('professors').insert({
            id,
            name,
            email,
            siape,
        })
        
        return response.json({id});
     }
}