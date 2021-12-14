const express = require('express');
const mongoose = require('mongoose'); require("../models/Book");
require("../models/Reviews");
require("../models/Users");
const Book = mongoose.model("book");
const User = mongoose.model("users");
const Review = mongoose.model("review");
const axios = require('axios')

const bcrypt = require('bcryptjs');
const users = [
    {
        nome: 'admin',
        email: 'admin@admin',
        eCritico: 1,
        senha: 'admin',
        criticas: []
    },
    {
        nome: 'Rubens',
        email: 'Rubens@123',
        eCritico: 1,
        senha: '1234',
        criticas: []
    },
    {
        nome: 'Steve Rogers',
        email: 'capitao@america',
        eCritico: 0,
        senha: 'escudo',
        criticas: []
    },
    {
        nome: 'Bruce Wayne',
        email: 'batman@forever',
        eCritico: 0,
        senha: 'EuSouBatman',
        criticas: []
    },
    {
        nome: 'Charles Xavier',
        email: 'professor@x',
        eCritico: 0,
        senha: 'xmen',
        criticas: []
    }
]

const livros = [
    {
        titulo: 'Cidade dos Ossos',
        autor: 'Cassandra Clare',
        ano: 2007,
        sinopse: 'Uma aventura que envolve o mito dos nephilim — homens e mulheres que trazem, em suas veias, o sangue de anjos — e que chegou às listas de mais vendidos do New York Times, onde permaneceu por semanas.Cidade dos ossos nos apresenta Clarissa, uma adolescente típica: aos quase 16 anos mora com a mãe, uma jovem artista viúva. Tem um “tio” postiço, Luke, que de certa forma ocupa o lugar do pai e um melhor amigo, Simon, que nutre por ela uma paixão secreta. Quando Simon e Clary visitam um clube, a menina vê três adolescentes matarem um rapaz. Há, porém, dois grandes problemas: ninguém acha o corpo e apenas ela vê os tais assassinos. Sua vida muda completamente. A mãe é raptada por demônios e ela descobre a existência dos Caçadores das Sombras, guerreiros cuja missão é proteger o mundo que conhecemos de bestas e outras criaturas. Vampiros que saem da linha, lobisomens descontrolados, monstros cheios de veneno? É por aí mesmo. E depois desse primeiro contato com o Mundo de Sombras, e com Jace — um Caçador que tem a aparência de um anjo, mas a língua tão afiada quanto Lúcifer —, Clary nunca mais será a mesma.',
        capa: '/capasIniciais/91MWcXJPigL.jpg'
    },
    {
        titulo: 'Heresia – Assassins Creed',
        autor: 'Christie Golden',
        ano: 2016,
        sinopse: 'Um conflito sem fim. Um erro antigo. Uma nova revelação. Simon Hathaway, membro da Ordem Templária, traz uma visão diferente ao seu novo papel como líder da Divisão de Pesquisa Histórica das Indústrias Abstergo. A sua curiosidade é insaciável e está fascinado com a possibilidade de experienciar a História em primeira mão através do seu antepassado Gabriel Laxart, que lutou ao lado da lendária Joana dArc. Mas quando acede ao novo Animus, um projeto que lhe permite reviver a memória genética do seu antepassado, Simon descobre que não está preparado para as descobertas surpreendentes que revelam o conflito entre Templários e Assassinos, e que irão ter um impacto perigoso no seu presente... e no de toda a Ordem Templária. O que fará Gabriel Laxart pela mulher que ama e reverencia? E estará preparado para enfrentar a verdade mais perigosa de todas sobre quem é o herético e quem é o verdadeiro crente?',
        capa: '/capasIniciais/91D5uq8zhWL.jpg'
    },
    {
        titulo: 'Senhor dos Anéis: Asociedade do Anel',
        autor: 'J. R. R. Tolkien',
        ano: 1954,
        sinopse: 'Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso, o hobbit Frodo tem um caminho árduo pela frente, onde encontra perigo, medo e seres bizarros. Ao seu lado para o cumprimento desta jornada, ele aos poucos pode contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando nove seres que formam a Sociedade do Anel.',
        capa: '/capasIniciais/41ILeYndnuL.jpg'
    },
    {
        titulo: 'Duna',
        autor: 'Frank Herbert',
        ano: 1965,
        sinopse: 'Uma estonteante mistura de aventura e misticismo, ecologia e política, este romance ganhador dos prêmios Hugo e Nebula deu início a uma das mais épicas histórias de toda a ficção científica. Duna é um triunfo da imaginação, que influenciará a literatura para sempre.Esta edição inédita, com introdução de Neil Gaiman, apresenta ao leitor o universo fantástico criado por Herbert e que será adaptado ao cinema por Denis Villeneuve, diretor de A chegada e de Blade Runner 2049.',
        capa: '/capasIniciais/81zN7udGRUL.jpg'
    },
    {
        titulo: 'It - A Coisa',
        autor: 'Stephen King',
        ano: 1986,
        sinopse: 'Durante as férias de 1958, em uma pacata cidadezinha chamada Derry, um grupo de sete amigos começa a ver coisas estranhas. Um conta que viu um palhaço, outro que viu uma múmia. Finalmente, acabam descobrindo que estavam todos vendo a mesma coisa: um ser sobrenatural e maligno que pode assumir várias formas. É assim que Bill, Beverly, Eddie, Ben, Richie, Mike e Stan enfrentam a Coisa pela primeira vez. Quase trinta anos depois, o grupo volta a se encontrar. Mike, o único que permaneceu em Derry, dá o sinal ― uma nova onda de terror tomou a pequena cidade. É preciso unir forças novamente. Só eles têm a chave do enigma. Só eles sabem o que se esconde nas entranhas de Derry. Só eles podem vencer a Coisa.',
        capa: '/capasIniciais/itAcoisa.jpg'
    }
]

