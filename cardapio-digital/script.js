// =========================================================
// CARRINHO
// =========================================================

// Array que armazenará os produtos escolhidos
let carrinho = [];


// =========================================================
// ELEMENTOS DA PÁGINA
// =========================================================


const carrinhoResumo = document.querySelector(
    "#abrir-carrinho"
);

const carrinhoPainel = document.querySelector(
    "#carrinho-painel"
);

const fecharCarrinho = document.querySelector(
    "#fechar-carrinho"
);

const carrinhoProdutos = document.querySelector(
    "#carrinho-produtos"
);

const carrinhoQuantidade = document.querySelector(
    ".carrinho-quantidade"
);

const carrinhoTotal = document.querySelector(
    ".carrinho-total"
);

const carrinhoTotalFinal = document.querySelector(
    "#carrinho-total-final"
);

// =========================================================
// INFORMAÇÕES DO ESTABELECIMENTO
// =========================================================

const nomeEstabelecimento =
    document.querySelector(
        "#nome-estabelecimento"
    );


const descricaoEstabelecimento =
    document.querySelector(
        "#descricao-estabelecimento"
    );


nomeEstabelecimento.textContent =
    estabelecimento.nome;


descricaoEstabelecimento.textContent =
    estabelecimento.descricao;

// =========================================================
// RENDERIZAÇÃO DAS CATEGORIAS
// =========================================================

const containerCategorias =
    document.querySelector("#categorias");


function renderizarCategorias() {

    containerCategorias.innerHTML = "";

    categorias.forEach(function(categoria, indice) {

        const botao = document.createElement("button");

        botao.textContent = categoria;

        botao.dataset.categoria = indice;

        botao.addEventListener("click", function() {

    const secao =
        document.getElementById(
            `categoria-${indice}`
        );

    if (secao) {
        secao.scrollIntoView({
            behavior: "smooth"
        });
    }

});

        containerCategorias.appendChild(botao);

    });

}

// =========================================================
// CARREGAR DADOS DO ESTABELECIMENTO
// =========================================================

function carregarEstabelecimento() {

    // =====================================================
    // NOME
    // =====================================================

    document.querySelector(
        "#nome-estabelecimento"
    ).textContent =
        estabelecimento.nome;


    // =====================================================
    // DESCRIÇÃO
    // =====================================================

    document.querySelector(
        "#descricao-estabelecimento"
    ).textContent =
        estabelecimento.descricao;


    // =====================================================
    // LOGO
    // =====================================================

    const logo =
        document.querySelector(
            "#logo-estabelecimento"
        );


    if (estabelecimento.logo) {

        logo.innerHTML = `
            <img
                src="${estabelecimento.logo}"
                alt="${estabelecimento.nome}"
            >
        `;

    } else {

        logo.textContent =
            estabelecimento.nome
                .substring(0, 2)
                .toUpperCase();

    }

}

// =========================================================
// CARREGAR CORES DO ESTABELECIMENTO
// =========================================================
function carregarCores() {

    const raiz =
        document.documentElement;


    raiz.style.setProperty(
        "--cor-principal",
        estabelecimento.cores.principal
    );


    raiz.style.setProperty(
        "--cor-secundaria",
        estabelecimento.cores.secundaria
    );


    raiz.style.setProperty(
        "--cor-fundo",
        estabelecimento.cores.fundo
    );


    raiz.style.setProperty(
        "--cor-texto",
        estabelecimento.cores.texto
    );

    raiz.style.setProperty(
    "--cor-destaque",
    estabelecimento.cores.destaque
);

raiz.style.setProperty(
    "--cor-terceira",
    estabelecimento.cores.terceira
);

}

// =========================================================
// RENDERIZAÇÃO DOS PRODUTOS
// =========================================================

const listaProdutos =
    document.querySelector("#lista-produtos");


