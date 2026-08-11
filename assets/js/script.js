// Selecionar a seção about
const about = document.querySelector("#about");

const swiperWrapper = document.querySelector(".swiper-wrapper");

const perfilReserva = {
  name: 'Guilherme Sandoli',
  avatar_url: './assets/img/fotoProfissional1.png',
  html_url: 'https://github.com/guitxc',
  followers: 29,
  public_repos: 28,
};

const projetosReserva = [
  {
    name: 'blog_pessoal',
    language: 'Java',
    description: 'O Blog Pessoal é uma API REST com Java e Spring Boot.',
    html_url: 'https://github.com/guitxc/blog_pessoal',
    homepage: '',
  },
  {
    name: 'IA_previcoes',
    language: 'Jupyter Notebook',
    description: 'Projeto Python IA: Inteligência Artificial de Previsões.',
    html_url: 'https://github.com/guitxc/IA_previcoes',
    homepage: '',
  },
  {
    name: 'conta_bancaria',
    language: 'Java',
    description: 'Sistema de gestão para simular operações financeiras.',
    html_url: 'https://github.com/guitxc/conta_bancaria',
    homepage: '',
  },
  {
    name: 'portifolio_t',
    language: 'HTML',
    description: 'Portfólio pessoal desenvolvido com HTML, CSS e JavaScript.',
    html_url: 'https://github.com/guitxc/portifolio_t',
    homepage: '',
  },
  {
    name: 'Projeto_Final_Bloco_02',
    language: 'Java',
    description: 'Projeto final desenvolvido com Java.',
    html_url: 'https://github.com/guitxc/Projeto_Final_Bloco_02',
    homepage: '',
  },
  {
    name: 'teste-backend',
    language: 'Python',
    description: 'Projeto de testes para backend desenvolvido em Python.',
    html_url: 'https://github.com/guitxc/teste-backend',
    homepage: '',
  },
];

async function getAboutGithub() {
    try {
        if (!about) {
            return;
        }

        const response = await fetch("https://api.github.com/users/guitxc");

        if (!response.ok) {
            throw new Error(`GitHub API respondeu com status ${response.status}`);
        }

        const perfil = await response.json();

        about.innerHTML = `

          <figure class="about-image">
            <img
              src="${perfil.avatar_url}"
              alt="${perfil.name}"
            >
          </figure>

          <!-- Conteúdo da Seção About -->
          <article class="about-content">
            <h2>Sobre mim</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur 
              adipisicing elit. Hic minima quidem perferendis 
              ut eius similique autem consectetur quisquam. 
              Ducimus at molestias illo obcaecati animi pariatur 
              voluptate eligendi fugit cupiditate nemo?
            </p>
            <p>
              Mussum Ipsum, cacilds vidis litro abertis. 
              Nec orci ornare consequat. Praesent lacinia 
              ultrices consectetur. Sed non ipsum felis. 
              Admodum accumsan disputationi eu sit. 
              Vide electram sadipscing et per. 
              Em pé sem cair, deitado sem dormir, 
              sentado sem cochilar e fazendo pose. 
              Praesent malesuada urna nisi, 
              quis volutpat erat hendrerit non. 
              Nam vulputate dapibus.
            </p>

            <!-- Links (GitHub + Curriculo) e Dados do GitHub-->
            <div class="about-buttons-data">

              <!-- Links -->
              <div class="buttons-container">
                <a href="${perfil.html_url}" target="_blank" rel="noopener noreferrer" class="botao">GitHub</a>
                <a href="#" target="_blank" class="botao-outline">Currículo</a>
              </div>

              <!-- Dados - Repósitório Github -->
              <div class="data-container">

                <!-- Numero de Seguidores -->
                <div class="data-item">
                  <span class="data-number">${perfil.followers}</span>
                  <span class="data-label">Seguidores</span>
                </div>

                <!-- Numero de Repositórios Públicos -->
                <div class="data-item">
                  <span class="data-number">${perfil.public_repos}</span>
                  <span class="data-label">Repositórios</span>
                </div>

              </div>

            </div>
          </article>
        `
    }
    catch (error) {
        console.error("Erro ao buscar dados do GitHub:", error);

        about.innerHTML = `
          <figure class="about-image">
            <img src="${perfilReserva.avatar_url}" alt="${perfilReserva.name}">
          </figure>
          <article class="about-content">
            <h2>Sobre mim</h2>
            <p>Sou desenvolvedor Full Stack em formação, com foco em Java, APIs REST e desenvolvimento web.</p>
            <p>Conheça meus projetos e entre em contato para conversarmos.</p>
            <div class="about-buttons-data">
              <div class="buttons-container">
                <a href="${perfilReserva.html_url}" target="_blank" rel="noopener noreferrer" class="botao">GitHub</a>
                <a href="#" target="_blank" class="botao-outline">Currículo</a>
              </div>
              <div class="data-container">
                <div class="data-item">
                  <span class="data-number">${perfilReserva.followers}</span>
                  <span class="data-label">Seguidores</span>
                </div>
                <div class="data-item">
                  <span class="data-number">${perfilReserva.public_repos}</span>
                  <span class="data-label">Repositórios</span>
                </div>
              </div>
            </div>
          </article>
        `;
    }
}

