import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente PokemonDetails', () => {
  test('Testando as informações detalhadas', () => {
    renderWithRouter(<App />, { route: '/pokemon/148' });
    const pokDet = screen.getByRole('heading', { name: 'Dragonair Details' });
    expect(pokDet).toBeInTheDocument();

    const linkDetalhes = screen.queryByRole('link', { name: 'More details' });
    expect(linkDetalhes).not.toBeInTheDocument();

    const pokSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(pokSummary).toBeInTheDocument();

    const elementoP = screen.getByText('They say that if it emits an aura from its whole body, the weather will begin to change instantly.');
    expect(elementoP).toBeInTheDocument();
  });

  test('Seção mapas', () => {
    renderWithRouter(<App />, { route: '/pokemon/148' });
    const pokLocations = screen.getByRole('heading', { name: 'Game Locations of Dragonair' });
    expect(pokLocations).toBeInTheDocument();

    // Pegando as localizações:
    const imgsLocaisDragonair = screen.getAllByAltText('Dragonair location');
    expect(imgsLocaisDragonair).toHaveLength(2);

    imgsLocaisDragonair.forEach((imagem) => {
      expect(imagem).toBeInTheDocument();
    });

    const srcDoPrimeiroElemento = imgsLocaisDragonair[0].getAttribute('src');
    expect(srcDoPrimeiroElemento).toBe('https://archives.bulbagarden.net/media/upload/2/21/Johto_Route_45_Map.png');

    const srcDoSegundoElemento = imgsLocaisDragonair[1].getAttribute('src');
    expect(srcDoSegundoElemento).toBe('https://archives.bulbagarden.net/media/upload/1/1e/Johto_Dragons_Den_Map.png');

    const altDoPrimeiroElemento = imgsLocaisDragonair[0].getAttribute('alt');
    expect(altDoPrimeiroElemento).toBe('Dragonair location');

    const altDoSegundoElemento = imgsLocaisDragonair[1].getAttribute('alt');
    expect(altDoSegundoElemento).toBe('Dragonair location');
  });
});
