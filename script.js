let input = document.querySelector('input');
let setaEsquerda = document.querySelector('.btn-prev');
let setaDireita = document.querySelector('.btn-next');
let setaEsquerdaBranca = document.querySelector('.btn-prev-white');
let setaDireitaBranca = document.querySelector('.btn-next-white');
let listaFilmes = document.querySelector('.movies');
let divModalHiden = document.querySelector('.modal, .hidden')
let body = document.querySelector('body');
let idModal;
let clicouEnter = false
pegarFilmes();
async function pegarFilmes() {
    let urlAPI = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false';
    let resposta = await fetch(urlAPI);
    let { results } = await resposta.json();
    let listaZero = [0, 1, 2, 3, 4];
    let listaUm = [];
    criarLista()
    async function criarLista() {
        for (let i = 0; i < listaZero.length; i++) {
            let divClassMovie = document.createElement('div');
            divClassMovie.classList.add('movie');
            listaFilmes.append(divClassMovie);
            divClassMovie.style.backgroundImage = "url('" + results[listaZero[i]].poster_path + "')";
            listaUm.push(divClassMovie)
            let divClassMovieInfo = document.createElement('div');
            divClassMovieInfo.classList.add('movie__info');
            divClassMovie.append(divClassMovieInfo);

            let spanClassMovieTitle = document.createElement('span');
            spanClassMovieTitle.classList.add('movie__title');
            spanClassMovieTitle.textContent = results[listaZero[i]].title;
            divClassMovieInfo.append(spanClassMovieTitle);

            let spanClassMovieRating = document.createElement('span');
            spanClassMovieRating.classList.add('movie__rating');
            let imgEstrela = document.createElement('img');
            imgEstrela.src = './assets/estrela.svg';
            divClassMovieInfo.append(spanClassMovieRating);
            spanClassMovieRating.textContent = results[listaZero[i]].vote_average;
            spanClassMovieRating.append(imgEstrela);


            divClassMovie.addEventListener('click', async () => {
                if(clicouEnter === true){
                    return
                }
                idModal = results[listaZero[i]].id;
                console.log(idModal)
                let divGenres = document.querySelector('.modal__genres');
                let modalh3 = document.querySelector('.modal__title');
                modalh3.textContent = results[listaZero[i]].title;
                let imgModal = document.querySelector('.modal__img');
                imgModal.src = results[listaZero[i]].backdrop_path;
                let divTexto = document.querySelector('.modal__description');
                divTexto.textContent = results[listaZero[i]].overview;
                let divAverage = document.querySelector('.modal__average');
                divAverage.textContent = results[listaZero[i]].vote_average;
                divModalHiden.classList.remove('hidden');

                let urlApiModal = ' https://tmdb-proxy.cubos-academy.workers.dev/3/movie/' + idModal;
                let respostApiModal = await fetch(urlApiModal);
                let { genres } = await respostApiModal.json();
                genres.forEach((e) => {
                    let spanGenres = document.createElement('span');
                    spanGenres.classList.add('modal__genre');
                    spanGenres.textContent = e.name
                    divGenres.append(spanGenres)
                    divModalHiden.addEventListener('click', () => {
                        divModalHiden.classList.add('hidden');
                        spanGenres.style.display = 'none'
                    });
                })
            });

            let input = document.querySelector('input');
            input.addEventListener('keydown', async (event) => {

                if (event.key === 'Enter') {
                    clicouEnter = true
                    if (input.value === '') {
                        clicouEnter = false
                        listaZero = [0, 1, 2, 3, 4]
                        console.log(listaZero)
                        divClassMovie.style.backgroundImage = "url('" + results[listaZero[i]].poster_path + "')";
                        spanClassMovieTitle.textContent = results[listaZero[i]].title;
                        spanClassMovieRating.textContent = results[listaZero[i]].vote_average;
                        spanClassMovieRating.append(imgEstrela);
                        return
                    };

                    let urlBusca = 'https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=' + input.value + '**';
                    let resposta = await fetch(urlBusca);
                    let respostaFinal = await resposta.json();

                    divClassMovie.style.backgroundImage = "url('" + respostaFinal.results[i].poster_path + "')";
                    spanClassMovieTitle.textContent = respostaFinal.results[i].title;
                    spanClassMovieRating.textContent = respostaFinal.results[i].vote_average;

                    divClassMovie.addEventListener('click', async () => {
                        if(clicouEnter === false){
                            return
                        }
                        idModal = respostaFinal.results[i].id;
                        console.log(idModal)
                        let divGenres = document.querySelector('.modal__genres');
                        let modalh3 = document.querySelector('.modal__title');
                        modalh3.textContent = respostaFinal.results[i].title;
                        let imgModal = document.querySelector('.modal__img');
                        imgModal.src = respostaFinal.results[i].backdrop_path;
                        let divTexto = document.querySelector('.modal__description');
                        divTexto.textContent = respostaFinal.results[i].overview;
                        let divAverage = document.querySelector('.modal__average');
                        divAverage.textContent = respostaFinal.results[i].vote_average;
                        divModalHiden.classList.remove('hidden');

                        let urlApiModal = ' https://tmdb-proxy.cubos-academy.workers.dev/3/movie/' + idModal;
                        let respostApiModal = await fetch(urlApiModal);
                        let { genres } = await respostApiModal.json();
                        genres.forEach((e) => {
                            console.log(e)
                            let spanGenres = document.createElement('span');
                            spanGenres.classList.add('modal__genre');
                            spanGenres.textContent = e.name
                            divGenres.append(spanGenres)
                            divModalHiden.addEventListener('click', () => {
                                divModalHiden.classList.add('hidden');
                                spanGenres.style.display = 'none'
                            });
                        })
                    });

                    input.value = '';
                    spanClassMovieRating.append(imgEstrela);
                };
            });
        };

    };


    setaDireita.addEventListener('click', async () => {
        let listaVoltar = [0, 1, 2, 3, 4];
        let listaFinal = [];
        let indicesDinamicos = 0;
        for (let i = 0; i < listaZero.length; i++) {
            indicesDinamicos = listaZero[i] + 5;
            listaFinal.push(indicesDinamicos)
        };
        listaZero = listaFinal
        for (let i = 0; i < listaUm.length; i++) {
            if (listaZero[0] > 19) {
                listaZero = listaVoltar
            };
            listaUm[i].style.backgroundImage = "url('" + results[listaZero[i]].poster_path + "')";
            listaUm[i].firstChild.firstChild.textContent = results[listaZero[i]].title;
            listaUm[i].firstChild.lastChild.textContent = results[listaZero[i]].vote_average;
            let imgEstrela = document.createElement('img');
            imgEstrela.src = './assets/estrela.svg';
            listaUm[i].firstChild.lastChild.append(imgEstrela)

        };
    });

    setaEsquerda.addEventListener('click', () => {
        let listaVoltar = [15, 16, 17, 18, 19]
        let listaFinal = [];
        let indicesDinamicos = 0;
        for (let i = 0; i < listaZero.length; i++) {
            indicesDinamicos = listaZero[i] - 5;
            listaFinal.push(indicesDinamicos)
        };
        listaZero = listaFinal
        for (let i = 0; i < listaUm.length; i++) {
            if (listaZero[0] < 0) {
                listaZero = listaVoltar
            };

            listaUm[i].style.backgroundImage = "url('" + results[listaZero[i]].poster_path + "')";
            listaUm[i].firstChild.firstChild.textContent = results[listaZero[i]].title;
            listaUm[i].firstChild.lastChild.textContent = results[listaZero[i]].vote_average;
            let imgEstrela = document.createElement('img');
            imgEstrela.src = './assets/estrela.svg';
            listaUm[i].firstChild.lastChild.append(imgEstrela)
        };
    });

    filmeDoDia()
    async function filmeDoDia() {
        let endPointGeral = 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR';
        let resGeral = await fetch(endPointGeral);
        let { backdrop_path, title, vote_average, genres, release_date, overview } = await resGeral.json();
        let divGeral = document.querySelector('.highlight__video');
        let bgImg = 'url(' + backdrop_path + ')';
        divGeral.style.backgroundSize = '602px';
        divGeral.style.backgroundRepeat = 'no-repeat';
        divGeral.style.backgroundImage = bgImg;
        divGeral.style.boxShadow = 'inset 0 0 0 1000px rgba(0,0,0,.6)'
        let h3Geral = document.querySelector('.highlight__title');
        h3Geral.textContent = title
        let spanGeralRating = document.querySelector('.highlight__rating');
        spanGeralRating.textContent = vote_average.toFixed(1);
        let spanGeralGenres = document.querySelector('.highlight__genres');
        spanGeralGenres.textContent = genres[0].name + ', ' + genres[1].name + ', ' + genres[2].name
        let spanGeralLaunch = document.querySelector('.highlight__launch');
        spanGeralLaunch.textContent = release_date;
        let pGeral = document.querySelector('.highlight__description');
        pGeral.textContent = overview
        let endPointVideos = 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR';
        let resVideos = await fetch(endPointVideos);
        let { results } = await resVideos.json();
        let linkVideo = results[0].key;
        let highlightVideoA = document.querySelector('.highlight__video-link');
        highlightVideoA.setAttribute(`href`, `https://www.youtube.com/watch?v=${linkVideo}`)
    };
};

