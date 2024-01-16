import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

describe('Testando o componente Pokemon', () => {
  test('É renderizado o card com as informações do pokemon', async () => {
    renderWithRouter(<App />);
    const nomePokemon = screen.getByText('Pikachu');
    expect(nomePokemon).toBeInTheDocument();

    const tipoPokemon = screen.getByText('Electric', { selector: 'p[data-testid="pokemon-type"]' });
    expect(tipoPokemon).toBeInTheDocument();

    const pesoPokemon = screen.getByText('Average weight: 6.0 kg');
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

  test('Testando redirecionamento', async () => {
    renderWithRouter(<App />);

    const linkElement = screen.getByRole('link', { name: 'More details' });
    expect(linkElement).toBeInTheDocument();
    await userEvent.click(linkElement);
    expect(window.location.pathname).toBe('/pokemon/25');
  });

  test('Icone estrela nos favoritos', async () => {
    renderWithRouter(<App />);

    const linkElement = screen.getByRole('link', { name: 'More details' });
    expect(linkElement).toBeInTheDocument();
    await userEvent.click(linkElement);
    expect(window.location.pathname).toBe('/pokemon/25');

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    const imgFavorita = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorita).toBeInTheDocument();
    expect(imgFavorita).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(imgFavorita).toHaveAttribute('src', '/star-icon.png');
  });
});
