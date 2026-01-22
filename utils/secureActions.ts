import { Locator, test } from '@playwright/test';

/**
 * Secure Actions Utility - FINAL VERSION
 * 
 * These functions prevent sensitive data from appearing in Allure reports
 * by using evaluate() to bypass Playwright's automatic action logging.
 */

/**
 * Fill a field without logging the actual value in Allure report
 * 
 * @param locator - The Playwright locator for the field
 * @param value - The actual value to fill (will NOT appear in report)
 * @param fieldDescription - Description to show in report (e.g., "login email", "password")
 */
export async function secureFill(locator: Locator, value: string, fieldDescription: string) {
  await test.step(`Fill ${fieldDescription} (value masked for security)`, async () => {
    // Use evaluate to fill WITHOUT Playwright logging the value
    await locator.evaluate((element: HTMLInputElement, val: string) => {
      element.value = val;
      // Trigger events for React/Vue/Angular compatibility
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('blur', { bubbles: true }));
    }, value);
  });
}

/**
 * Fill login credentials without exposing them in Allure
 * 
 * @param emailLocator - Locator for email/username field
 * @param passwordLocator - Locator for password field
 * @param email - Actual email (will NOT appear in report)
 * @param password - Actual password (will NOT appear in report)
 */
export async function secureLogin(
  emailLocator: Locator,
  passwordLocator: Locator,
  email: string,
  password: string
) {
  await test.step('Enter login credentials (all values masked)', async () => {
    // Fill email using evaluate (no sub-step generated)
    await emailLocator.evaluate((element: HTMLInputElement, val: string) => {
      element.value = val;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('blur', { bubbles: true }));
    }, email);
    
    // Fill password using evaluate (no sub-step generated)
    await passwordLocator.evaluate((element: HTMLInputElement, val: string) => {
      element.value = val;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.dispatchEvent(new Event('blur', { bubbles: true }));
    }, password);
  });
}

/**
 * Click an element with a descriptive step
 * 
 * @param locator - The Playwright locator for the element
 * @param description - Description to show in report
 */
export async function secureClick(locator: Locator, description: string) {
  await test.step(`Click ${description}`, async () => {
    await locator.click();
  });
}