function renderizarProdutos() {

    listaProdutos.innerHTML = "";

    categorias.forEach(function(categoria, indiceCategoria) {

        const produtosDaCategoria =
            produtos.filter(function(produto) {
                return produto.categoria === categoria;
            });

        if (produtosDaCategoria.length === 0) {
            return;
        }

        const secao = document.createElement("section");

        secao.classList.add("categoria");

        secao.id = `categoria-${indiceCategoria}`;

        const titulo = document.createElement("h2");

        titulo.textContent = categoria;

        secao.appendChild(titulo);

        const container = document.createElement("div");

        container.classList.add("produtos");

        produtosDaCategoria.forEach(function(produto) {

            const card = document.createElement("article");

            card.classList.add("produto");

            card.dataset.produtoId = produto.id;

            card.innerHTML = `
                <div class="produto-imagem">

    ${
        produto.imagem
            ? `<img src="${produto.imagem}" alt="${produto.nome}">`
            : "FOTO"
    }

</div>

                <div class="produto-info">

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p>
                        ${produto.descricao}
                    </p>

                    <div class="produto-final">

                        <strong>
                            R$ ${produto.preco.toFixed(2).replace(".", ",")}
                        </strong>

                        <button
                            class="botao-adicionar"
                            data-produto-id="${produto.id}">
                            +
                        </button>

                    </div>

                </div>
            `;

            container.appendChild(card);

        });

        secao.appendChild(container);

        listaProdutos.appendChild(secao);

    });

}

carregarEstabelecimento();

carregarCores();

renderizarProdutos();

renderizarCategorias();

// =========================================================
// CLIQUE NOS BOTÕES DE ADICIONAR PRODUTO
// =========================================================

listaProdutos.addEventListener("click", function (evento) {

    const botao =
        evento.target.closest(".botao-adicionar");

    if (!botao) {
        return;
    }

    const produtoId =
        Number(botao.dataset.produtoId);

    const produto =
        produtos.find(function (item) {
            return item.id === produtoId;
        });

    if (!produto) {
        return;
    }

    // Se o produto tiver opções,
    // abre o modal.

    if (produto.possuiOpcoes) {

        abrirModalProduto(produto);

        return;
    }

    // Produto simples:
    // adiciona diretamente ao carrinho.

    adicionarProdutoCarrinho(
        produto.nome,
        produto.preco
    );

});

listaProdutos.addEventListener("click", function (evento) {

    const card =
        evento.target.closest(".produto");

    if (!card) {
        return;
    }

    if (evento.target.closest(".botao-adicionar")) {
        return;
    }

    const produtoId =
        Number(card.dataset.produtoId);

    const produto =
        produtos.find(function (item) {
            return item.id === produtoId;
        });

    if (!produto) {
        return;
    }

    abrirModalProduto(produto);

});


// =========================================================
// ATUALIZAR CARRINHO
// =========================================================

function atualizarCarrinho() {

    // Limpa o conteúdo atual
    carrinhoProdutos.innerHTML = "";


    // Quantidade total de produtos
    let quantidadeTotal = 0;

    // Valor total
    let valorTotal = 0;


    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {

        carrinhoProdutos.innerHTML = `
            <p style="text-align: center; color: #777;">
                Seu carrinho está vazio.
            </p>
        `;

    }


    // Percorre os produtos
    carrinho.forEach(function (item, index) {

        quantidadeTotal += item.quantidade;

        valorTotal += item.preco * item.quantidade;


        // Cria o HTML do produto
        const itemHTML = document.createElement("div");

        itemHTML.classList.add("item-carrinho");


        itemHTML.innerHTML = `

            <div class="item-carrinho-info">

                <h3>
                    ${item.nome}
                </h3>

                <p>
                    ${formatarMoeda(item.preco)}
                    cada
                </p>

            </div>


            <div class="item-carrinho-controles">

                <div class="controle-quantidade">

                    <button
                        onclick="diminuirQuantidade(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        onclick="aumentarQuantidade(${index})">
                        +
                    </button>

                </div>


                <strong>
                    ${formatarMoeda(
                        item.preco * item.quantidade
                    )}
                </strong>


                <button
                    class="botao-remover"
                    onclick="removerProduto(${index})">

                    Remover

                </button>

            </div>

        `;


        carrinhoProdutos.appendChild(itemHTML);

    });


    // Atualiza quantidade
    carrinhoQuantidade.textContent =
        `🛒 ${quantidadeTotal} itens`;


    // Atualiza total
    carrinhoTotal.textContent =
        formatarMoeda(valorTotal);


    carrinhoTotalFinal.textContent =
        formatarMoeda(valorTotal);

}


