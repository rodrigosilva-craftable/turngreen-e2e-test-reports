// tests/oportunidades.test.ts
import { test, expect } from '@playwright/test';
import { EnergiaSolarPage } from '../pages/EnergiaSolarPage';
import { FusionAuthLoginPage } from '../pages/FusionAuthLoginPage';
import { PedidoServicoPage } from '../pages/PedidoServicoPage';
import { getEnvOrThrow } from '../utils/env';

test.describe('Backoffice Opportunities', () => {
  
  test('Criar oportunidade (fluxo completo) - Login e criação com sucesso', async ({ page }) => {
    const energiaSolarPage = new EnergiaSolarPage(page);
    const fusionAuthLogin = new FusionAuthLoginPage(page);
    const pedidoServicoPage = new PedidoServicoPage(page);

    const email = process.env.FUSION_EMAIL || '';
    const password = process.env.FUSION_PASSWORD || '';

    if (!email || !password) {
      throw new Error('FUSION_EMAIL and FUSION_PASSWORD must be set in .env file');
    }

    // 1) Go to Energia Solar page
    await test.step('Navegar para página Energia Solar', async () => {
      await energiaSolarPage.goto();
    });

    // 2) Click on "Login" and go to FusionAuth login
    await test.step('Clicar no botão Login', async () => {
      await energiaSolarPage.clickLogin();
    });
    
    // 3) Login with FusionAuth credentials
    await test.step('Realizar login com FusionAuth', async () => {
      await fusionAuthLogin.login(email, password);
    });

    // 4) Wait until we're logged in and back to CMS
    await test.step('Aguardar confirmação de login', async () => {
      await energiaSolarPage.waitUntilLoggedIn();
    });

    // 5) Navigate to the Energia Solar backoffice page
    await test.step('Navegar para página QA Service', async () => {
      await page.goto('https://cms-turngreen.thankfulmoss-0d266d35.northeurope.azurecontainerapps.io/qa-service');
      await page.waitForTimeout(5_000);
    });

    // 6) Verificar que estamos na página correta
    await test.step('Validar que estamos na página QA Service', async () => {
      await expect(page.locator('h1, h2, h3').filter({ hasText: 'Quality Assurance Service' })).toBeVisible();
    });

    // 7) Clicar no botão "Pedido de serviço"
    await test.step('Clicar no botão "Pedido de serviço"', async () => {
      await pedidoServicoPage.clickPedidoServico();
      await page.waitForTimeout(2_000);
    });

    // 8) Verificar que o formulário foi aberto
    await test.step('Validar que o formulário está visível', async () => {
      await expect(page.locator('text=Pedido de serviço').first()).toBeVisible();
      await expect(pedidoServicoPage.dadosOrganizacaoSection).toBeVisible();
    });

    // 9) Aceitar termos e condições
    await test.step('Aceitar termos e condições', async () => {
      await pedidoServicoPage.aceitarTermos();
      await page.waitForTimeout(500);
    });

    // 10) Enviar formulário
    await test.step('Clicar no botão Enviar', async () => {
      await pedidoServicoPage.enviarFormulario();
    });

    // 11) Aguardar e validar modal de sucesso
    await test.step('Validar modal de sucesso', async () => {
      await pedidoServicoPage.aguardarModalSucesso();
      await expect(pedidoServicoPage.sucessoModalTitle).toBeVisible();
      await expect(pedidoServicoPage.sucessoModal).toContainText('Vai receber um contacto da equipa do Turn Green');
    });

    // 12) Fechar modal de sucesso
    await test.step('Fechar modal de sucesso', async () => {
      await pedidoServicoPage.fecharModalSucesso();
      await page.waitForTimeout(1_000);
    });

    // 13) Validar que voltamos à página QA Service
    await test.step('Validar retorno à página QA Service', async () => {
      await expect(page.locator('h1, h2, h3').filter({ hasText: 'Quality Assurance Service' })).toBeVisible();
    });
  });
});