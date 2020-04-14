import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import{ FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Register(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [siape, setSiape] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            siape
        }

        try{
            const response = await api.post('professors', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }catch (err){
            alert('Erro, tente novamente.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro...</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Já tenho Cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome professor(a)"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}    
                    />
                    <input 
                        placeholder="Siape"
                        value={siape}
                        onChange={e => setSiape(e.target.value)}    
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}