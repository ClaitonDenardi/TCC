import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import LogoImg from '../../assets/logo.png';


export default function Profile(){
    const professorId = localStorage.getItem('professorId');
    const professorName = localStorage.getItem('professorName');
    const history = useHistory();
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: professorId,
            }
        }).then(response => {
            setProjects(response.data);
        })
    },[professorId]);

    async function handleDeleteproject(id){
        try{
            await api.delete(`projects/${id}`,{
                headers:{
                    Authorization: professorId, 
                }
            });
            setProjects(projects.filter(project => project.id !== id));
        }catch(err){
            alert('Erro ao deletar, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Logo"/>
                <span>Bem vindo(a), {professorName}</span>

                <Link className="button" to="/projects/new">Cadastrar novo projeto</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Projetos cadastrados</h1>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <strong>TÍTULO:</strong>
                        <p>{project.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{project.description}</p>

                        <strong>Bolsa:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(project.holder)}</p>

                        <button type="button" onClick={() => handleDeleteproject(project.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}