// =========================================================
// AUMENTAR QUANTIDADE
// =========================================================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}


// =========================================================
// DIMINUIR QUANTIDADE
// =========================================================

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;


    // Se chegou a zero, remove o produto
    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    atualizarCarrinho();

}


// =========================================================
// REMOVER PRODUTO
// =========================================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// =========================================================
// FORMATAR VALOR EM REAL
// =========================================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


// =========================================================
// ABRIR CARRINHO
// =========================================================

carrinhoResumo.addEventListener(
    "click",
    function () {

        carrinhoPainel.classList.add("aberto");

    }
);


// =========================================================
// FECHAR CARRINHO
// =========================================================

fecharCarrinho.addEventListener(
    "click",
    function () {

        carrinhoPainel.classList.remove("aberto");

    }
);

// =========================================================
// CHECKOUT
// =========================================================

const botaoFinalizar = document.querySelector(
    "#botao-finalizar"
);

const checkout = document.querySelector(
    "#checkout"
);

const fecharCheckout = document.querySelector(
    "#fechar-checkout"
);

const formCheckout = document.querySelector(
    "#form-checkout"
);

const campoEndereco = document.querySelector(
    "#campo-endereco"
);

const campoTroco = document.querySelector(
    "#campo-troco"
);

const pagamento = document.querySelector(
    "#pagamento"
);

const checkoutTotal = document.querySelector(
    "#checkout-total"
);


// =========================================================
// ABRIR CHECKOUT
// =========================================================

botaoFinalizar.addEventListener(
    "click",
    function () {

        // Não permite finalizar sem produtos
        if (carrinho.length === 0) {

            alert(
                "Adicione pelo menos um produto ao carrinho."
            );

            return;

        }


        // Calcula o total
        let total = 0;

        carrinho.forEach(function (item) {

            total += item.preco * item.quantidade;

        });


        // Mostra o total
        checkoutTotal.textContent =
            formatarMoeda(total);


        // Abre o checkout
        checkout.classList.add("aberto");

    }
);


// =========================================================
// FECHAR CHECKOUT
// =========================================================

fecharCheckout.addEventListener(
    "click",
    function () {

        checkout.classList.remove("aberto");

    }
);


// =========================================================
// ENTREGA OU RETIRADA
// =========================================================

const opcoesPedido =
    document.querySelectorAll(
        'input[name="tipo-pedido"]'
    );


opcoesPedido.forEach(function (opcao) {

    opcao.addEventListener(
        "change",
        function () {

            if (this.value === "entrega") {

                campoEndereco.style.display = "block";

            } else {

                campoEndereco.style.display = "none";

            }

        }
    );

});


// =========================================================
// FORMA DE PAGAMENTO
// =========================================================

pagamento.addEventListener(
    "change",
    function () {

        if (this.value === "Dinheiro") {

            campoTroco.style.display = "block";

        } else {

            campoTroco.style.display = "none";

        }

    }
);

// =========================================================
// ENVIAR PEDIDO PARA O WHATSAPP
// =========================================================

