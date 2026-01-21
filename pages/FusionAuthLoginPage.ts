import { Locator, Page, test } from '@playwright/test';
import { secureFill, secureClick } from '../utils/secureActions';

export class FusionAuthLoginPage {
  constructor(private readonly page: Page) {}

  readonly loginIdField: Locator = this.page.locator('input[name="loginId"]');
  readonly passwordField: Locator = this.page.locator('input[name="password"]');
  readonly submitButton: Locator = this.page.getByRole('button', { name: 'Submit' });

  async fillLoginAndSubmit(email: string, password: string) {
    // Use secure fill to hide credentials in Allure report
    await secureFill(this.loginIdField, email, 'login email');
    await secureFill(this.passwordField, password, 'password');
    
    // Restart tracing
    await this.page.context().tracing.start({ 
      screenshots: true, 
      snapshots: true,
      sources: true 
    });
    
    // Use secure click
    await secureClick(this.submitButton, 'submit button');
  }

  async waitForFusionAuthPage() {
    await this.page.waitForURL('**/oauth2/authorize**', {
      timeout: 30_000,
    });
  }

  async login(email: string, password: string) {
    await this.waitForFusionAuthPage();
    await this.fillLoginAndSubmit(email, password);
  }
}