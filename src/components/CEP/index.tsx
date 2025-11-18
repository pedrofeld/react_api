import axios from "axios";
import { useState } from "react";

interface IAddress {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

function FindCEP() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<IAddress | null>(null);

  async function fetchAddress(): Promise<void> {
    try {
      const response = await axios.get<IAddress>(
        `https://viacep.com.br/ws/${cep}/json/`
      );
      setAddress(response.data);
    } catch {
      throw new Error('Erro ao buscar endereço')
    }
  }
  
  return (
    <>
      <h1>Pesquise o endereço pelo CEP</h1>
      <input 
        type="text" 
        value={cep} 
        onChange={(event) => setCep(event.target.value)} 
        placeholder="Digita o CEP desejado"
      />
      <button onClick={fetchAddress}>Pesquisar</button>

      {address && (
        <div>
          <p><span>Logradouro:</span> {address.logradouro}</p>
          <p><span>Bairro:</span> {address.bairro}</p>
          <p><span>Cidade:</span> {address.localidade}</p>
          <p><span>UF:</span> {address.uf}</p>
        </div>
      )}
    </>
  )
}

export default FindCEP