formCheckout.addEventListener(
    "submit",
    function (evento) {

        // Impede o formulário de recarregar a página
        evento.preventDefault();


        // =================================================
        // DADOS DO CLIENTE
        // =================================================

        const nome =
            document.querySelector("#nome").value.trim();


        const tipoPedido =
            document.querySelector(
                'input[name="tipo-pedido"]:checked'
            ).value;


        const endereco =
            document.querySelector("#endereco").value.trim();


        const formaPagamento =
            document.querySelector("#pagamento").value;


        const troco =
            document.querySelector("#troco").value.trim();


        const observacao =
            document.querySelector("#observacao").value.trim();


        // =================================================
        // VALIDAÇÕES
        // =================================================

        if (!nome) {

            alert("Digite seu nome.");

            return;

        }


        if (!formaPagamento) {

            alert(
                "Selecione uma forma de pagamento."
            );

            return;

        }


        if (
            tipoPedido === "entrega"
            &&
            !endereco
        ) {

            alert(
                "Digite o endereço para entrega."
            );

            return;

        }


        // =================================================
        // COMEÇA A MONTAR A MENSAGEM
        // =================================================

        let mensagem =
            "🛒 *NOVO PEDIDO*%0A%0A";


        // =================================================
        // CLIENTE
        // =================================================

        mensagem +=
            `👤 *Cliente:* ${nome}%0A%0A`;


        // =================================================
        // PRODUTOS
        // =================================================

        mensagem +=
            "🍰 *ITENS DO PEDIDO*%0A";


        carrinho.forEach(function (item) {

            const subtotal =
                item.preco * item.quantidade;


            mensagem +=
                `${item.quantidade}x ${item.nome} — ` +
                `${formatarMoeda(subtotal)}%0A`;

        });


        // =================================================
        // TOTAL
        // =================================================

        let total = 0;


        carrinho.forEach(function (item) {

            total +=
                item.preco * item.quantidade;

        });


        mensagem +=
            `%0A💰 *TOTAL: ${formatarMoeda(total)}*%0A%0A`;


        // =================================================
        // ENTREGA / RETIRADA
        // =================================================

        if (tipoPedido === "entrega") {

            mensagem +=
                "📦 *Entrega*%0A";

            mensagem +=
                `📍 ${endereco}%0A%0A`;

        } else {

            mensagem +=
                "🏪 *Retirada no local*%0A%0A";

        }


        // =================================================
        // PAGAMENTO
        // =================================================

        mensagem +=
            `💳 *Pagamento:* ${formaPagamento}%0A`;


        if (
            formaPagamento === "Dinheiro"
            &&
            troco
        ) {

            mensagem +=
                `💵 *Troco para:* ${troco}%0A`;

        }


        // =================================================
        // OBSERVAÇÃO
        // =================================================

        if (observacao) {

            mensagem +=
                `%0A📝 *Observação:*%0A${observacao}%0A`;

        }


        // =================================================
        // CRIA LINK DO WHATSAPP
        // =================================================

        const urlWhatsApp =
    `https://wa.me/${estabelecimento.whatsapp}` +
    `?text=${mensagem}`;


        // =================================================
        // ABRE O WHATSAPP
        // =================================================

        window.open(
            urlWhatsApp,
            "_blank"
        );

    }
);

// =========================================================
// MODAL DE PRODUTO
// =========================================================

const modalProduto =
    document.querySelector(
        "#modal-produto"
    );


const fecharModalProduto =
    document.querySelector(
        "#fechar-modal-produto"
    );


const modalProdutoNome =
    document.querySelector(
        "#modal-produto-nome"
    );


const modalProdutoDescricao =
    document.querySelector(
        "#modal-produto-descricao"
    );


const modalProdutoTotal =
    document.querySelector(
        "#modal-produto-total"
    );

    const opcoesTamanhos =
    document.querySelector(
        "#opcoes-tamanhos"
    );


const opcoesAdicionais =
    document.querySelector(
        "#opcoes-adicionais"
    );


const confirmarProduto =
    document.querySelector(
        "#confirmar-produto"
    );


let produtoSelecionado = null;

// =========================================================
// RENDERIZAR OPÇÕES DO PRODUTO
// =========================================================

