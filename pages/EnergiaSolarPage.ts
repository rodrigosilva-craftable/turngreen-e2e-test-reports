// pages/EnergiaSolarPage.ts
import { Locator, Page } from '@playwright/test';

export class EnergiaSolarPage {
  constructor(private readonly page: Page) {}

  // ---------- LOCATORS ----------
  readonly loginLink: Locator = this.page.getByRole('link', { name: 'Login' });
  readonly pedidoServicoButton: Locator = this.page
    .locator('.tg-btn.tg-btn-primary')
    .first();

 
  // ---------- ACTIONS / FLOW ----------
  async goto() {
    await this.page.goto(
      'https://cms-turngreen.thankfulmoss-0d266d35.northeurope.azurecontainerapps.io/qa-service'
    );
  }

 async clickLogin() {
  // Espera a página carregar completamente
  await this.page.waitForLoadState('networkidle');
  
  // Scroll suave até o elemento
  await this.loginLink.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  
  // Espera um pouco
  await this.page.waitForTimeout(1000);
  
  // Tenta clicar com JavaScript se o click normal falhar
  try {
    await this.loginLink.click({ timeout: 5000 });
  } catch (e) {
    // Se falhar, clica com JavaScript
    await this.loginLink.evaluate((el: HTMLElement) => el.click());
  }
}

  async clickPedidoServico() {
    await this.pedidoServicoButton.click();
  }

  async waitForMicrosoftLogin() {
    await this.page.waitForURL(/login\.microsoftonline\.com/, {
      timeout: 30_000,
    });
  }

  async waitUntilLoggedIn() {
    await this.page.waitForURL(
      url =>
        url
          .toString()
          .includes(
            'cms-turngreen.thankfulmoss-0d266d35.northeurope.azurecontainerapps.io'
          ),
      { timeout: 60_000 }
    );
  }
}
