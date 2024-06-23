import './App.css';
import { useState } from 'react';

function App() {
  const [id, setId] = useState(1); 
  const [character, setCharacter] = useState(null);
  const [episodeNumbers, setEpisodeNumbers] = useState([]);

 
  function handleInputChange(event) { 
    setId(event.target.value);
  }

  async function fetchCharacter(characterId) {
    if (!characterId) return; 
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json(); 
      setCharacter(data); 

      const numeros_episodios = data.episode.map(episodeUrl => {
        const numeroepisodio = episodeUrl.split('/').pop();
        return numeroepisodio;
      });
      setEpisodeNumbers(numeros_episodios); 
    } catch (error) {
      console.error('Erro ao buscar o personagem:', error);
    }
  }

  
  function handlePrevClick() {
    const newId = id > 1 ? Number(id) - 1 : 1;
    setId(newId);
    fetchCharacter(newId); 
  }

  
  function handleNextClick() {
    const newId = Number(id) + 1;
    setId(newId);
    fetchCharacter(newId); 
  }

  return (
    <>
      <div className="container"> 
        <div className="card caracteristicas-card">
          <img src={character?.image ?? ''} alt="Personagem Imagem" className="personagem-imagem" id="personagemImagem" />
          <h2 className="personagem-nome" id="personagemNome">{character?.name ?? 'Nome do Personagem'}</h2>
          <div className="pesquisar-container">
            <input type="text" placeholder="Id do personagem" onChange={handleInputChange} value={id} className="pesquisar-input" id="personagemIdInput" />
            <button className="pesquisar-botao" onClick={() => fetchCharacter(id)}>Pesquisar</button>
          </div>
          <div className="navegacao-botoes">
            <button className="navegacao-botao" onClick={handlePrevClick}>Anterior</button>
            <button className="navegacao-botao" onClick={handleNextClick}>Próximo</button>
          </div>
        </div>
        <div className="card info-card">
          <h6 className="status" id="status">Status: {character?.status ?? ''}</h6>
          <h6 className="especies" id="especies">Espécies: {character?.species ?? ''}</h6>
          <h6 className="genero" id="genero">Gênero: {character?.gender ?? ''}</h6>
          <h6 className="origem" id="origem">Origem: {character?.origin?.name ?? ''}</h6>
          <h6 className="localidade" id="localidade">Localidade: {character?.location?.name ?? ''}</h6>
          <h6 className="criada" id="criada">Criada: {character ? new Date(character.created).toLocaleDateString() : ''}</h6>
          <h3>Episódios</h3>
          <div id="listaEpisodios" className="lista-episodios">
            {episodeNumbers.join(', ')}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
