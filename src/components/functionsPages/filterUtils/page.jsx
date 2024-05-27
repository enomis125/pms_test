// Função para ativar ou desativar filtro de botão
import React from 'react';

export default function FilterButton({ selectedButton, setSelectedButton }) {
  const handleButtonClick = (buttonIndex) => {
    // Se o botão já estiver selecionado, deseleciona
    if (selectedButton === buttonIndex) {
      setSelectedButton(null); 
    } else {
      setSelectedButton(buttonIndex);
    }
  };

  return handleButtonClick;
}
