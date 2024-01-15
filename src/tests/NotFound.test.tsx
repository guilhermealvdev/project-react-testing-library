import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente NotFound', () => {
  test('É exibido na tela um h2 com o texto', () => {
    renderWithRouter(<NotFound />);

    const h2NotFound = screen.getByRole('heading', { name: 'Page requested not found' });

    expect(h2NotFound).toBeInTheDocument();
  });

  test('Existe img com o src', () => {
    renderWithRouter(<NotFound />);
    const imgElement = screen.getByAltText('Clefairy pushing buttons randomly with text I have no idea what i\'m doing');

    expect(imgElement).toBeInTheDocument();
  });
});
