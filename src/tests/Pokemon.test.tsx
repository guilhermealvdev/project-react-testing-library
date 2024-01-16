import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

describe('Testando o componente Pokemon', () => {
  test('É renderizado o card com as informações do pokemon', async () => {
    renderWithRouter(<App />);
    const nomePokemon = screen.getByTestId('pokemon-name');
    expect(nomePokemon).toBeInTheDocument();

    const tipoPokemon = screen.getByTestId('pokemon-type');
    expect(tipoPokemon).toBeInTheDocument();

    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toBeInTheDocument();

    const imgPokemon = screen.getByAltText('Pikachu sprite');
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
    expect(imgPokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testando link', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByRole('link', { name: 'More details' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/pokemon/25');
  });

  // Em progresso
});
