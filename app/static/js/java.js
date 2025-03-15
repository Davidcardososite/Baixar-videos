

// accordion
var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }




// efeito clean
  const elements = document.querySelectorAll('.search-container2, .logos');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });

  elements.forEach(element => {
    observer.observe(element);
  });





document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.querySelector('.botaohamburger');
    const navList = document.querySelector('.nav_list');
    
    const botaohamburger1 = document.querySelector('.botaohamburger1');
    const botaohamburger2 = document.querySelector('.botaohamburger2');
    const botaohamburger3 = document.querySelector('.botaohamburger3');

    // Adiciona um evento de clique ao ícone do hambúrguer
    hamburgerIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        hamburgerIcon.classList.toggle('open');
        navList.classList.toggle('open');
        
        
        botaohamburger1.classList.toggle('open');
        botaohamburger2.classList.toggle('open');
        botaohamburger3.classList.toggle('open');
    });

    // Adiciona um evento de clique ao documento inteiro
    document.addEventListener('click', function(event) {
        if (!navList.contains(event.target) && navList.classList.contains('open')) {
            
            botaohamburger1.classList.remove('open');
            botaohamburger2.classList.remove('open');
            botaohamburger3.classList.remove('open');
            
            
            navList.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        }
    });
});






$(document).ready(function(){
    $('#video_form').on('submit', function(event){
        event.preventDefault();
        var form_data = new FormData($(this)[0]);
        uploadFiles(form_data, '#converted_files_list', '/upload_youtube');
        
        // mostrar as animações
        document.querySelector('.processando').style.display = 'block';
        document.querySelector('.imagens').style.display = 'block';
        
        $('#progress-info').show();
        
    });
    
    function uploadFiles(form_data, fileListSelector, url) {
        $(fileListSelector).empty();

        $.ajax({
            type: 'POST',
            url: url,
            data: form_data,
            contentType: false,
            processData: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                }, false);
            
                xhr.addEventListener("readystatechange", function(e) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            
                        } else {
                            $('.imagens').hide();
                            
                            $('.processando').hide();
                            
                            $('#progress-info').hide();
                            
                        }
                    }
                });
                
                return xhr;
            },
            success: function(response) {
                if (response.success) {
                    var video_filename = response
                    .video_filename;
                    var downloadLink = $('<a class="download-link" href="/download/' + video_filename + '">Baixar</a>');
                    $(fileListSelector).append(downloadLink);
                    
                    $('.imagens').hide();
                    
                    $('.processando').hide();
                    
                    $('#progress-info').hide();
                    // Esconder a animação em caso de sucesso
                } else {
                    alert('Erro: ' + response.error);
                    $('.imagens').hide();
                    
                    $('.processando').hide();
                    
                    $('#progress-info').hide();
                    // Esconder a animação em caso de erro
                }
            },
            error: function(xhr, status, error) {
                alert("Ocorreu um erro durante a solicitação ao servidor: " + error);
                $('.imagens').hide();
                
                $('.processando').hide();
                
                $('#progress-info').hide();
                // Esconder a animação em caso de erro
            }
        });
    }
    
    function updateProgress(progressStatus) {
    if (progressStatus.status === 'downloading') {
        var downloaded = (progressStatus.downloaded_bytes / (1024 * 1024)).toFixed(2);  // Em MB
        var total = (progressStatus.total_bytes / (1024 * 1024)).toFixed(2);  // Em MB
        var speed = progressStatus.speed;
        var timeRemaining = progressStatus.time_remaining;
        var elapsedTime = progressStatus.elapsed_time;

        // Exibe as informações como "15.6MB [00:05, 2.66MB/s]"
        $('#progress-info').text(`${downloaded}MB [${elapsedTime}, ${speed}] restante: ${timeRemaining}, total:${total}MB`);
    } else if (progressStatus.status === 'finished') {
        $('#progress-info').text("Aguarde");
    }
}

const evtSource = new EventSource("/progress");
evtSource.onmessage = function(event) {
    const progressStatus = JSON.parse(event.data);
    updateProgress(progressStatus);
};


    
});
