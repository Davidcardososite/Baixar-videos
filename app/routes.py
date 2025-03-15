# routes.py
import os
import uuid
import yt_dlp
from .funcoes import my_hook, progress_stream, MyLogger
from baixar_live import baixar_streamlink
from werkzeug.utils import secure_filename
from flask import render_template, request, send_file, Blueprint, jsonify, Response




auth_bp = Blueprint('auth', __name__)


# Obtém o diretório atual do arquivo
base_dir = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(base_dir, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Rota principal
@auth_bp.route('/')
def index():
    return render_template('index.html')
    
    
@auth_bp.route('/termos')
def termos():
    return render_template('termos.html')
    
    
@auth_bp.route('/privacidade')
def privacidade():
    return render_template('privacidade.html')

@auth_bp.route('/progress')
def progress():
    return Response(progress_stream(), mimetype='text/event-stream')





# Rota do formulário
@auth_bp.route('/upload_youtube', methods=['POST'])
def upload_youtube():
    url = request.form.get('youtube_url')
    quality = request.form.get('quality')

    if not url:
        return jsonify({'success': False, 'error': 'Nenhum URL inserido!'})

    # Gerar um ID único para o arquivo de saída
    unique_id = uuid.uuid4()
    output_filename = f'{unique_id}.mp4'
    output_path = os.path.join(UPLOAD_FOLDER, output_filename)

    
    
    # url da live
    if "https://www.youtube.com/live/Ni7rpSHG7xo?si=6RyE_mRUOS3TyWK8" in url:
        print("Baixando live stream do youtube")
        success, error = baixar_streamlink(url, output_path)
        if not success:
            return jsonify({'success': False, 'error': error})
        return jsonify({'success': True, 'video_filename': output_filename})

    
    ydl_opts = {
        'progress_hooks': [my_hook],
        'logger': MyLogger(),
        'format': quality,
        'outtmpl': os.path.join(UPLOAD_FOLDER, f'%(title)s_{unique_id}.%(ext)s'),
        'cookiefile': os.path.join(base_dir, 'cookies.txt'),
        'proxy': '',
        'verbose': True,
        'noplaylist': True,
        'ignoreerrors': True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=True)
            base_filename = ydl.prepare_filename(info_dict)
            video_filename = os.path.splitext(base_filename)[0]

            # Detectando a extensão do arquivo baixado
            for ext in ['.mp4', '.webm', '.mkv']:
                if os.path.exists(video_filename + ext):
                    video_filename += ext
                    break
            else:
                print(f"Arquivo de vídeo não existe: {video_filename}")
                return jsonify({'success': False, 'error': 'Ocorreu um erro ao processar o vídeo'})

        # Sanitizando o nome do arquivo
        video_filename_safe = secure_filename(os.path.basename(video_filename))
        video_path_safe = os.path.join(UPLOAD_FOLDER, video_filename_safe)
        os.rename(video_filename, video_path_safe)



        print(f"Arquivo de vídeo existe: {video_path_safe}")

        return jsonify({'success': True, 'video_filename': os.path.basename(video_path_safe)})

    except Exception as e:
        return jsonify({'success': False, 'error': f'{e}'})




@auth_bp.route('/download/<video_filename>')
def download_file(video_filename):
    try:
        # Sanitizando o nome do arquivo recebido na URL
        video_filename_safe = secure_filename(video_filename)
        return send_file(os.path.join(UPLOAD_FOLDER, video_filename_safe), as_attachment=True)
    except Exception as e:
        print(f"Erro ao baixar o arquivo: {e}")
        return jsonify({'error': f'O arquivo solicitado não foi encontrado. Erro: {e}'})