function renderizarOpcoesProduto(produto) {

    opcoesTamanhos.innerHTML = "";
    opcoesAdicionais.innerHTML = "";

    // NOVO: opções genéricas
    if (produto.opcoes) {

        produto.opcoes.forEach(function (opcao) {

            const bloco =
                document.createElement("div");

            bloco.classList.add(
                "opcoes-produto"
            );

            bloco.innerHTML =
                `<h3>${opcao.nome}</h3>`;

            opcao.valores.forEach(
                function (valor, indice) {

                    const label =
                        document.createElement("label");

                    label.classList.add(
                        "opcao-produto"
                    );

                    label.innerHTML = `
                        <input
                            type="radio"
                            name="opcao-${opcao.nome}"
                            value="${valor.nome}"
                            data-preco="${valor.preco}"
                            ${indice === 0 ? "checked" : ""}
                        >

                        <span>
                            ${valor.nome}
                        </span>

                        <strong>
                            ${formatarMoeda(valor.preco)}
                        </strong>
                    `;

                    bloco.appendChild(label);

                }
            );

            opcoesTamanhos.appendChild(bloco);

        });

        return;
    }

    // TAMANHOS
    if (produto.tamanhos) {

        opcoesTamanhos.innerHTML =
            "<h3>Escolha o tamanho</h3>";

        produto.tamanhos.forEach(
            function (tamanho, indice) {

                const label =
                    document.createElement("label");

                label.classList.add(
                    "opcao-produto"
                );

                label.innerHTML = `
                    <input
                        type="radio"
                        name="tamanho"
                        value="${tamanho.nome}"
                        data-preco="${tamanho.preco}"
                        ${indice === 0 ? "checked" : ""}
                    >

                    <span>
                        ${tamanho.nome}
                    </span>

                    <strong>
                        ${formatarMoeda(tamanho.preco)}
                    </strong>
                `;

                opcoesTamanhos.appendChild(
                    label
                );

            }
        );

    }

    // ADICIONAIS
    if (produto.adicionais) {

        opcoesAdicionais.innerHTML =
            "<h3>Adicionais</h3>";

        produto.adicionais.forEach(
            function (adicional) {

                const label =
                    document.createElement("label");

                label.classList.add(
                    "opcao-produto"
                );

                label.innerHTML = `
                    <input
                        type="checkbox"
                        value="${adicional.nome}"
                        data-preco="${adicional.preco}"
                    >

                    <span>
                        ${adicional.nome}
                    </span>

                    <strong>
                        + ${formatarMoeda(adicional.preco)}
                    </strong>
                `;

                opcoesAdicionais.appendChild(
                    label
                );

            }
        );

    }

}

// =========================================================
// ABRIR MODAL
// =========================================================

function abrirModalProduto(produto) {

    produtoSelecionado = produto;


    const nome =
        produto.nome;


    const descricao =
        produto.descricao;


    modalProdutoNome.textContent =
        nome;


    modalProdutoDescricao.textContent =
        descricao;

        renderizarOpcoesProduto(produto);

    calcularTotalProduto();


    modalProduto.classList.add(
        "aberto"
    );

}


// =========================================================
// FECHAR MODAL
// =========================================================

fecharModalProduto.addEventListener(
    "click",
    function () {

        modalProduto.classList.remove(
            "aberto"
        );

    }
);


// =========================================================
// CALCULAR TOTAL DO PRODUTO
// =========================================================

function calcularTotalProduto() {

    // NOVO: produtos com opções genéricas
    if (produtoSelecionado.opcoes) {

        let total = 0;

        const opcoesSelecionadas =
            document.querySelectorAll(
                '.opcao-produto input[type="radio"]:checked'
            );

        opcoesSelecionadas.forEach(
            function (opcao) {

                total +=
                    Number(
                        opcao.dataset.preco
                    );

            }
        );

        modalProdutoTotal.textContent =
            formatarMoeda(total);

        return;
    }


    // SISTEMA ANTIGO: tamanhos
    const tamanhoSelecionado =
        document.querySelector(
            'input[name="tamanho"]:checked'
        );


    if (!tamanhoSelecionado) {

        modalProdutoTotal.textContent =
            formatarMoeda(
                produtoSelecionado.preco
            );

        return;
    }


    let total =
        Number(
            tamanhoSelecionado.dataset.preco
        );


    // SISTEMA ANTIGO: adicionais
    const adicionais =
        document.querySelectorAll(
            '.opcao-produto input[type="checkbox"]:checked'
        );


    adicionais.forEach(
        function (adicional) {

            total +=
                Number(
                    adicional.dataset.preco
                );

        }
    );


    modalProdutoTotal.textContent =
        formatarMoeda(total);

}


