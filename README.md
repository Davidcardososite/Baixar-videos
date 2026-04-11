

<div align="center">
  
  ![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)
  ![yt-dlp](https://img.shields.io/badge/yt--dlp-Supported-red.svg)
  ![Streamlink](https://img.shields.io/badge/Streamlink-blue.svg)
  ![Flask](https://img.shields.io/badge/Flask-blue.svg)


  
</div>


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
```
## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Davidcardososite/Baixar-videos.git
cd Baixar-videos
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
   - No arquivo `routes.py` altere a parte abaixo para a URL da live copiada que você deseja baixar
## url da live
    if "https://www.youtube.com/live/Ni7rpSHG7xo?si=6RyE_mRUOS3TyWK8" in url:
        print("Baixando live stream do youtube")
        success, error = baixar_streamlink(url, output_path)
        if not success:
            return jsonify({'success': False, 'error': error})
        return jsonify({'success': True, 'video_filename': output_filename})
   Depois de alterar url da live reinicie o app novamente no seu navegador e coloque o mesmo link da live (https://www.youtube.com/live/Ni7rpSHG7xo?si=6RyE_mRUOS3TyWK8) no campo de colar link para baixar a live.

## 📁 Estrutura do Projeto

```
Baixar-videos/
├── app/
│   ├── __init__.py              # Configuração da aplicação Flask
│   ├── routes.py                # Rotas e lógica principal
│   ├── funcoes.py               # Funções utilitárias (progresso, limpeza)
│   ├── baixar_live.py           # Download de lives via Streamlink
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── imagens/
│   ├── templates/
│   │   ├── index.html           # Página principal
│   │   ├── termos.html          # Termos de uso
│   │   └── privacidade.html     # Política de privacidade
│   └── uploads/                 # Pasta temporária para downloads
├── cookies.txt                  # Cookies para autenticação (opcional)
├── run.py                       # Script de inicialização
└── README.md                    # Documentação do projeto
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
Baixe de https://ffmpeg.org/download.html

# Termux
pkg install ffmpeg
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

- Email davidcardosodefarias@gmail.com

- [Instagram](https://www.instagram.com/david_cardoso01/)

Link do Projeto: [https://github.com/Davidcardososite/Baixar-videos](https://github.com/Davidcardososite/Baixar-videos/)

## 🙏 Agradecimentos

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Pela poderosa biblioteca de download
- [Streamlink](https://streamlink.github.io/) - Para download de lives
- [Flask](https://flask.palletsprojects.com/) - Framework web incrível

