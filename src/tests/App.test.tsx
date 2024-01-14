import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  test('Testando os links da Navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavorite = screen.getByText('Favorite Pokémon');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
});

// Realizar testes para os caminhos.