async function getProjectsGithub() {
    try {
        if (!swiperWrapper) {
            return;
        }

        const response = await fetch("https://api.github.com/users/guitxc/repos?sort=updated&per_page=6");

        if (!response.ok) {
            throw new Error(`GitHub API respondeu com status ${response.status}`);
        }

        const repositorios = await response.json();

        swiperWrapper.innerHTML = ''

        // Ícones das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        repositorios.forEach(repo => {
            const linguagem = repo.language || 'GitHub'
            const icone = linguagens[linguagem] ?? linguagens['GitHub']
            const urlIcone = `./assets/icons/languages/${icone}.svg`;

            // Formata o Nome do Repositório
            const nomeFormatado = repo.name
                .replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
                .replace(/\s+t[a-z0-9]+$/i, '') // Remove a identificação de turma
                .toUpperCase() // Converte a string em letras maiúsculas

            // Função para truncar texto

            // Se a descrição possuir mais de 100 carcateres

            // seleciona os primeiros 97 e acrescenta '...' no final

            // Senão retorna o mesmo texto

            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            const descricao = repo.description
                ? truncar(repo.description, 100)
                : 'Projeto desenvovimento no GitHub.'

            // tags
            const tags = repo.topics?.length > 0
                ? repo.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`

            // Cria o botao deploy

            const botaoDeploy = repo.homepage
                ? `<a href="${repo.homepage}" target="_blank" class="botao-outline">Deploy</a>`
                : ''

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repo.html_url}" target="_blank" class="botao botao-sm">
                    GitHub
                </a>
            ${botaoDeploy}
        </div>
      `;

            // Constrói o Card
            swiperWrapper.innerHTML += `
            <div class="swiper-slide">
 
                <article class="project-card">
 
                <!-- Ícone da Tecnologia padrão do projeto -->
                <figure class="project-image">
                    <img src="${urlIcone}"
                     alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                    >
                </figure>
 
              <!-- Conteúdo do Projeto -->
            <div class="project-content">
 
                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>
 
                <!-- Tags do Projeto -->
            <div class="project-tags">
                  ${tags}
            </div>
 
            ${botoesAcao}
 
              </div>
 
            </article>
 
          </div>
      `
        })

        iniciarSwiper();


    } catch (error) {
        console.error("Erro ao buscar projetos do GitHub:", error);

      swiperWrapper.innerHTML = projetosReserva.map(repo => {
        const linguagens = {
          Java: 'java',
          HTML: 'html',
          'Jupyter Notebook': 'python',
        };
        const icone = linguagens[repo.language] || 'github';
        const nome = repo.name.replace(/[-_]/g, ' ').toUpperCase();

        return `
          <div class="swiper-slide">
            <article class="project-card">
              <figure class="project-image">
                <img src="./assets/icons/languages/${icone}.svg" alt="Ícone de ${repo.language}">
              </figure>
              <div class="project-content">
                <h3>${nome}</h3>
                <p>${repo.description}</p>
                <div class="project-tags">
                  <span class="tag">${repo.language}</span>
                </div>
                <div class="project-buttons">
                  <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="botao botao-sm">GitHub</a>
                </div>
              </div>
            </article>
          </div>
        `;
      }).join('');

      iniciarSwiper();
    }
}

function iniciarSwiper() {
  if (typeof Swiper === 'undefined' || !document.querySelector('.projects-swiper')) {
    return;
  }

	new Swiper('.projects-swiper', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 24,
		centeredSlides: false,
    loop: false,
		watchOverflow: true,
 
		breakpoints: {
			0: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 40,
				centeredSlides: false,
			},
			769: {
				slidesPerView: 2,
        slidesPerGroup: 1,
				spaceBetween: 40,
				centeredSlides: false,
			},
			1025: {
				slidesPerView: 3,
        slidesPerGroup: 1,
				spaceBetween: 54,
				centeredSlides: false,
			},
		},
 
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
 
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},
 
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},
 
		grabCursor: true,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
	})
}

// Formulário

const formulario = document.querySelector('#formulario')
 
// Expressão Regular de validação do e-mail

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 
formulario.addEventListener('submit', function (event) {

	event.preventDefault()
 
	document

		.querySelectorAll('form span')

		.forEach((span) => (span.innerHTML = ''))
 
	let isValid = true
 
	const nome = document.querySelector('#nome')

	const erroNome = document.querySelector('#erro-nome')
 
	if (nome.value.trim().length < 3) {

		erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'

		if (isValid) nome.focus()

		isValid = false

	}
 
	const email = document.querySelector('#email')

	const erroEmail = document.querySelector('#erro-email')
 
	if (!email.value.trim().match(emailRegex)) {

		erroEmail.innerHTML = 'Digite um endereço de e-mail válido'

		if (isValid) email.focus()

		isValid = false

	}
 
	const assunto = document.querySelector('#assunto')

	const erroAssunto = document.querySelector('#erro-assunto')
 
	if (assunto.value.trim().length < 5) {

		erroAssunto.innerHTML =

			'O assunto deve ter no mínimo 5 caracteres'

		if (isValid) assunto.focus()

		isValid = false

	}
 
	const mensagem = document.querySelector('#mensagem')

	const erroMensagem = document.querySelector('#erro-mensagem')
 
	if (mensagem.value.trim().length === 0) {

		erroMensagem.innerHTML = 'A mensagem não pode ser vazia'

		if (isValid) mensagem.focus()

		isValid = false

	}
 
	if (isValid) {

		const submitButton = formulario.querySelector(

			'button[type="submit"]',

		)

		submitButton.disabled = true

		submitButton.textContent = 'Enviando...'
 
		formulario.submit()

	}

})

 


getAboutGithub();
getProjectsGithub();