const criticas = [
    {
        titulo: 'Resenha | Cidade dos Ossos – Cassandra Clare',
        conteudo: 'Cassandra Clare é responsável por escrever a série de seis livros Os Instrumentos Mortais, ganhando fama mundial desde o lançamento do primeiro, Cidade dos Ossos, em 2007. Os livros repercutiram de modo positivo, posteriormente sendo adaptados para filme e série de TV (disponível na Netflix)\nA autora conquistou os fãs através da escrita fluída e personagens marcantes. Clare sabe os ingredientes necessários para criar um enredo convidativo e instigante, personagens profundamente moldados para se tornarem reais na mente do leitor.\nDepois do sequestro da mãe, Clary descobre que os três adolescentes da boate eram, na verdade, Caçadores de Sombras, e o homem assassinado, um membro do Submundo (formado por vampiros, lobisomens, fadas e feiticeiros que coexistem entre os humanos e os nephilins). Ela é levada ao Instituto, local onde vivem os nephilins, onde aprende sobre a criação dos Caçadores de Sombras a partir de três instrumentos mortais dado pelo anjo Raziel.',
        resumo: 'Cassandra Clare é responsável por escrever a série de seis livros Os Instrumentos Mortais, ganhando fama mundial desde o lançamento do primeiro, Cidade dos Ossos, em 2007. Os livros repercutiram de modo positivo, posteriormente sendo adaptados para filme e série de TV (disponível na Netflix)',
        livro: 'Cidade dos Ossos',
        critico: 'admin'
    },
    {
        titulo: 'Livro Assassins Creed: Heresia aborda a origem do game',
        conteudo: 'Conhecer a origem dos conflitos entre Assassinos e Templários pode mudar sua concepção desse embate. E esse é o tema central de Assassin’s Creed: Heresia, novo livro de Christie Golden, que tem como protagonista Simon Hathaway (Templário) e que venceu o Prêmio Scribe de 2017.\n “Membro do salão sagrado interno dos Templários e novo Chefe da Divisão de Pesquisa Histórica das Abstergo Industries, Simon é prático e racional, mas ao mesmo tempo tem uma curiosidade voraz por um de seus antepassados. Gabriel Laxart lutou ao lado de Joana DArc e, ao entrar no Animus, Simon pretende saciar seu desejo vivendo a história dele em primeira mão”, informa a apresentação do livro. “Mas ele não estava preparado para o que veria. Sua descoberta sobre a profundidade do conflito entre Templários e Assassinos e uma revelação sobre hereges e detentores da fé pode afetar toda a Ordem dos Templários no presente.”\n Assim como a série de games é um sucesso absoluto com mais de 90 milhões de unidades vendidas, os livros de Assassin’s Creed são uma surpresa no mercado brasileiro, com mais de 1,5 milhão de exemplares vendidos. \nA autora do livro, Christie Golden, tem mais de 35 romances de ficção e terror, muitos baseados em séries como Star Wars, Star Trek e World of Warcraft. Particularmente, recomendo World of Warcraft: Marés de Guerra, que aborda a era Mists of Pandaria e é um dos melhores da autora.',
        resumo: 'Conhecer a origem dos conflitos entre Assassinos e Templários pode mudar sua concepção desse embate. E esse é o tema central de Assassin’s Creed: Heresia, novo livro de Christie Golden, que tem como protagonista Simon Hathaway (Templário) e que venceu o Prêmio Scribe de 2017.\n “Membro do salão sagrado interno dos Templários e novo Chefe da Divisão de Pesquisa Histórica das Abstergo Industries, Simon é prático e racional,...',
        livro: 'Heresia – Assassins Creed',
        critico: 'Rubens'
    },
    {
        titulo: '8 Lições que aprendemos com Senhor dos Anéis',
        conteudo: '1 - Ter sempre um objetivo claro: Na primeira parte da Trilogia, “A Sociedade do Anel”, Frodo — como o guardião do Anel — é persistente na missão de destruir o objeto no mesmo fogo em que foi forjado por Sauron. Esse é o primeiro e principal objetivo que o levou a formar uma sociedade com: Gandalf, Legolas, Gimli, Aragon, Boromir, Merry, Pippin, Samwise. Se eles não tivessem tudo isso bem estabelecido para si, não teriam porqua formar a irmandade e, assim, partir em uma jornada para cumprir a missão. Da mesma forma, na vida, devemos sempre ter um objetivo claro do que queremos nos tornar e, simultaneamente, seguir o caminho para alcançá-lo.\n 2 - Buscar coragem em todos os momentos: Quem você diria que é o “herói” da série de Tolkien? O Frodo? Afinal, ele era o único que carregava o Anel do Poder para a Montanha da Perdição. Alguns podem pensar que o verdadeiro herói é Gandalf. Sem a sua sabedoria e orientação, a Terra-média certamente teria sido invadida. E Eowyn? Ela era a única que podia derrotar o Rei-Bruxo na batalha.\n Existem muitos personagens que você pode escolher, mas todos têm uma coisa em comum: coragem. Tolkien viveu durante os anos em que a Alemanha nazista estava pronta para ofuscar o mundo e, sem dúvidas, viu pessoas comuns chamadas a realizar atos extraordinários de heroísmo. Como ele escreveu: “Até mesmo a menor das pessoas pode mudar o rumo do futuro”.\n 3. Exercer forte determinação: Isso pode ser reconhecido como referência para o filme. Tome, por exemplo, o momento em que Gandalf supostamente morreu após o ataque do feroz dragão, seguido pela morte de Boromir — quando ele foi surpreendentemente atacado pelo exército de Sauron, enquanto continuava a sua viagem. Apesar de Gandalf e da morte súbita de Boromir, Frodo estava determinado a continuar sua jornada sozinho para cumprir seu objetivo de destruir o Anel, enquanto ele sabia que o mesmo Anel também poderia destruí-lo. Do mesmo modo, na vida, ter um objetivo não necessariamente nos conduz ao sucesso de maneira fácil, mas é preciso seguir sempre esse objetivo com plena determinação.',
        resumo: '1 - Ter sempre um objetivo claro: Na primeira parte da Trilogia, “A Sociedade do Anel”, Frodo — como o guardião do Anel — é persistente na missão de destruir o objeto no mesmo fogo em que foi forjado por Sauron. Esse é o primeiro e principal objetivo que o levou a formar uma sociedade com: Gandalf, Legolas, Gimli, Aragon, Boromir, Merry, Pippin, Samwise. Se eles não tivessem tudo isso bem estabelecido para si, não teriam porqua formar a irmandade e, assim, partir em uma jornada para cumprir a missão.',
        livro: 'Senhor dos Anéis: Asociedade do Anel',
        critico: 'Steve Rogers'
    },
    {
        titulo: 'Resenha: Duna, de Frank Herbert',
        conteudo: 'Em um futuro muito distante, quando a humanidade já se espalhou pelas estrelas e a Terra é apenas uma lembrança (as datas usadas falam do ano dez mil, mas o livro não especifica se isso é depois de Cristo ou existe outro marco), a sociedade é sustentada por quatro pilares: o imperador, as casas nobres, a Guilda Espacial e as Bene Gesserit. O imperador centraliza o poder, as casas nobres lutam entre si por destaque, mas respeitando a autoridade do monarca, a Guilda Espacial tem o monopólio da viagem espacial e do banco do império, e as Bene Gesserit são uma parte de ordem de mulheres com poderes e propósitos estranhos. \n As duas casas principais são a casa dos Atreides e dos Harkonnen, os primeiros considerados uma casa justa e honrada, enquanto os segundos são vistos como degenerados e traiçoeiros. Parte de uma armação envolvendo o imperador e os Harkonnen, a casa de Atreides ganha o planeta de Arrakis. \nConhecido como Duna, o planeta Arrakis é composto por um gigantesco deserto, praticamente nenhuma água, algumas cidades e uma população de beduínos, os fremen. As condições desse planeta são severas ao ponto de qualquer um que sair no deserto vai morrer em poucas horas, se não devidamente protegido por um traje isolante que reaproveita a água do próprio corpo. Mas também é o único lugar da galáxia que se encontra a especiaria, que a Guilda usa para as viagens espaciais. Sem a especiaria é impossível viajar, então ela é o bem mais precioso que existe.',
        resumo: 'Em um futuro muito distante, quando a humanidade já se espalhou pelas estrelas e a Terra é apenas uma lembrança',
        livro: 'Duna',
        critico: 'Bruce Wayne'
    },
    {
        titulo: '5 motivos para ler (ou correr de) It, a Coisa',
        conteudo: 'It - A Coisa se tornou um livro bastante conhecido nos últimos anos por conta das duas adaptações de sucesso para o cinema. Eu conheci o livro por conta da primeira adaptação, aquela lá dos anos 90 com o ator Tim Curry como "Pennywise, o palhaço dançarino" mas me lembro de ter corrido da leitura assim que vi o tamanho do livro: um calhamaço com em torno de 1.100 páginas. Pois então, enrolei e enrolei até que finalmente tomei coragem.\nComo haviam se passado anos que eu tinha assistido a adaptação, resolvi que não assistiria aos filmes novos enquanto não lesse o livro e coloquei isso como meta para 2020. Já não lembrava tanto da história, apenas superficialmente e iniciar a leitura sem saber muito sobre foi maravilhoso e surpreendente, visto que em muitos momentos em me peguei bem chocada com o livro que apesar de ser de ótima qualidade, perde um pouco do ritmo em alguns  trechos.\nAgora que terminei a leitura, além de continuar afirmando que King continua na minha lista de autores favoritos, trouxe também alguns motivos que me chamaram a atenção de forma positiva ou negativa durante a leitura.',
        resumo: 'It - A Coisa se tornou um livro bastante conhecido nos últimos anos por conta das duas adaptações de sucesso para o cinema. Eu conheci o livro por conta da primeira adaptação, aquela lá dos anos 90 com o ator Tim Curry como "Pennywise, o palhaço dançarino" mas me lembro de ter corrido da leitura assim que vi o tamanho do livro: um calhamaço com em torno de 1.100 páginas. Pois então, enrolei e enrolei até que finalmente tomei coragem.',
        livro: 'It - A Coisa',
        critico: 'Charles Xavier'
    }
]

