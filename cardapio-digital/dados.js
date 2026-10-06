// =========================================================
// DADOS DO ESTABELECIMENTO
// =========================================================

const estabelecimento = {

    nome: "Jéssica Tozi Confeitaria",

    descricao:
        "Doces feitos com carinho para momnetos especiais.",

    whatsapp:
        "5535992462007",

         logo: "imagens/favicon-com-fundo.png",

cores: {

    principal: "#d98ca0",

    secundaria: "#f4e3e7",

    terceira: "#c06c84",

    fundo: "#ffffff",

    texto: "#666",

    destaque: "#f5e8d8"

}

};


// =========================================================
// CATEGORIAS
// =========================================================

const categorias = [

    "Bolos",

    "Doces",

    "Kits",

    "Festas"

];


// =========================================================
// PRODUTOS
// =========================================================

const produtos = [

    // =====================================================
    // BOLOS
    // =====================================================

{
    id: 1,

    nome: "Bolo de Chocolate",

    categoria: "Bolos",

    descricao:
        "Massa de chocolate com recheio cremoso.",

    imagem: "imagens/bolos/bolo-chocolate.jpeg",

    possuiOpcoes: true,

    preco: 45,

    tamanhos: [
        {
            nome: "Pequeno",
            preco: 45
        },
        {
            nome: "Médio",
            preco: 55
        },
        {
            nome: "Grande",
            preco: 65
        }
    ],

    adicionais: [
        {
            nome: "Morango",
            preco: 5
        },
        {
            nome: "Brigadeiro",
            preco: 7
        }
    ]
},


    {
        id: 2,

        nome: "Bolo de Morango",

        categoria: "Bolos",

        descricao:
            "Massa branca com recheio de morango.",

        imagem: "imagens/bolos/bolo-morango.jpeg",

        possuiOpcoes: false,

        preco: 50
    },
    
        {
        id: 3,
        nome: "Bolo de Cenoura",
        categoria: "Bolos",
        descricao:
            "Bolo de cenoura com cobertura de chocolate.",
        imagem: "imagens/bolos/bolo-cenoura.jfif",
        possuiOpcoes: false,
        preco: 40
    },

    // =====================================================
    // DOCES
    // =====================================================

    {
        id: 4,
        nome: "Brigadeiro Tradicional" ,
        categoria: "Doces" ,
        descricao: "Clássico, cremoso e irresistível, preparado com chocolate e finalizado com granulado",
        imagem: "imagens/doces/brigadeiro.jpg" ,
        possuiOpcoes: true,
        preco: 35,
        opcoes: [
            {
        nome:"Quantidade",
        tipo: "radio",

        valores: [
            {
            nome:"25 unidades",
            preco: 35
            },
            {
            nome: "50 unidades",
            preco: 65
            },
            {
            nome: "100 unidades",
            preco: 120
                  }
                ]
            }
        ]
    },

    {
        id: 5,
        nome: "Beijinho",
        categoria: "Doces",
        descricao: "Beijinho cremoso com sabor delicado de coco, finalizado com coco ralado.",
        imagem: "imagens/doces/beijinho.jpg",
        possuiOpcoes: true,
        preco: 35,

                opcoes: [
            {
        nome:"Quantidade",
        tipo: "radio",

        valores: [
            {
            nome:"25 unidades",
            preco: 35
            },
            {
            nome: "50 unidades",
            preco: 65
            },
            {
            nome: "100 unidades",
            preco: 120
                  }
                ]
            }
        ]
    },

    {
    id: 6,
    nome: "Brigadeiro de Morango",
    categoria: "Doces",
    descricao: "Brigadeiro cremoso com sabor de morango, perfeito para quem ama um toque frutado e delicado.",
    imagem: "imagens/doces/brigadeiro-morango.jfif",
    possuiOpcoes: true,
    preco: 35,

        opcoes: [
            {
        nome:"Quantidade",
        tipo: "radio",

        valores: [
            {
            nome:"25 unidades",
            preco: 35
            },
            {
            nome: "50 unidades",
            preco: 65
            },
            {
            nome: "100 unidades",
            preco: 120
                  }
                ]
            }
        ]
    },

    // =====================================================
    // KITS
    // ===================================================== 

    {
        id: 7,
        nome: "Kit Festa",
        categoria: "Kits",
        descricao: "Uma combinação deliciosa para deixar sua comemoração ainda mais especial. Bolo de massa branca, fofinha e molhadinha, acompanhado de brigadeiros, salgados bem recheados e Coca-Cola. Tudo preparado com carinho para você aproveitar cada momento.",
        imagem: "imagens/kits/kit-festa.jpeg",
        possuiOpcoes: false,
        preco: 109.50,

        opcoes: [

    {
        nome: "Sabor do recheio",
        tipo: "radio",

        valores: [
            {
                nome: "Brigadeiro",
                
            },
            {
                nome: "Prestígio",
                
            },
            {
                nome: "Ninho",
                
            }
        ]
    },

    {
        nome: "Salgado",
        tipo: "radio",

        valores: [
            {
                nome: "Coxinha",
                
            },
            {
                nome: "Risole",
                
            },
            {
                nome: "Bolinha de queijo",
                
            }
        ]
    },

    {
        nome: "Doce",
        tipo: "radio",

        valores: [
            {
                nome: "Brigadeiro",
                
            },
            {
                nome: "Beijinho",
                
            }
        ]
    },

    {
        nome: "Refrigerante",
        tipo: "radio",

        valores: [
            {
                nome: "Coca-Cola 2 litros",
                
            },
            {
                nome: "Guaraná Antartica 2 litros",
                
            },
            {
                nome: "Fanta Laranja 2 litros",
                
            }
        ]
    }

]
    }

];