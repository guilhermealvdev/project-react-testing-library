import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Testando o componente FavoritePokemon', () => {
  test('Testando a mensagem na tela', () => {
    renderWithRouter(<FavoritePokemon />);

    const pNaoEncontrado = screen.getByText('No favorite Pokémon found');

    expect(pNaoEncontrado).toBeInTheDocument();
  });

  test('Se pokemons favoritos são exibidos', async () => {
    renderWithRouter(<App />, { route: 'pokemon/148' });

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    // Checkbox está dentro do FavotireInput.tsx - Que é renderizada na pokemon/148
    await userEvent.click(checkbox);

    renderWithRouter(<FavoritePokemon />);
    const dragonairPokemon = screen.getByText('Dragonair');

    expect(dragonairPokemon).toBeInTheDocument();
  });

  // Passando apenas com 50%
});
