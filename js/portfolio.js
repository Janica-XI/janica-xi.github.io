document.addEventListener('DOMContentLoaded', function() {

  const loadingOverlay = document.getElementById('loadingOverlay');

  // Remover o overlay de carregamento quando a página estiver completamente carregada
  window.addEventListener('load', function() {
    setTimeout(function() {
      loadingOverlay.classList.add('hidden');
    }, 500); // Pequeno atraso para garantir um fade-out suave
  });

  // Adicionar evento de redimensionamento para mostrar o overlay durante o redimensionamento
  let resizeTimer;
  window.addEventListener('resize', function() {
    loadingOverlay.classList.remove('hidden'); // Mostrar o overlay durante o redimensionamento
    clearTimeout(resizeTimer); // Limpar o temporizador se já estiver em execução

    // Esconder o overlay após o redimensionamento
    resizeTimer = setTimeout(function() {
      loadingOverlay.classList.add('hidden');
    }, 500);
  });

  const navbarNav = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.nav-link');

  // Adicionar evento de clique para cada link de navegação
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (navbarNav.classList.contains('show')) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        navbarToggler.click(); // Simular o clique para alternar o navbar
      }
    });
  });

  // secção "About"
  document.getElementById('aboutBtn').addEventListener('click', function() {
    document.getElementById('aboutSection').classList.add('active');
  });

  // Funcionalidade do botão de fechar para a secção "About"
  document.querySelector('#aboutSection .close-btn').addEventListener('click', function() {
    document.getElementById('aboutSection').classList.remove('active');
  });

  // secção "MySkills"
  document.getElementById('skillsBtn').addEventListener('click', function() {
    document.getElementById('skillsSection').classList.add('active');
    triggerSkillAnimations(); // Iniciar as animações das habilidades quando a secção estiver visível
  });

  // Fechar a secção "MySkills"
  document.querySelector('#skillsSection .close-btn').addEventListener('click', function() {
    document.getElementById('skillsSection').classList.remove('active');
    resetSkillAnimations(); // Redefinir as animações das Skills
  });

  // Função para ativar animações das Skills
  function triggerSkillAnimations() {
    const skills = document.querySelectorAll('.progress-bar');
    skills.forEach(skill => {
      const skillValue = skill.getAttribute('data-skill');
      skill.style.width = skillValue + '%'; // Animar a barra de progresso
    });
  }

  // Função para redefinir as animações das Skills
  function resetSkillAnimations() {
    const skills = document.querySelectorAll('.progress-bar');
    skills.forEach(skill => {
      skill.style.width = '0%'; // Redefinir a barra de progresso
    });
  }

  // Caixa Modal de Contacto
  document.getElementById('contactBtn').addEventListener('click', function() {
    const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
    contactModal.show();
  });

  // Enviar o formulário de contacto, soltar confettis e mostrar mensagem
  document.getElementById('submitContact').addEventListener('click', function() {
    // Fechar caixa modal
    const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
    contactModal.hide();

    // Soltar confettis
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Exibir mensagem
    setTimeout(function() {
      alert("Não fiz nada mas é a intenção que conta!");
    }, 500); // Atraso para um efeito de confetti mais suave
  });

  // Cartões de projecto
  const projectCards = document.querySelectorAll('.project-card');
  const overlayImage = document.getElementById('overlayImage');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayDescription = document.getElementById('overlayDescription');

  // Abrir caixa modal e preencher o conteúdo quando um projeto for clicado
  projectCards.forEach(card => {
    card.addEventListener('click', function () {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const description = card.getAttribute('data-description');

      if (imgSrc != null) overlayImage.src = imgSrc;
      overlayTitle.textContent = title;
      overlayDescription.textContent = description;
    });
  });

  // Cores aleatórias para o fundo do caixa modal
    var colors = ['#ff00c8e6', '#ffa500e6', '#00b8ffe6', '#c0ff00e6', '#d8b3ffe6'];
  document.getElementById('projectModal').addEventListener('show.bs.modal', function() {
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    this.style.backgroundColor = random_color;
  });

});
