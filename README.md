Claro! Vou criar um README completo e profissional para o seu projeto. Baseado no código que você mostrou, aqui está:

```markdown
# 📥 YouTube Downloader Web App

Uma aplicação web moderna para download de vídeos e lives do YouTube e outros sites suportados pelo yt-dlp.

## ✨ Funcionalidades

- 🎥 Download de vídeos do YouTube em múltiplas qualidades
- 🔴 Download de lives do YouTube (via Streamlink)
- 📊 Barra de progresso em tempo real com:
  - Velocidade de download (MB/s)
  - Tempo restante estimado
  - Tempo decorrido
- 🧹 Limpeza automática da pasta de uploads (a cada 24 horas)
- 🔒 URLs únicas para cada download
- 📱 Interface responsiva

## 🚀 Tecnologias Utilizadas

- **Backend**: Flask (Python)
- **Download de Vídeos**: yt-dlp
- **Download de Lives**: Streamlink
- **Frontend**: HTML/CSS/JavaScript (com Server-Sent Events)
- **Gerenciamento de Progresso**: tqdm

## 📋 Pré-requisitos

- Python 3.7 ou superior
- pip (gerenciador de pacotes Python)
- FFmpeg (necessário para alguns formatos de vídeo)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/youtube-downloader.git
cd youtube-downloader
```

2. **Crie um ambiente virtual (recomendado)**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. **Instale as dependências**
```bash
pip install flask yt-dlp streamlink tqdm werkzeug
```

4. **Configure os cookies (opcional, mas recomendado)**
- Coloque um arquivo `cookies.txt` na raiz do projeto
- Isso ajuda a evitar bloqueios e permite download de vídeos privados/age-restricted

5. **Estrutura de diretórios necessária**
```bash
mkdir uploads  # A pasta será criada automaticamente
```

## 🎮 Como Usar

1. **Inicie a aplicação**
```bash
python run.py
```

2. **Acesse no navegador**
```
http://localhost:5000
```

3. **Para baixar um vídeo:**
   - Cole a URL do YouTube (ou site compatível)
   - Selecione a qualidade desejada
   - Clique em "Baixar"
   - Aguarde o processamento

4. **Para baixar uma live:**
   - Cole a URL da live do YouTube
   - O sistema detectará automaticamente e usará o Streamlink

## 📁 Estrutura do Projeto

```
youtube-downloader/
├── __init__.py           # Configuração da aplicação Flask
├── routes.py             # Rotas e lógica principal
├── funcoes.py            # Funções utilitárias (progresso, limpeza)
├── baixar_live.py        # Download de lives via Streamlink
├── templates/
│   ├── index.html        # Página principal
│   ├── termos.html       # Termos de uso
│   └── privacidade.html  # Política de privacidade
├── uploads/              # Pasta temporária para downloads
├── cookies.txt           # Cookies para autenticação (opcional)
└── run.py                # Script de inicialização
```

## 🔄 API Endpoints

| Rota | Método | Descrição |
|------|--------|-----------|
| `/` | GET | Página inicial |
| `/upload_youtube` | POST | Envia URL para download |
| `/download/<filename>` | GET | Baixa o arquivo processado |
| `/progress` | GET | SSE stream do progresso do download |
| `/termos` | GET | Termos de uso |
| `/privacidade` | GET | Política de privacidade |

## ⚙️ Configurações

### Qualidades de vídeo disponíveis
- **best**: Melhor qualidade disponível
- **worst**: Pior qualidade
- **bestaudio**: Apenas áudio
- Ou formatos específicos como `137+140` (1080p + áudio)

### Limpeza automática
- A pasta `uploads/` é limpa automaticamente a cada 24 horas
- Arquivos são removidos permanentemente após o download

## 🐛 Solução de Problemas

### Erro: "FFmpeg não encontrado"
Instale o FFmpeg no seu sistema:
```bash
# Ubuntu/Debian
sudo apt install ffmpeg

# MacOS
brew install ffmpeg

# Windows
# Baixe de https://ffmpeg.org/download.html
```

### Erro de download muito lento
- Configure um proxy nas opções do yt-dlp
- Use cookies.txt para melhor performance

### Download de lives não funciona
- Verifique se a live está ativa no momento
- Certifique-se que o Streamlink está instalado corretamente

## 📝 Notas Importantes

- **Respeite os direitos autorais**: Use esta ferramenta apenas para conteúdo permitido
- **Arquivos temporários**: Os vídeos são removidos após 24 horas
- **Uso educacional**: Este projeto foi criado para fins de aprendizado

## 🛠️ Próximas Funcionalidades (Roadmap)

- [ ] Suporte a playlists
- [ ] Download em lote
- [ ] Conversão para MP3
- [ ] Seleção de pasta de destino
- [ ] Autenticação de usuários
- [ ] Histórico de downloads

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Aviso Legal

Este software é fornecido "como está", sem garantias de qualquer tipo. O download de conteúdo protegido por direitos autorais pode violar leis em sua jurisdição. O usuário é inteiramente responsável pelo uso desta ferramenta.

## 📧 Contato

Seu Nome - [@seutwitter](https://twitter.com/seutwitter) - seuemail@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/youtube-downloader](https://github.com/seu-usuario/youtube-downloader)

## 🙏 Agradecimentos

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Pela poderosa biblioteca de download
- [Streamlink](https://streamlink.github.io/) - Para download de lives
- [Flask](https://flask.palletsprojects.com/) - Framework web incrível
```

---

Além disso, crie um arquivo `run.py` na raiz do projeto se ainda não tiver:

```python
# run.py
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
```

E um arquivo `.gitignore`:

```gitignore
venv/
__pycache__/
*.pyc
uploads/
*.mp4
*.webm
*.mkv
cookies.txt
.env
.DS_Store
```

Lembre-se de substituir "seu-usuario" e as informações de contato pelas suas. Este README fornece uma documentação completa e profissional para seu projeto! 🎉

Documentação yt-dlp: https://github.com/yt-dlp/yt-dlp
Use o comando `$ pip install yt-dlp` para instalar o pacote.
Depois de ter instalado o que é necessário do arquivo requirements.txt. Para iniciar o aplicativo web use `$ python run.py`

# Baixar lives com streamlink
Documentação streamlink: https://streamlink.github.io/
Use o comando `$ pip install streamlink` para instalar o pacote.

No arquivo `routes.py` altere a parte abaixo para a URL da live copiada que você deseja baixar
# url da live
    if "https://www.youtube.com/live/Ni7rpSHG7xo?si=6RyE_mRUOS3TyWK8" in url:
        print("Baixando live stream do youtube")
        success, error = baixar_streamlink(url, output_path)
        if not success:
            return jsonify({'success': False, 'error': error})
        return jsonify({'success': True, 'video_filename': output_filename})
Depois de alterar url da live reinicie o app novamente no seu navegador e coloque o mesmo link da live `https://www.youtube.com/live/Ni7rpSHG7xo?si=6RyE_mRUOS3TyWK8` no campo de colar link para baixar a live.