let btnTema = document.querySelector('.btn-theme');
let mudouBtn = false
let divHighlightInfo = document.querySelector('.highlight__info')
let pGeral = document.querySelector('.highlight__description')
let divGenreLunch = document.querySelector('.highlight__genre-launch')
let h2Highlight = document.querySelector('.subtitle')
btnTema.addEventListener('click', () => {
    if (btnTema.src === 'http://127.0.0.1:5500/assets/light-mode.svg') {
        btnTema.src = 'http://127.0.0.1:5500/assets/dark-mode.svg'
        body.style.setProperty('--background-color', '#242424')
        divHighlightInfo.style.opacity = '0.8'
        divHighlightInfo.style.backgroundColor = 'grey'
        pGeral.style.color = 'white'
        divGenreLunch.style.color = 'white'
        input.style.color = 'white'
        h2Highlight.style.color = 'white'
        setaDireita.style.display='none'
        setaEsquerda.style.display = 'none'
        setaDireitaBranca.style.display = 'block'
        setaEsquerdaBranca.style.display = 'block'
    }
    else {
        btnTema.src = 'http://127.0.0.1:5500/assets/light-mode.svg'
        body.style.setProperty('--background-color', '#FFF')
        divHighlightInfo.style.backgroundColor = 'white'
        pGeral.style.color = 'black'
        divGenreLunch.style.color = 'black'
        input.style.color = 'black'
        h2Highlight.style.color = 'black'
        setaDireitaBranca.style.display = 'none'
        setaEsquerdaBranca.style.display = 'none'
        setaDireita.style.display='block'
        setaEsquerda.style.display = 'block'
    }

})