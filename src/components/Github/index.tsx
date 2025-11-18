import axios from "axios";
import { useState } from "react";

interface IRepository {
    id: string
    name: string
}

export function FindRepositories() {
    const [user, setUser] = useState('');
    const [repositories, setRepositories] = useState<IRepository[]>([]);

    async function fetchRepositories() {
        try {
            const response = await axios.get(
                `https://api.github.com/users/${user}/repos`
            )

            setRepositories(response.data as IRepository[]);
        } catch {
            throw new Error('Erro ao buscar endereço')
        }
        
    }

    return (
        <>
            <h1>Pesquise o repositório pelo usuário</h1>
            <input 
                type="text" 
                value={user} 
                onChange={(event) => setUser(event.target.value)} 
                placeholder="Digita o usuário desejado"
            />
            <button onClick={fetchRepositories}>Pesquisar</button>
            {repositories.map(repository => (
                <p key={repository.id}>{repository.name}</p>
            ))}
        </>
    )
}