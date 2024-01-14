import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando a page About', () => {
  test('É exibido um h2 na tela com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2Pokedex = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(h2Pokedex).toBeInTheDocument();
  });

  test('O atributo src da imagem', () => {
    renderWithRouter(<About />);
    const imgElement = screen.getByAltText('Pokédex');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    );
  });
});