function insertUser() {

    User.find().then((user) => {
        if (user.length > 0) {
            console.log("Já Existem usuários cadastrados");
            return;
        } else {
            users.map((value) => {
                const newUser = new User({
                    nome: value.nome,
                    email: value.email,
                    senha: value.senha,
                    eCritico: value.eCritico
                })


                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newUser.senha, salt, (erro, hash) => {
                        if (erro) {
                            console.log("Não foi possivel salvar o usuário")
                        }

                        newUser.senha = hash;

                        newUser.save().then(() => {
                            console.log("Usuario criado com sucesso!")
                        }).catch((err) => {
                            console.log("Não foi possivel criar o usuário")
                        })

                    })
                })


            })
        }
    })
}

function insirirUsuarios(i) {

    return new Promise((resolve, reject) => {
        //inserir usuario
        User.findOne({ nome: users[i].nome }).then((user) => {
            if (user) {
                console.log(users[i].nome + "  já cadastrado");
                resolve(user._id)
            } else {
                const newUser = new User({
                    nome: users[i].nome,
                    email: users[i].email,
                    senha: users[i].senha,
                    eCritico: users[i].eCritico
                })


                bcrypt.genSalt(10, (erro, salt) => {
                    if (erro) {
                        console.log("Houve um erro ao gerar salt de " + newUser.nome);
                        reject(erro)
                    } else {
                        bcrypt.hash(newUser.senha, salt, (erro, hash) => {
                            if (erro) {
                                console.log("Houve um erro em criptografar a senha de " + newUser.nome)
                                reject(erro)
                            }

                            newUser.senha = hash;

                            return newUser.save((err, usuario) => {

                                if (err) {
                                    console.log("Erro ao cadastrar " + newUser.nome);
                                    reject(err)
                                }
                                console.log(usuario.nome + " criado com sucesso!")
                                resolve(usuario._id)
                            })

                        })
                    }
                })
            }

        })
    })


}

