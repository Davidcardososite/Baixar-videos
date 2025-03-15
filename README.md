# Baixar-videos

Documentação yt-dlp: https://github.com/yt-dlp/yt-dlp
Depois de ter instalado o que é necessário do arquivo requirements.txt. Para iniciar o aplicativo web use $ python run.py

Baixar lives com streamlink

$pip install streamlink

no arquivo routes.py altere para a URL da live copiada que você deseja baixar

# url da live
    if "https://www.youtube.com/live/Ni7rpSHG7xo?si=6RyE_mRUOS3TyWK8" in url:
        print("Baixando live stream do youtube")
        success, error = baixar_streamlink(url, output_path)
        if not success:
            return jsonify({'success': False, 'error': error})
        return jsonify({'success': True, 'video_filename': output_filename})
