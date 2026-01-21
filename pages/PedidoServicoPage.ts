// pages/PedidoServicoPage.ts
import { Page, Locator } from '@playwright/test';
import { secureFill, secureClick } from '../utils/secureActions';

export class PedidoServicoPage {
  constructor(private readonly page: Page) {}

  // Botão principal para abrir o formulário
  readonly pedidoServicoButton: Locator = this.page.locator('#service-request-btn');
  
  // Seções expansíveis (accordions)
  readonly dadosOrganizacaoSection: Locator = this.page.locator('text=Dados da Organização').first();
  readonly dadosRegistoSection: Locator = this.page.locator('text=Dados de Registo').first();
  readonly faturacaoSection: Locator = this.page.locator('text=Faturação').first();
  readonly detalhesSection: Locator = this.page.locator('text=Detalhes').first();
  readonly cpeSection: Locator = this.page.locator('text=CPE\'s').first();
  readonly outrasInformacoesSection: Locator = this.page.locator('text=Outras Informações').first();
  
  // Checkbox de termos e condições (clica no label visível ao invés do input hidden)
  readonly termosCheckbox: Locator = this.page.locator('label[for="termsOfAgreement1"], .tg-checkbox-input-wrapper').first();
  
  // Botões de ação
  readonly cancelarButton: Locator = this.page.getByRole('button', { name: 'Cancelar' });
  readonly enviarButton: Locator = this.page.getByRole('button', { name: 'Enviar' });
  
  // Modal de sucesso
  readonly sucessoModal: Locator = this.page.locator('div[role="dialog"]');
  readonly sucessoModalTitle: Locator = this.page.locator('text=Solicitação enviada');
  readonly sucessoModalCloseButton: Locator = this.page.locator('button').first();

  /**
   * Clica no botão "Pedido de serviço" para abrir o formulário
   */
  async clickPedidoServico() {
    await secureClick(this.pedidoServicoButton, 'Pedido de serviço button');
    await this.page.waitForLoadState('load');
  }

  /**
   * Aceita os termos e condições
   */
  async aceitarTermos() {
    // Usa JavaScript puro para marcar o checkbox (mais confiável para elementos ocultos)
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('#termsOfAgreement1') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
        // Dispara eventos para garantir que o framework detecta a mudança
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    // Pequena pausa para o framework processar
    await this.page.waitForTimeout(500);
  }

  /**
   * Clica no botão "Enviar"
   */
  async enviarFormulario() {
    await secureClick(this.enviarButton, 'botão Enviar');
  }

  /**
   * Aguarda o modal de sucesso aparecer
   */
  async aguardarModalSucesso() {
    await this.sucessoModalTitle.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Fecha o modal de sucesso clicando no X
   */
  async fecharModalSucesso() {
    await secureClick(this.sucessoModalCloseButton, 'botão fechar modal');
  }
}