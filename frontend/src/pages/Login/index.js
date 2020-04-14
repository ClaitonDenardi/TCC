import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();


    async function handleLogin(e){
        e.preventDefault();

        try{
           const response = await api.post('sessions', {id});

           localStorage.setItem('professorId', id);
           localStorage.setItem('professorName', response.data.name);

           history.push('/profile');
        }catch (error) {
            alert("Erro, tente novamente.");
        }
    }

    return(
        <div className="Login-container">
            
            <section className="form">
                <div className="img">
                    <img src={logoImg} alt="Logo"/>
                </div>
                
                <form onSubmit={handleLogin}> 
                    <h1>Faça seu Login</h1>
                    <input 
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    );
}