function inserirLivro(i) {
    return new Promise((resolve, reject) => {
        //inserir livro 
        Book.findOne({ titulo: livros[i].titulo }).then((book) => {
            if (book) {
                console.log(livros[i].titulo + " Já esta cadastrado");
                resolve(book._id)
            } else {
                const newBook = new Book({
                    titulo: livros[i].titulo,
                    autor: livros[i].autor,
                    ano: livros[i].ano,
                    sinopse: livros[i].sinopse,
                    capa: livros[i].capa
                })
                return newBook.save((err, livro) => {
                    if (err) {
                        console.log("Erro ao cadastrar " + livro.titulo);
                        reject(err)
                    }
                    console.log(livro.titulo + " criado com sucesso!")
                    resolve(livro._id)
                })

            }
        })
    })

}

function inserirCritica(i, userId, bookId) {
    return new Promise((resolve, reject) => {
        if (!userId || userId == null || !bookId || bookId == null) {
            console.log('Livro ou usuario não encontrado');
            reject('Livro ou usuario não encontrado')
        } else {
            Review.findOne({ titulo: criticas[i].titulo }).then((review) => {
                if (review) {
                    console.log(criticas[i].titulo + " Já esta cadastrado");
                    resolve(criticas[i].titulo + " Já esta cadastrado")
                } else {
                    User.findById(userId).then((user) => {
                        if (!user) {
                            console.log('Critico não encontrado');
                            reject('Critico não encontrado')
                        } else {
                            Book.findById(bookId).then((book) => {
                                if (!book) {
                                    console.log('Livro não encontrado');
                                    reject('Critico não encontrado')
                                } else {
                                    const newReview = new Review({
                                        titulo: criticas[i].titulo,
                                        critico: user._id,
                                        conteudo: criticas[i].conteudo,
                                        resumo: criticas[i].resumo,
                                        livro: book._id
                                    })
                                    return newReview.save((err, critica) => {
                                        Book.findOneAndUpdate(
                                            { _id: newReview.livro },
                                            { $push: { criticas: newReview.id } },
                                            function (err, success) {
                                                if (err) {
                                                    console.log("Este livro não existe")
                                                    reject("Este livro não existe")
                                                }
                                            })
                                        User.findOneAndUpdate(
                                            { _id: newReview.critico },
                                            { $push: { criticas: newReview.id } },
                                            function (err, success) {
                                                if (err) {
                                                    console.log("Este usuario não existe")
                                                    reject("Este usuario não existe")
                                                }
                                            })
                                        if (err) {
                                            console.log("Erro ao cadastrar " + critica.titulo);
                                            reject(err)
                                        }
                                        console.log(critica.titulo + " criado com sucesso!")
                                        resolve(critica._id)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}



module.exports = async function () {
    let userAux;
    let bookAux;
    for (let i = 0; i < criticas.length; i++) {
        await insirirUsuarios(i).then((res)=>{
            userAux = res
        }).catch((err)=>{
            userAux = null
            console.log(err);
        })
        await inserirLivro(i).then((res)=>{
            bookAux = res
        }).catch((err)=>{
            bookAux = null
            console.log(err);
        })
        await inserirCritica(i, userAux, bookAux).catch((err)=>{
            console.log(err);
        })
        console.log("----------------------");
        
    }
    
}

