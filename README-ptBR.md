# DStream Bot - Widget de Chat do Discord para OBS

Um bot leve para Discord que funciona como um widget de chat para OBS, exibindo mensagens na sua tela de transmissão com animações elegantes.

## Recursos
- **Comandos simples**: `/start` para começar a monitorar, `/stop` para pausar
- **Exibição de chat elegante**: Animações limpas e aparência personalizável
- **Pronto para OBS**: Fácil de adicionar como fonte de navegador
- **Leve**: Desenvolvido com Bun para desempenho rápido
- **Extensível**: Contribuições são bem-vindas para compatibilidade com Node.js

## Início Rápido

### Pré-requisitos
- [Bun](https://bun.sh/) instalado
- Conta de desenvolvedor do Discord
- Acesso a um servidor do Discord

### Instalação
1. **Clone o repositório**
   ```bash
   git clone https://github.com/seuusuario/dstream-bot.git
   cd dstream-bot
   ```

2. **Instale as dependências**
   ```bash
   bun install
   ```

3. **Configure as variáveis de ambiente**
   - Copie `.env.example` para `.env` no diretório `/bot`
   - Preencha suas credenciais do Discord:
     ```env
     PUBLIC_KEY=sua_chave_publica
     APPLICATION_ID=seu_id_de_aplicativo
     SECRET_KEY=sua_chave_secreta
     SECRET_TOKEN=seu_token_de_bot
     SERVER_ID=seu_id_de_servidor
     # Opcional: Altere a porta padrão se necessário
     SOCKET_PORT=8000
     ```

4. **Execute o bot**
   ```bash
   bun start
   ```

5. **Configure o OBS**
   - Adicione uma Fonte de Navegador no OBS
   - URL: `http://localhost:5173` (ou sua URL de frontend personalizada)
   - Largura: 400px (recomendado)
   - Altura: 600px (recomendado)

## Comandos do Bot

| Comando  | Descrição                                |
|----------|------------------------------------------|
| `/start` | Começa a monitorar o canal atual         |
| `/stop`  | Para de monitorar o canal atual          |

## Configuração do Frontend

O frontend é executado em `http://localhost:5173` por padrão. Você pode configurar:
- **Porta WebSocket**: Deve corresponder à `SOCKET_PORT` do seu bot (padrão: 8000)
- **Aparência**: Personalize cores e layout através de variáveis CSS

## Desenvolvimento

### Executando em modo de desenvolvimento
```bash
bun run dev
```

### Construindo para produção
```bash
bun run build
```

## Contribuindo

Contribuições são bem-vindas! Embora o runtime principal seja Bun, estamos abertos a:
- Patches de compatibilidade para Node.js
- Novos recursos
- Melhorias na interface do usuário
- Correções de bugs

Por favor, abra uma issue para discutir suas mudanças propostas antes de enviar um PR.

## Notas Importantes

1. **A ordem importa**: O bot deve estar em execução antes de iniciar o frontend
2. **Permissões**: Seu bot precisa das seguintes permissões:
   - Permissão para `Visualizar Canais`
   - Permissão para `Ler Histórico de Mensagens`
   - Permissão para `Enviar Mensagens`
3. **Segurança**: Nunca compartilhe seu arquivo `.env`!

## Licença

Licença MIT - Veja [LICENSE](LICENSE) para mais informações.

---

Aproveite suas transmissões com o DStream Bot! Para suporte, por favor abra uma issue no repositório.
