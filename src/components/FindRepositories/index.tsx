import axios from "axios";
import { useState } from "react";

interface IRepository {
    id: string
    name: string
}

export default function FindRepositories() {
    const [user, setUser] = useState('');
    const [repoName, setRepoName] = useState('');
    const [repositories, setRepositories] = useState<IRepository[]>([]);

    async function fetchRepositories() {
        try {
            let response;
            
            if (user && repoName){
                response = await axios.get(
                    `https://api.github.com/repos/${user}/${repoName}`
                );
                setRepositories([response.data]);
            } else if (user) {
                response = await axios.get(
                    `https://api.github.com/users/${user}/repos`
                );
                setRepositories(response.data);
            } else if (repoName) {
                response = await axios.get(
                    `https://api.github.com/search/repositories?q=${repoName}`
                );
                setRepositories(response.data.items);
            }   
        } catch {
            throw new Error('Erro ao buscar endereço')
        }
        
    }

    return (
        <>
            <h1>Pesquise repositórios</h1>

            <input 
                type="text" 
                value={user} 
                onChange={(event) => setUser(event.target.value)} 
                placeholder="Nome do usuário"
            />

            <input 
                type="text" 
                value={repoName}
                onChange={(event) => setRepoName(event.target.value)}
                placeholder="Nome do repositório"
            />

            <button onClick={fetchRepositories}>Pesquisar</button>
            
            {repositories.map(repository => (
                <p key={repository.id}>{repository.name}</p>
            ))}
        </>
    )
}