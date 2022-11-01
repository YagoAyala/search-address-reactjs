import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function teste() {
    if(input === 'string') {
      alert("Preencha algum cep!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("")

    } catch (e) {
      alert("Ops erro ao buscar")
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite o seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />


        <button className="buttonSearch" onClick={teste}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      {Object.keys(cep).length > 1 && (
              <main className="main">
              <h2>CEP: {cep.cep}</h2>
      
              <span>Rua: {cep.logradouro}</span>
              <span>Bairro: {cep.bairro}</span>
              <span>Cidade: {cep.localidade}</span>
              <span>Estado: {cep.uf}</span>
            </main>
      
      )}
      </div>
  );
}

export default App;
