import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import mockApi from './helpers/mockApi';
import App from '../App';

describe('Teste da tela de Login', () => {
  const nameInput = 'input-player-name';
  const emailInput = 'input-gravatar-email';
  const buttonPlay = 'btn-play';
  const buttonSettings = 'btn-settings';

  it('se aparece os inputs', () => {
    renderWithRouterAndRedux(<App />);
    const screenName = screen.getByTestId(nameInput);
    const screenEmail = screen.getByTestId(emailInput);
    const screenBtnPlay = screen.getByTestId(buttonPlay);
    const screenBtnSettings = screen.getByTestId(buttonSettings);
    expect(screenName).toBeInTheDocument();
    expect(screenEmail).toBeInTheDocument();
    expect(screenBtnPlay).toBeInTheDocument();
    expect(screenBtnSettings).toBeInTheDocument();
  });

  it(
    'se o botão de jogar inicia desabilitado e habilita depois de digitar o nome e email',
    () => {
      renderWithRouterAndRedux(<App />);
      const screenName = screen.getByTestId(nameInput);
      const screenEmail = screen.getByTestId(emailInput);
      const screenBtnPlay = screen.getByTestId(buttonPlay);
      expect(screenBtnPlay).toBeDisabled();

      userEvent.type(screenName, 'user');
      userEvent.type(screenEmail, 'email@test1.com');
      expect(screenBtnPlay).not.toBeDisabled();
    },
  );

  it('se o botão play redireciona para a o componente Game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const screenName = screen.getByTestId(nameInput);
    const screenEmail = screen.getByTestId(emailInput);
    const screenBtnPlay = screen.getByTestId(buttonPlay);
    expect(history.location.pathname).toBe('/');
    expect(screenBtnPlay).toBeDisabled();

    userEvent.type(screenName, 'user');
    userEvent.type(screenEmail, 'email@test2.com');
    expect(screenBtnPlay).not.toBeDisabled();

    userEvent.click(screenBtnPlay);
    history.push('/game');
    await waitFor(() => { expect(history.location.pathname).toBe('/game'); });
  });

  it('se o botão settings redireciona para o componente Settings', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const screenBtnSettings = screen.getByTestId(buttonSettings);
    expect(history.location.pathname).toBe('/');

    userEvent.click(screenBtnSettings);
    history.push('/settings');
    await waitFor(() => { expect(history.location.pathname).toBe('/settings'); });
  });

  it('se o token esta no localStorage', async () => {
    localStorage.setItem('token', mockApi.token);
    const spyOn = jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    const screenName = screen.getByTestId(nameInput);
    const screenEmail = screen.getByTestId(emailInput);
    const screenBtnPlay = screen.getByTestId(buttonPlay);

    userEvent.type(screenName, 'user');
    userEvent.type(screenEmail, 'email@test3.com');
    userEvent.click(screenBtnPlay);

    history.push('/game');
    await waitFor(() => { expect(history.location.pathname).toBe('/game'); });
    await (waitFor(() => expect(spyOn).toHaveBeenCalled()));
  });
});
