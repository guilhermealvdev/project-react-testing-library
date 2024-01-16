import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const dragLocal = 'Dragonair location';
const dragPage = '/pokemon/148';

describe('Testando o componente PokemonDetails', () => {
  test('Testando as informações detalhadas', () => {
    renderWithRouter(<App />, { route: dragPage });
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
    renderWithRouter(<App />, { route: dragPage });
    const pokLocations = screen.getByRole('heading', { name: 'Game Locations of Dragonair' });
    expect(pokLocations).toBeInTheDocument();

    // Pegando as localizações:
    const imgsLocaisDragonair = screen.getAllByAltText(dragLocal);
    expect(imgsLocaisDragonair).toHaveLength(2);

    imgsLocaisDragonair.forEach((imagem) => {
      expect(imagem).toBeInTheDocument();
    });

    const srcDoPrimeiroElemento = imgsLocaisDragonair[0].getAttribute('src');
    expect(srcDoPrimeiroElemento).toBe('https://archives.bulbagarden.net/media/upload/2/21/Johto_Route_45_Map.png');

    const srcDoSegundoElemento = imgsLocaisDragonair[1].getAttribute('src');
    expect(srcDoSegundoElemento).toBe('https://archives.bulbagarden.net/media/upload/1/1e/Johto_Dragons_Den_Map.png');

    const altDoPrimeiroElemento = imgsLocaisDragonair[0].getAttribute('alt');
    expect(altDoPrimeiroElemento).toBe(dragLocal);

    const altDoSegundoElemento = imgsLocaisDragonair[1].getAttribute('alt');
    expect(altDoSegundoElemento).toBe(dragLocal);

    const textoMapa1 = screen.getByText('Johto Route 45');
    expect(textoMapa1).toBeInTheDocument();
    const textoMapa2 = screen.getByText('Johto Dragon\'s Den');
    expect(textoMapa2).toBeInTheDocument();
  });

  test('Favoritar na pag detalhes', async () => {
    renderWithRouter(<App />, { route: dragPage });
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
  });
});