// =========================================================
// ATUALIZAR PREÇO AO ESCOLHER OPÇÃO
// =========================================================

modalProduto.addEventListener(
    "change",
    function (evento) {

        if (
            evento.target.matches(
                ".opcao-produto input"
            )
        ) {

            calcularTotalProduto();

        }

    }
);


// =========================================================
// CONFIRMAR PRODUTO
// =========================================================

confirmarProduto.addEventListener(
    "click",
    function () {

        let preco = 0;

        let nomeProduto =
            produtoSelecionado.nome;


        // =================================================
        // NOVO: PRODUTOS COM OPÇÕES GENÉRICAS
        // =================================================

        if (produtoSelecionado.opcoes) {

            const opcoesSelecionadas =
                document.querySelectorAll(
                    '.opcao-produto input[type="radio"]:checked'
                );


            opcoesSelecionadas.forEach(
                function (opcao) {

                    preco +=
                        Number(
                            opcao.dataset.preco
                        );

                }
            );


            // Guarda as opções escolhidas
            let descricaoOpcoes = [];


            opcoesSelecionadas.forEach(
                function (opcao) {

                    descricaoOpcoes.push(
                        opcao.value
                    );

                }
            );


            const nomeCompleto =
                `${nomeProduto} (${descricaoOpcoes.join(" + ")})`;


            adicionarProdutoCarrinho(
                nomeCompleto,
                preco
            );


            modalProduto.classList.remove(
                "aberto"
            );


            return;
        }


        // =================================================
        // SISTEMA ANTIGO: TAMANHO
        // =================================================

        const tamanho =
            document.querySelector(
                'input[name="tamanho"]:checked'
            );


        if (tamanho) {

            preco =
                Number(
                    tamanho.dataset.preco
                );

        } else {

            preco =
                Number(
                    produtoSelecionado.preco
                );

        }


        // =================================================
        // SISTEMA ANTIGO: ADICIONAIS
        // =================================================

        const adicionaisSelecionados =
            document.querySelectorAll(
                '.opcao-produto input[type="checkbox"]:checked'
            );


        let adicionais = [];


        adicionaisSelecionados.forEach(
            function (adicional) {

                preco +=
                    Number(
                        adicional.dataset.preco
                    );


                adicionais.push(
                    adicional.value
                );

            }
        );


        // =================================================
        // DESCRIÇÃO
        // =================================================

        let descricao = "";


        if (tamanho) {

            descricao =
                tamanho.value;

        }


        if (adicionais.length > 0) {

            descricao +=
                " + " +
                adicionais.join(", ");

        }


        // =================================================
        // NOME NO CARRINHO
        // =================================================

        const nomeCompleto =
            `${nomeProduto} (${descricao})`;


        // =================================================
        // ADICIONA AO CARRINHO
        // =================================================

        adicionarProdutoCarrinho(
            nomeCompleto,
            preco
        );


        // =================================================
        // FECHA O MODAL
        // =================================================

        modalProduto.classList.remove(
            "aberto"
        );

    }
);


// =========================================================
// ADICIONAR AO CARRINHO
// =========================================================

function adicionarProdutoCarrinho(
    nome,
    preco
) {

    const produtoExistente =
        carrinho.find(
            function (item) {

                return item.nome === nome;

            }
        );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            quantidade: 1

        });

    }


    atualizarCarrinho();

}