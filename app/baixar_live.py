import subprocess

def baixar_streamlink(url, output_path):
    try:
        # Comando para capturar a live stream usando streamlink
        streamlink_cmd = ['streamlink', '--default-stream', 'best', url, '-o', output_path]

        # Executa o comando
        result = subprocess.run(streamlink_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Verifica se houve algum erro
        if result.returncode != 0:
            print(f"Erro ao baixar live stream: {result.stderr.decode('utf-8')}")
            return False, result.stderr.decode('utf-8')

        print(f"Live stream baixada com sucesso: {output_path}")
        return True, None
    except Exception as e:
        print(f"Erro inesperado ao baixar live stream: {e}")
        return False, str(e)